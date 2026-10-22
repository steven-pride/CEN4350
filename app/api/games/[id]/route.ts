import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Create supabase Server Client
    const supabaseClient = await createClient();
    const { id } = await params;

    //Check if id is populated
    if (!id) {
      return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
    }

    // Query game table from database where gameId = id
    const { data, error } = await supabaseClient.from("games").select("*").eq("gameId", id).maybeSingle();

    if (error) {
      console.error("Error fetching game:", error);
      return NextResponse.json({ error: "Failed to fetch game" }, { status: 500 });
    }

    if (!data) {
      console.error("Game not found for ID:", id);
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const game = {
      ...data,
      id: data.gameId || data.id,
      type: data.gameType !== undefined ? data.gameType : data.type,
    };

    return NextResponse.json(game);
  }
catch (error) {
    console.error("Error fetching game:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseClient = await createClient();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
    }

    // Retrieve request body
    const body = await request.json();

    // Populate the modified date with the current date. 
    const updateData: Record<string, string | number | null> = {
      modifiedAt: new Date().toISOString(),
    };

    // Populate update (game) object with data from body
    if (body.name !== undefined) updateData.name = body.name;
    if (body.gameType !== undefined) updateData.gameType = Number(body.gameType);
    if (body.minPlayers !== undefined) updateData.minPlayers = Number(body.minPlayers);
    if (body.maxPlayers !== undefined) updateData.maxPlayers = Number(body.maxPlayers);
    if (body.playTime !== undefined) updateData.playTime = Number(body.playTime);
    if (body.weight !== undefined) updateData.weight = parseFloat(body.weight);
    if (body.rating !== undefined) updateData.rating = parseFloat(body.rating);
    if (body.baseGameId !== undefined) updateData.baseGameId = body.baseGameId ? body.baseGameId : null;
    if (body.notes !== undefined) updateData.notes = body.notes;

    // Write the update to the database where the gameId matches the query string parameter.
    const { data, error } = await supabaseClient
      .from("games")
      .update(updateData)
      .eq("gameId", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating game:", error);
      return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const game = {
      ...data,
      id: data.gameId || data.id,
    };

    // Return the updated game
    return NextResponse.json(game);
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
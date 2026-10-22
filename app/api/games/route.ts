import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase";

export async function POST(request: Request) {
  try {
    const supabaseClient = await createClient();
    const body = await request.json();

    // Get calling user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    // Populate game object with json body data. 
    const gameData = {
      userId: user?.id,
      name: body.name,
      gameType: body.gameType !== undefined ? Number(body.gameType) : 0,
      minPlayers: Number(body.minPlayers),
      maxPlayers: Number(body.maxPlayers),
      playTime: Number(body.playTime),
      weight: parseFloat(body.weight),
      rating: parseFloat(body.rating),
      baseGameId: body.baseGameId ? body.baseGameId : null,
      notes: body.notes || null,
    };

    // Insert game object to games table
    const { data, error } = await supabaseClient
      .from("games")
      .insert([gameData])
      .select()
      .single();

    if (error) {
      console.error("Error creating game:", error);
      return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
    }

    // Create new game object with new id 
    const game = {
      ...data,
      id: data.gameId || data.id,
    };

    // Return newly create game
    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
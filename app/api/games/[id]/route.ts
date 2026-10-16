import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseClient = await createClient();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
    }

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
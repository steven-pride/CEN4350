import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase";

export async function GET(request: NextRequest) {
    const supabaseClient = await createClient();
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const gameType = searchParams.get("gameType");
    const playerCount = searchParams.get("playerCount");
    const maxPlayTime = searchParams.get("maxPlayTime");
    const maxWeight = searchParams.get("maxWeight");
    const minRating = searchParams.get("minRating");

    try {
        let query = supabaseClient.from("games").select("*");

        if (title) {
            query = query.ilike("name", `%${title}%`);
        }

        if (gameType !== null && gameType !== undefined && gameType !== "" && gameType !== "all") {
            const parsedType = parseInt(gameType, 10);
            if (!isNaN(parsedType)) {
                query = query.eq("gameType", parsedType);
            }
        }

        if (playerCount) {
            const count = parseInt(playerCount, 10);
            if (!isNaN(count)) {
                query = query.lte("minPlayers", count).gte("maxPlayers", count);
            }
        }

        if (maxPlayTime) {
            const playTime = parseInt(maxPlayTime, 10);
            if (!isNaN(playTime)) {
                query = query.lte("playTime", playTime);
            }
        }

        if (maxWeight) {
            const weight = parseFloat(maxWeight);
            if (!isNaN(weight)) {
                query = query.lte("weight", weight);
            }
        }

        if (minRating) {
            const rating = parseFloat(minRating);
            if (!isNaN(rating)) {
                query = query.gte("rating", rating);
            }
        }

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching games:", error);
            return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
        }

        const games = (data || []).map((game) => ({
            ...game,
            id: game.gameId || game.id,
            type: game.gameType !== undefined ? game.gameType : game.type,
        }));

        return NextResponse.json(games);
    }
    catch (error) {
        console.error("Error fetching games:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}
"use client";

import { Suspense, use, useEffect, useState } from "react";
import GameForm from "@/app/ui/games/GameForm";
import { notFound } from "next/navigation";
import { Game } from "@/app/types/game";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [game, setGame] = useState<Game | null>(null);
  const [baseGames, setBaseGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchGame() {
      try {
        // Query /api/games/[id] endpoint to retrieve game by id
        const res = await fetch(`/api/games/${id}`);
        if (res.status === 404) {
          notFound();
        }
        if (!res.ok) {
          console.error("Failed to load game from API:", res.statusText);
          notFound();
        }
        const data = await res.json();
        setGame(data);

        // Query base games for the expansion selection
        const baseGamesRes = await fetch("/api/games/list?gameType=0");
        if (!baseGamesRes.ok) {
          console.error("Failed to load base games from API:", baseGamesRes.statusText);
          setBaseGames([]);
        } else {
          const baseGamesData = await baseGamesRes.json();
          setBaseGames(baseGamesData);
        }
      } catch (err) {
        console.error("Error fetching game:", err);
        notFound();
      } 
    }

    if (id) {
      fetchGame();
    }
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-ludavault-gold md:-ml-[34px]">
            Edit Game
          </h1>
        </div>
      </div>
      <div className="mt-2 mb-2">
        <Suspense fallback={<div>Loading game data...</div>}>
          {game && (
            <GameForm baseGames={baseGames} initialData={game} isEdit={true} />
          )}
        </Suspense>
      </div>
    </div>
  );
}




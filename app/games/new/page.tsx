"use client"

import GameForm from "@/app/ui/games/GameForm";
import { Suspense, useEffect, useState } from "react";
import { Game } from "@/app/types/game";

export default function Page() {
const [baseGames, setBaseGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchBaseGames() {
      try {
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
        console.error("Error fetching base games:", err);
      } 
    }

    fetchBaseGames();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2x font-bold text-ludavault-gold md:-ml-[34px]">
            New Game
          </h1>
        </div>
      </div>
      <div className="mt-2 mb-2" id="newPageGameFormDiv">
        <Suspense fallback={<div>Loading base games...</div>}>
          {baseGames && (
            <GameForm baseGames={baseGames} isEdit={false} />
          )}
        </Suspense>
      </div>
    </div>
  );
}

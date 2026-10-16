"use client"

import Link from "next/link";
import FilterSidebar from "@/app/ui/games/FilterSidebar";
import GameCard from "@/app/ui/games/GameCard"
import { useEffect, useState } from "react";
import Search from "@/app/ui/games/Search";
import { Game } from "@/app/types/game";
import { useSearchParams } from "next/navigation";


export default function Page() {
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const params = new URLSearchParams();
        const title = searchParams.get("title");
        const gameType = searchParams.get("gameType");
        const playerCount = searchParams.get("playerCount");
        const maxPlayTime = searchParams.get("maxPlayTime");
        const maxWeight = searchParams.get("maxWeight");
        const minRating = searchParams.get("minRating");

        if (title?.trim()) {
          params.set("title", title.trim());
        }
        if (gameType && gameType !== "all") {
          params.set("gameType", gameType);
        }
        if (playerCount) {
          params.set("playerCount", playerCount);
        }
        if (maxPlayTime) {
          params.set("maxPlayTime", maxPlayTime);
        }
        if (maxWeight) {
          params.set("maxWeight", maxWeight);
        }
        if (minRating) {
          params.set("minRating", minRating);
        }

        const queryString = params.toString();
        const url = `/api/games/list${queryString ? `?${queryString}` : ""}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setGames(data);
        } else {
          console.error("Failed to load games from API:", res.statusText);
        }
      } catch (err) {
        console.error("Error fetching games:", err);
      } 
    }

    fetchGames();
  }, [searchParams]);

  return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-xl md:text-2x font-bold text-ludavault-gold md:-ml-[34px]">
          My Board Game Collection
        </h1>

        {/* Create game link */}
        <div className="flex mt-2 mb-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between md:w-[125px] w-full">
              <Link href="/games/new"
                className="bg-ludavault-gold text-white hover:bg-ludavault-blue font-medium px-6 py-2 rounded-md shadow-xs text-center"
              >Add Game</Link>
          </div>
          {/* Search bar for desktop */}
          <div className="hidden md:flex flex-1 my-auto max-w-2xl ml-1 md:ml-auto">
            <Search/>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Search bar and filter show above cards for mobile */} 
          <div className="md:hidden w-full"> 
            <div className="flex flex-col mb-3">
              <Search/>
            </div>       
            <FilterSidebar key={`mobile-${searchParams.toString()}`} />
          </div>
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {games.map((game) => {
                        return (
                          <GameCard key={game.id} game={game}/>
                        );
                      })}
              </div>
            </div> 
          {/* Filter shows next cards for desktop */} 
          <div className="hidden md:flex">         
            <FilterSidebar key={`desktop-${searchParams.toString()}`} />
          </div>
        </div>
      </div>
  );
}

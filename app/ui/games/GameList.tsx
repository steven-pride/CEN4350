import Link from "next/link";
import FilterSidebar from "@/app/ui/games/FilterSidebar";
import GameCard from "@/app/ui/games/GameCard"
import { useEffect, useState } from "react";
import Search from "@/app/ui/games/Search";
import { Game } from "@/app/types/game";
import { useSearchParams } from "next/navigation";

export function GamesList() {
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        // Populate params as URL Search Params object from the retrieved query string parameters
        const params = new URLSearchParams(searchParams.toString());

        // Query /api/games endpoint
        const queryString = params.toString();
        const url = `/api/games${queryString ? `?${queryString}` : ""}`;
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

  const hasFilters = Boolean(searchParams.toString());

  return (
      <div>
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
            {/* Using key to track component state */}
            <FilterSidebar key={`mobile-${searchParams.toString()}`} />
          </div>
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {!games ? null : games.length > 0 ? (
                  games.map((game) => (
                    // Using key to track list of components
                    <GameCard key={game.id} game={game}/>
                  ))
                ) : hasFilters ? (
                  <div className="col-span-full rounded-lg border border-gray-200 bg-white p-8 text-center shadow-xs">
                    <h2 className="text-lg font-semibold text-ludavault-blue">No games match your current filters</h2>
                    <p className="mt-2 text-sm text-gray-600">
                      Try adjusting your search criteria or clear your filters to see your full collection.
                    </p>
                  </div>
                ) : (
                  <div className="col-span-full rounded-lg border border-gray-200 bg-white p-8 text-center shadow-xs">
                    <h2 className="text-lg font-semibold text-ludavault-blue">Your collection is ready for its first game</h2>
                    <p className="mt-2 text-sm text-gray-600">
                      Select Add Game to add a base game to your collection with its player count, play time, weight, and rating. You can add expansions and link them to their base game later.
                    </p>
                  </div>
                )}
              </div>
            </div> 
          {/* Filter shows next cards for desktop */} 
          <div className="hidden md:flex">    
            {/* Using key to track component state */}      
            <FilterSidebar key={`desktop-${searchParams.toString()}`} />
          </div>
        </div>
      </div>
  );
}
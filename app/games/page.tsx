"use client"

import Link from "next/link";
import FilterSidebar, { GameFilters, initialFilters } from "@/app/ui/games/FilterSidebar";
import GameCard from "@/app/ui/games/GameCard"
import { initialGames } from "@/app/types/game";
import { Suspense, useState } from "react";
import Search from "@/app/ui/games/Search";

export default function Page() {
  const [filters, setFilters] = useState<GameFilters>(initialFilters)
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
            <Suspense fallback={<div>Loading...</div>}>
              <Search/>
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Search bar and filter show above cards for mobile */} 
          <div className="md:hidden w-full"> 
            <div className="flex flex-col mb-3">
              <Suspense fallback={<div>Loading...</div>}>
                <Search/>
              </Suspense>
          </div>       
            <FilterSidebar
                onFilterChange={(newFilters) => {
                  setFilters(newFilters)
                }}
                />
          </div>
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {initialGames.map((game) => {
                        return (
                          <GameCard key={game.id} game={game}/>
                        );
                      })}
              </div>
            </div> 
          {/* Filter shows next cards for desktop */} 
          <div className="hidden md:flex">         
            <FilterSidebar
                onFilterChange={(newFilters) => {
                  setFilters(newFilters)
                }}
                />
          </div>
        </div>
      </div>
  );
}

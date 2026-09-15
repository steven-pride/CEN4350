"use client"

import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import FilterSidebar, { GameFilters, initialFilters } from "@/app/ui/games/FilterSidebar";
import GameCard from "@/app/ui/games/GameCard"
import { Game } from "../types/game";
import { Suspense, useState } from "react";

const games: Game[] = [
  { id: 1, name: 'Game 1', type: 0, rating: 1.2, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, createdAt: "09-14-2026T12:00:00Z", updatedAt: "09-14-2026T12:00:00Z" },
  { id: 2, name: 'Game 2', type: 1, rating: 2.5, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, createdAt: "09-14-2026T12:00:00Z", updatedAt: "09-14-2026T12:00:00Z" },
  { id: 3, name: 'Game 3', type: 1, rating: 3.0, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, createdAt: "09-14-2026T12:00:00Z", updatedAt: "09-14-2026T12:00:00Z" },
  { id: 4, name: 'Game 4', type: 0, rating: 4.1, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, createdAt: "09-14-2026T12:00:00Z", updatedAt: "09-14-2026T12:00:00Z" },
  { id: 5, name: 'Game 5', type: 1, rating: 4.8, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, createdAt: "09-14-2026T12:00:00Z", updatedAt: "09-14-2026T12:00:00Z" },
  { id: 6, name: 'Game 6', type: 0, rating: 5.0, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, createdAt: "09-14-2026T12:00:00Z", updatedAt: "09-14-2026T12:00:00Z" },
];

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [filters, setFilters] = useState<GameFilters>(initialFilters)
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if(term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300);

  return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-xl md:text-2x font-bold text-ludavault-gold -ml-[34px]">
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
            <input
              id="search-title"
              type="text"
              placeholder="Title"
              onChange={ (e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get('query')?.toString()}
              className="w-full filter"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Search bar and filter show above cards for mobile */} 
          <div className="md:hidden w-full"> 
            <div className="flex flex-col mb-3">
            <input
              id="search-title"
              type="text"
              placeholder="Title"
              onChange={ (e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get('query')?.toString()}
              className="w-full filter"
            />
          </div>       
            <FilterSidebar
                onFilterChange={(newFilters) => {
                  setFilters(newFilters)
                }}
                />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {games.map((game) => {
                        return (
                          <GameCard key={game.id} game={game}/>
                        );
                      })}
              </div>
            </div> 
          </Suspense>
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

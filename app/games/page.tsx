"use client"

import { Suspense } from "react";
import { GamesList } from "@/app/ui/games/GameList"


export default function Page() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-xl md:text-2xl font-bold text-ludavault-gold md:-ml-[34px]">
        My Board Game Collection
      </h1>
      <Suspense fallback={ <div className="py-8 text-center text-gray-500">Loading collection...</div> }>
        <GamesList />
      </Suspense>
    </div>
  );
}

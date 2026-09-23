"use client";

import { Game } from "@/app/types/game";
import Link from "next/link";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const type = game.type == 1 ? "Expansion" : "Base Game";
  const rating = Number(game.rating).toFixed(1);

  return (
    <Link href={`/games/${game.id}/edit`} className="block group">
      <div className="bg-white rounded-lg border border-gray-200/80 shadow-xs hover:shadow-md hover:bg-blue-100 p-1 flex flex-col justify-between h-40">
        {/* Game Title */}
        <div className="text-center my-auto py-2">
          <h3 className="font-bold text-lg tracking-tight">
            {game.name}
          </h3>
        </div>

        {/* Game Details */}
        <div className="space-y-1 text-sm border-gray-100 pt-3">
          <p className="text-left font-medium">
            {type}
          </p>
          <p className="text-left">
            Rating: <span className="font-semibold">{rating}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}



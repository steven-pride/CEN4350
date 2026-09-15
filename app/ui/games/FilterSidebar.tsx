"use client";

import { useState } from "react";

export interface GameFilters {
  gameType: string;
  playerCount: string;
  maxPlayTime: string;
  maxWeight: string;
  minRating: string;
}

export const initialFilters: GameFilters = {
  gameType: "all",
  playerCount: "",
  maxPlayTime: "",
  maxWeight: "",
  minRating: "",
};

export default function FilterSidebar({
  onFilterChange,
}: {
  onFilterChange: (filters: GameFilters) => void;
}) {
  // Local state for tracking form input values before submitting
  const [filters, setFilters] = useState<GameFilters>(initialFilters);
  
  // Updates a single filter field in local state
  const handleChange = (field: keyof GameFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };


  return (
    <div className="w-full lg:w-64 shrink-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFilterChange(filters);
        }}
        className="flex flex-col space-y-3 sticky top-4"
      >
        {/* Type Filter */}
        <div>
          <select
            id="filter-game-type"
            value={filters.gameType}
            onChange={(e) => handleChange("gameType", e.target.value)}
            className="filter"
            aria-label="Filter by Game Type"
          >
            <option value="all">Type (All)</option>
            <option value="0">Base Game</option>
            <option value="1">Expansion</option>
          </select>
        </div>

        {/* Player Count Filter */}
        <div>
          <input
            id="filter-player-count"
            type="number"
            min="1"
            max="30"
            placeholder="Player Count"
            value={filters.playerCount}
            onChange={(e) => handleChange("playerCount", e.target.value)}
            className="filter placeholder-gray-400"
            aria-label="Filter by Player Count"
          />
        </div>

        {/* Max Play Time Filter */}
        <div>
          <input
            id="filter-max-playtime"
            type="number"
            min="1"
            placeholder="Max Play Time"
            value={filters.maxPlayTime}
            onChange={(e) => handleChange("maxPlayTime", e.target.value)}
            className="filter placeholder-gray-400"
            aria-label="Filter by Max Play Time in minutes"
          />
        </div>

        {/* Max Weight Filter */}
        <div>
          <input
            id="filter-max-weight"
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="Max Weight"
            value={filters.maxWeight}
            onChange={(e) => handleChange("maxWeight", e.target.value)}
            className="filter placeholder-gray-400"
            aria-label="Filter by Max Weight (1.0 - 5.0)"
          />
        </div>

        {/* Minimum Rating Filter */}
        <div>
          <input
            id="filter-min-rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="Minimum Rating"
            value={filters.minRating}
            onChange={(e) => handleChange("minRating", e.target.value)}
            className="filter placeholder-gray-400"
            aria-label="Filter by Minimum Rating (1.0 - 5.0)"
          />
        </div>

        {/* Search / Apply Button */}
        <button
          type="submit"
          className="w-full bg-ludavault-gold hover:bg-ludavault-blue text-white font-medium py-2 px-4 rounded-md shadow-xs text-center"
        >
          Search
        </button>
      </form>
    </div>
  );
}

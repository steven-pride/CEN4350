"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Game, GameType, initialGames } from "@/app/types/game";

interface GameFormProps {
  initialData?: Partial<Game>;
  isEdit?: boolean;
}

export default function GameForm({ initialData, isEdit = false }: GameFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    type: (initialData?.type ?? 0) as GameType,
    minPlayers: initialData?.minPlayers?.toString() || "",
    maxPlayers: initialData?.maxPlayers?.toString() || "",
    playTime: initialData?.playTime?.toString() || "",
    weight: initialData?.weight?.toString() || "",
    rating: initialData?.rating?.toString() || "",
    baseGameId: initialData?.baseGameId?.toString() || "",
    notes: initialData?.notes || "",
  });

 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    // The type dropdown gives string ("0" or "1"), convert to number
    let updatedValue: string | number = fieldValue;
    if (fieldName === "type") {
      updatedValue = Number(fieldValue) as GameType;
    }

    // Keep all existing fields and update the one that changed
    setFormData({
      ...formData,
      [fieldName]: updatedValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission: navigate back to games list, full implementation during backend phase
    setTimeout(() => {
      router.push("/games");
    }, 400);
  };

  // Filter base games for expansion selection
  // Will need to look at Suspense or another way to background load when pulling from real database
  const baseGames = initialGames.filter((g) => g.type === 0);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-6">
      {/* Game Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-1">
          Game Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="filter w-full"
        />
      </div>

      {/* Game Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-semibold mb-1">
          Game Type <span className="text-red-500">*</span>
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="filter w-full"
        >
          <option value={0}>Base Game</option>
          <option value={1}>Expansion</option>
        </select>
      </div>

      {/* Base Game Association (If expansion) */}
      {formData.type === 1 && (
        <div>
          <label htmlFor="baseGameId" className="block text-sm font-semibold mb-1">
            Base Game
          </label>
          <select
            id="baseGameId"
            name="baseGameId"
            value={formData.baseGameId}
            onChange={handleChange}
            className="filter w-full"
          >
            <option value="">-- Select Base Game (Optional) --</option>
            {baseGames.map((bg) => (
              <option key={bg.id} value={bg.id}>
                {bg.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Players Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="minPlayers" className="block text-sm font-semibold mb-1">
            Min Players <span className="text-red-500">*</span>
          </label>
          <input
            id="minPlayers"
            name="minPlayers"
            type="number"
            min="1"
            max="30"
            required
            placeholder="Minimum Players"
            value={formData.minPlayers}
            onChange={handleChange}
            className="filter w-full"
          />
        </div>

        <div>
          <label htmlFor="maxPlayers" className="block text-sm font-semibold mb-1">
            Max Players <span className="text-red-500">*</span>
          </label>
          <input
            id="maxPlayers"
            name="maxPlayers"
            type="number"
            min="1"
            max="30"
            required
            placeholder="Maximum Players"
            value={formData.maxPlayers}
            onChange={handleChange}
            className="filter w-full"
          />
        </div>
      </div>

      {/* Play Time, Weight, Rating Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="playTime" className="block text-sm font-semibold mb-1">
            Play Time (minutes) <span className="text-red-500">*</span>
          </label>
          <input
            id="playTime"
            name="playTime"
            type="number"
            min="1"
            required
            placeholder="Play Time"
            value={formData.playTime}
            onChange={handleChange}
            className="filter w-full"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-semibold mb-1">
            Weight (1.0 - 5.0) <span className="text-red-500">*</span>
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            min="1.0"
            max="5.0"
            step="0.1"
            required
            placeholder="Weight (Complexity)"
            value={formData.weight}
            onChange={handleChange}
            className="filter w-full"
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-semibold mb-1">
            Rating (1.0 - 5.0) <span className="text-red-500">*</span>
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="1.0"
            max="5.0"
            step="0.1"
            required
            placeholder="Personal Rating"
            value={formData.rating}
            onChange={handleChange}
            className="filter w-full"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-semibold mb-1">
          Personal Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Add your thoughts, favorite player counts, or house rules..."
          value={formData.notes}
          onChange={handleChange}
          className="filter w-full resize-none"
        />
      </div>

      {/* Form Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="w-full sm:w-auto bg-ludavault-gold hover:bg-ludavault-blue text-white font-medium py-2 px-6 rounded-md shadow-xs transition text-center"
        >
          {isEdit ? "Save Changes" : "Add Game"}
        </button>
        <Link
          href="/games"
          className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 font-medium py-2 px-6 rounded-md transition text-center"
        >
          Cancel
        </Link>
        {isEdit && (
        <Link
          href={`/games/${formData.id}/delete`}
          className="w-full sm:w-auto bg-red-700 hover:bg-red-500 ml-auto py-2 px-6 text-white font-medium rounded-md transition text-center"
        >
          Delete
        </Link>)}
      </div>
    </form>
  );
}

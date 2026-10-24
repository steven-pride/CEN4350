"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Game, GameType } from "@/app/types/game";
import NotificationBar, { Notification, NotificationType } from "@/app/ui/NotificationBar";

interface GameFormProps {
  initialData?: Partial<Game>|null;
  baseGames?: Game[];
  isEdit?: boolean;
}

export default function GameForm({ baseGames = [], initialData, isEdit = false }: GameFormProps) {
  const router = useRouter();

  const [notification, setNotification] = useState<Notification>({
    type: NotificationType.None,
    message: "",
  });

  const resetNotificationBar = () => {
    setNotification({ type: NotificationType.None, message: "" });
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get data from form
    const payload = {
      name: formData.name,
      gameType: Number(formData.type),
      minPlayers: Number(formData.minPlayers),
      maxPlayers: Number(formData.maxPlayers),
      playTime: Number(formData.playTime),
      weight: parseFloat(formData.weight),
      rating: parseFloat(formData.rating),
      baseGameId: formData.type === 1 && formData.baseGameId ? formData.baseGameId : null,
      notes: formData.notes || null,
    };

    try {
      if (isEdit) {
        setNotification({ type: NotificationType.Info, message: "Updating game..." });

        // Patch the existing game being edited
        const res = await fetch(`/api/games/${formData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to update game");
        }
      } else {
        setNotification({ type: NotificationType.Info, message: "Creating game..." });

        // Post the new game to the table
        const res = await fetch("/api/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to create game");
        }
      }

      // If no error is thrown clear the notification bar and route back to the collections page
      resetNotificationBar();
      router.push("/games");
      router.refresh();
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      if (err instanceof Error) {
        setNotification({ type: NotificationType.Error, message: err.message });
      } else {
        setNotification({ type: NotificationType.Error, message: "An unexpected error occurred" });
      }
    }
  };

  return (
    <div id="GameForm" className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-6">
      <NotificationBar notification={notification} />
      <form onSubmit={handleSubmit} className="space-y-6">
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
            disabled={notification.type === NotificationType.Info}
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
            disabled={notification.type === NotificationType.Info}
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
              disabled={notification.type === NotificationType.Info}
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
              disabled={notification.type === NotificationType.Info}
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
              disabled={notification.type === NotificationType.Info}
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
              disabled={notification.type === NotificationType.Info}
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
              disabled={notification.type === NotificationType.Info}
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
              disabled={notification.type === NotificationType.Info}
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
            disabled={notification.type === NotificationType.Info}
            value={formData.notes}
            onChange={handleChange}
            className="filter w-full resize-none"
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={notification.type === NotificationType.Info}
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
    </div>
    
  );
}

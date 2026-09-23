export type GameType = 0 | 1;

export interface Game {
    id: number;
    name: string;
    type: GameType;
    userId: number;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
    weight: number;
    rating: number;
    baseGameId?: number | null;
    notes?: string | null;
    createdAt: string;
    updatedAt: string;
}

// Will be removed when backend is implemented
export const initialGames: Game[] = [
  { id: 1, name: 'Game 1', type: 0, rating: 1.2, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, notes: 'Fun beginner strategy game.', createdAt: "2026-09-14T12:00:00Z", updatedAt: "2026-09-14T12:00:00Z" },
  { id: 2, name: 'Game 2', type: 1, rating: 2.5, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, baseGameId: 1, notes: 'Expansion for Game 1 with extra components.', createdAt: "2026-09-14T12:00:00Z", updatedAt: "2026-09-14T12:00:00Z" },
  { id: 3, name: 'Game 3', type: 1, rating: 3.0, userId: 1, minPlayers: 1, maxPlayers: 4, playTime: 120, weight: 2.8, baseGameId: 1, notes: 'Adds additional cards and map tiles.', createdAt: "2026-09-14T12:00:00Z", updatedAt: "2026-09-14T12:00:00Z" },
  { id: 4, name: 'Game 4', type: 0, rating: 4.1, userId: 1, minPlayers: 2, maxPlayers: 6, playTime: 90, weight: 3.2, notes: 'Medium complexity engine builder.', createdAt: "2026-09-14T12:00:00Z", updatedAt: "2026-09-14T12:00:00Z" },
  { id: 5, name: 'Game 5', type: 1, rating: 4.8, userId: 1, minPlayers: 2, maxPlayers: 6, playTime: 90, weight: 3.5, baseGameId: 4, notes: 'Essential expansion that improves pacing.', createdAt: "2026-09-14T12:00:00Z", updatedAt: "2026-09-14T12:00:00Z" },
  { id: 6, name: 'Game 6', type: 0, rating: 5.0, userId: 1, minPlayers: 1, maxPlayers: 5, playTime: 60, weight: 2.0, notes: 'Favorite gateway game for game night!', createdAt: "2026-09-14T12:00:00Z", updatedAt: "2026-09-14T12:00:00Z" },
];

// Placeholder until backend is implemented, needed for edit page. 
export function getGameById(id: number | string): Game | undefined {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return initialGames.find((g) => g.id === numericId);
}


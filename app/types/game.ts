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


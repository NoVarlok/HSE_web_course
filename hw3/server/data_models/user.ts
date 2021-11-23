import { PlayedGame } from "./played_game";

export class User {
    id: number | null;
    username: string;
    playedGames: PlayedGame[];
}
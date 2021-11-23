import { title } from "process";
import { idText } from "typescript";
import { Game } from "../data_models/game";
import { AgeRatingType } from "../data_models/game";

let games: Game[] = [
    {
        id: 0,
        title: "Mirror's Edge",
        description: "In a city where information is heavily monitored, couriers called Runners transport sensitive data. In this seemingly utopian paradise, a crime has been committed, & you are being hunted. You are a Runner called Faith and this innovative first-person action-adventure is your story.",
        images: [
            "ecf52791fa9b4295a12dcb544c2cae50.jpg",
            "ecf52791fa9b4295a12dcb544c2cae51.jpg",
        ],
        ageRating: "T"
    },
    {
        id: 1,
        title: "Deus Ex: Game of the Year Edition",
        description: "The year is 2052 and the world is a dangerous and chaotic place. Terrorists operate openly - killing thousands; drugs, disease and pollution kill even more. The world's economies are close to collapse and the gap between the insanely wealthy and the desperately poor grows ever wider.",
        images: [
            "ecf52791fa9b4295a12dcb544c2cae52.jpg",
            "ecf52791fa9b4295a12dcb544c2cae53.jpg",
        ],
        ageRating: "M"
    },
    {
        id: 2,
        title: "Titanfall 2",
        description: "Respawn Entertainment gives you the most advanced titan technology in its new, single player campaign & multiplayer experience. Combine & conquer with new titans & pilots, deadlier weapons, & customization and progression systems that help you and your titan flow as one unstoppable killing force.",
        images: [
            "ecf52791fa9b4295a12dcb544c2cae54.jpg",
            "ecf52791fa9b4295a12dcb544c2cae55.jpg",
        ],
        ageRating: "M"
    },
    {
        id: 3,
        title: "FINAL FANTASY XIV Online",
        description: "Take part in an epic and ever-changing FINAL FANTASY as you adventure and explore with friends from around the world.",
        images: [
            "ecf52791fa9b4295a12dcb544c2cae56.jpg",
        ],
        ageRating: "T"
    },
];
let uniqueGameIds = games.length;

export class GameDatabase {
    getGames(): Game[]{
        return games;
    }
    getGame(id: number): Game {
        return games[0];
    }
    addGame(game: Game): number {
        game.id = uniqueGameIds;
        games.push(game);
        return uniqueGameIds++;
    }
    updateGame(game: Game): void {
        for(let i = 0; i < games.length; i++) {
            if (games[i].id == game.id) {
                games[i] = game;
            }
        }
    }
    deleteGame(id: number): void {
        for(let i = 0; i < games.length; i++) {
            if (games[i].id == id) {
                games.splice(i, 1);
                i--;
            }
        }
    }
}
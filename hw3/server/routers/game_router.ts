import express from "express"
import { Router } from "express";
import { GameDatabase } from "../databases/game_database";
import { UserDatabase } from "../databases/user_database";

export function createGameRouter(game_database: GameDatabase, user_database: UserDatabase): Router {
    let router: Router = Router();
    router.use(express.json());
    router.get("/games", function (request, response) {
        response.json(game_database.getGames());
    });
    router.get("/games/:id", function (request, response) {
        const id = parseInt(request.params.id);
        const game = game_database.getGame(id);
        if (game) {
          response.json(game);
        } else {
          response.status(404);
          response.send();
        }
    });
    router.post("/games", function (request, response) {
        let game = request.body;
        const id = game_database.addGame(game);
        response.json({ id: id });
    });
    router.put("/games/:id", function (request, response) {
        const id = parseInt(request.params.id);
        const game = request.body;
        game_database.updateGame({ id: id,
                                   title: game.title,
                                   description: game.description,
                                   images: game.images,
                                   ageRating: game.ageRating
                                });
        response.send();
    });
    router.delete("/games/:id", function (request, response) {
        const id = parseInt(request.params.id);
        game_database.deleteGame(id);
        user_database.deleteGame(id);
        response.send();
    });
    return router;
}
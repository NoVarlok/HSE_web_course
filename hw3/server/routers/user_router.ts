import express from "express"
import { Router } from "express";
import { GameDatabase } from "../databases/game_database";
import { UserDatabase } from "../databases/user_database";

export function createUserRouter(game_database: GameDatabase, user_database: UserDatabase): Router {
    let router: Router = Router();
    router.use(express.json());
    router.get("/users/:id", function (request, response) {
        const id = parseInt(request.params.id);
        const user = user_database.getUser(id);
        if (user) {
          response.json({ id: user?.id,
                          username: user?.username
                        });
        } else {
          response.status(404);
          response.send();
        }
    });
    router.post("/users", function (request, response) {
        const username: string = request.body.username;
        const id = user_database.addUser({ id: -1,
                                           username: username,
                                           playedGames: [] });
        response.json({ id: id });
    });
    router.put("/users/:id", function (request, response) {
        const id = parseInt(request.params.id);
        const username: string = request.body.username;
        const user = user_database.getUser(id);
        if (user) {
            user_database.updateUser({ id: id,
                                       username: username,
                                       playedGames: user.playedGames
                                     });
        }
        response.send();
    });
    router.delete("/users/:id", function (request, response) {
        const id = parseInt(request.params.id);
        user_database.deleteUser(id);
        response.send();
    });
    router.get("users/:id/games", function (request, response) {
        const id = parseInt(request.params.id);
        const user = user_database.getUser(id);
        if (user) {
            let games = [];
            for (let i = 0; i < user.playedGames.length; i++) {
                games.push({
                    "game": game_database.getGame(user.playedGames[i].id),
                    "playTime": user.playedGames[i].playtime
                });
            }
            response.json({
                "games": games
            });
        } else {
          response.status(404);
          response.send();
        }
    });
    router.post("users/:id/games", function (request, response) {
        const id = parseInt(request.params.id);
        const gameId: number = parseInt(request.body.id);
        const user = user_database.getUser(id);
        if (user) {
            let deleted_game: boolean = false
            for (let i = 0; i < user.playedGames.length; i++) {
                if (user.playedGames[i].id == gameId) {
                    user.playedGames[i].deleted = false;
                    deleted_game = true;
                }
            }
            if (!deleted_game){
                user.playedGames.push({
                    id: gameId,
                    playtime: 0,
                    deleted: false
                });
            }
            user_database.updateUser(user);
        } else {
          response.status(404);
          response.send();
        }
    });
    router.post("users/:id/games/:gameId", function (request, response) {
        const id = parseInt(request.params.id);
        const gameId = parseInt(request.params.gameId);
        const playtime = parseInt(request.body.playTime);
        const user = user_database.getUser(id);
        if (user) {
            for (let i = 0; i < user.playedGames.length; i++) {
                if (user.playedGames[i].id == gameId) {
                    user.playedGames[i].playtime += playtime;
                }
            }
            user_database.updateUser(user);
        } else {
          response.status(404);
          response.send();
        }
    });
    router.delete("users/:id/games/:gameId", function (request, response) {
        const id = parseInt(request.params.id);
        const gameId = parseInt(request.params.gameId);
        const user = user_database.getUser(id);
        if (user) {
            for (let i = 0; i < user.playedGames.length; i++) {
                if (user.playedGames[i].id == gameId) {
                    user.playedGames[i].deleted = true;
                }
            }
            user_database.updateUser(user);
        } else {
            response.status(404);
            response.send();
        }
    });
    return router;
}
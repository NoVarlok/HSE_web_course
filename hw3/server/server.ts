import express from "express";
import { GameDatabase } from "./databases/game_database";
import { UserDatabase } from "./databases/user_database";
import { createFileRouter } from "./routers/file_router";
import { createGameRouter } from "./routers/game_router";
import { createUserRouter } from "./routers/user_router";

const app = express();

const game_database = new GameDatabase();
const user_database = new UserDatabase();

app.use(createGameRouter(game_database, user_database));
app.use(createUserRouter(game_database, user_database));
app.use(createFileRouter());

app.listen(3000, () => {
    console.log("Hi-hi, Ha-ha");
  });
import { User } from "../data_models/user";

let users: User[] = [
    {
        id: 0,
        username: "xXx_sephiroth1997_xXx",
        playedGames: [
            {
                id: 3,
                playtime: 24000,
                deleted: false
            },
            {
                id: 0,
                playtime: 1200,
                deleted: false
            },
            {
                id: 2,
                playtime: 600,
                deleted: false
            },
        ]
    },
    {
        id: 1,
        username: "Gregor",
        playedGames: [
            {
                id: 2,
                playtime: 10500,
                deleted: false
            },
            {
                id: 1,
                playtime: 13800,
                deleted: false
            }
        ]
    }
];
let uniqueUserIds = users.length;

export class UserDatabase {
    getUser(id: number): User | null {
        for(let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                return users[i];
            }
        }
        return null;
    }
    addUser(user: User): number {
        user.id = uniqueUserIds;
        users.push(user);
        return uniqueUserIds++;
    }
    updateUser(user: User): void {
        for(let i = 0; i < users.length; i++) {
            if (users[i].id == user.id) {
                users[i] = user;
            }
        }
    }
    deleteUser(id: number): void {
        for(let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].id = null;
                users[i].username = "";
            }
        }
    }
    deleteGame(id: number): void {
        for(let i = 0; i < users.length; i++) {
            for(let j = 0; j < users[i].playedGames.length; j++) {
                if (users[i].playedGames[j].id == id) {
                    users[i].playedGames.splice(j, 1);
                    j--;
                }
            }
        }
    }
}
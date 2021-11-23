import { Router } from "express";
import { createReadStream, existsSync } from "fs";
import { join } from "path";

export function createFileRouter(): Router {
    let router: Router = Router();
    router.get("/static/text/:fileName", function (request, response) {
        const fileName = request.params.fileName;
        const fullPath = join(__dirname, `../../files/${fileName}`);
        if (existsSync(fullPath)) {
          createReadStream(fullPath).pipe(response);
        } else {
          response.status(404);
          response.send();
        }
    });
    return router
}
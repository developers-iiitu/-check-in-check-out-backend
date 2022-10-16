import { Express, Router } from "express";
import { userSessionCreateHandler } from "../controller/session.controller";
import { validateRequest } from "../middleware";
import { sessionCreateSchema } from "../schema/session.schema";

export default function () {
    const router = Router();
    // create a session -> login
    router.post("/api/session/create", validateRequest(sessionCreateSchema),userSessionCreateHandler);
    // logout
    // get last 5 session delete
    // delete last used session
    return router;
}

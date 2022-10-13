import {Express, Router} from "express";
import { createSessionHandler,deleteSessionHandler } from "../controller/session.controller";
import { requiresUser, validateRequest } from "../middleware";
import { createUserSessionSchema } from "../schema/session.schema";
export default function(){
    const router =  Router();
    // create session
    
    router.post("/api/session/",validateRequest(createUserSessionSchema),createSessionHandler);
    // delete session
    router.delete("/api/session/",requiresUser,deleteSessionHandler);

    return router;
}
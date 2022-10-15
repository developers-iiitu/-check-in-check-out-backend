import {Express, Router} from "express";
import { userStudentCreateHandler } from "../controller/user.controller";
import { validateRequest } from "../middleware";
import { userStudentCreateSchema } from "../schema/user.schema";

export default function(){
    const router = Router();
    // create a student user
    router.post("/api/user/student/create",validateRequest(userStudentCreateSchema),userStudentCreateHandler);
    // user profile
    // update profile -> admin will be able to update any profile on request
    // change password
    // forgot password
    return router;
}
import {Express, Router} from "express";
import { createUserHandler, getUserProfileHandler, updateUserPasswordHandler } from "../controller/user.controller";
import { requiresUser, validateRequest } from "../middleware";
import { createUserSchema, updateUserPasswordSchema,createOtpSentSchema } from "../schema/user.schema";

export default function(){
    const router =  Router();
    // create user
    router.post("/api/user/create",validateRequest(createUserSchema),createUserHandler);

    // user profile
    router.get("/api/user/profile",requiresUser,getUserProfileHandler);

    // update profile

    // change password
    router.post("/api/user/change-password",[requiresUser,validateRequest(updateUserPasswordSchema)],updateUserPasswordHandler);
    // forgot password
        // otp sent
    router.post("/api/user/otp-sent",validateRequest(createOtpSentSchema));
        // otp verify
    router.post("/api/user/otp-verify");
        // change password
    router.post("/api/user/change-password");  
    
    return router;
    
}
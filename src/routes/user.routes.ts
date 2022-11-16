import {Express, Router, Request, Response} from "express";
import { gateGuardIdCreateHandler, userChangePasswordHandler, userProfileHandler, userStudentCreateHandler } from "../controller/user.controller";
import { validateRequest,requiresUser, isAdmin } from "../middleware";
import { userGateGuardCreateSchema, userGetProfileSchema, userPasswordChangeSchema, userStudentCreateSchema } from "../schema/user.schema";
import log from "../lib/logger";
import geoip from "geoip-lite";
export default function(){
    const router = Router();
    // create a student user
    router.post("/api/user/student/create",validateRequest(userStudentCreateSchema),userStudentCreateHandler);
    // user profile
    router.get("/api/user/profile",[validateRequest(userGetProfileSchema),requiresUser],userProfileHandler);
    // update profile -> admin will be able to update any profile on request




    // change password
    router.post("/api/user/change-password",[validateRequest(userPasswordChangeSchema),requiresUser],userChangePasswordHandler);
    // Gate Guard account create by admin
    router.post("/api/user/gate-guard/create",[validateRequest(userGateGuardCreateSchema),requiresUser,isAdmin],gateGuardIdCreateHandler);
    // delete
    // update
    // ftech profiles

    //admin students
    // update
    // get all students
    // auto login


    // forgot password
    router.get("/",(req:Request,res:Response)=>{
      
        var ip="59.89.50.210";
        var geo = geoip.lookup(ip);
        res.status(200).json({userAgent:req.useragent,ip:geo})
    })
    return router;
}
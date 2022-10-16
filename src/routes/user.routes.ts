import {Express, Router, Request, Response} from "express";
import { userStudentCreateHandler } from "../controller/user.controller";
import { validateRequest } from "../middleware";
import { userStudentCreateSchema } from "../schema/user.schema";
import log from "../lib/logger";
import geoip from "geoip-lite";
export default function(){
    const router = Router();
    // create a student user
    router.post("/api/user/student/create",validateRequest(userStudentCreateSchema),userStudentCreateHandler);
    // user profile
    // update profile -> admin will be able to update any profile on request
    // change password
    // forgot password
    router.get("/",(req:Request,res:Response)=>{
      
        var ip="59.89.50.210";
        var geo = geoip.lookup(ip);
        log.info(geo);
        res.status(200).json({userAgent:req.useragent,ip:geo})
    })
    return router;
}
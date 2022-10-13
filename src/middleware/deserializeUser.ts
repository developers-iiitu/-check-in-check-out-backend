import _ from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";
import { recreateAccessToken, sessionValidation } from "../service/session.service";
import log from "../logger";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers["x-access-token"] as string;
    const refreshToken = req.headers["x-refresh-token"] as string;
    if(!accessToken){
        return next();
    }
    
    const {decoded,expired}=decode(accessToken);
  
    if(decoded){
        const result =await sessionValidation(decoded,req.get("user-agent") || "" );
        if(!result){
           return next();
        }
        req.user=result;
        
    }
    if(expired){
        const result=await recreateAccessToken(refreshToken,req.get("user-agent") || "" );
     
        if(!result){
           return next();
        }
        
        res.setHeader("x-access-token",result.accessToken);
        req.user=result.userData;
       
        return next();
    }
    return next();

};

export default deserializeUser;
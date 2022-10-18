import _ from 'lodash';
import {Request,Response,NextFunction} from "express";
import { decode } from '../utils/jwt.utils';
import { recreateAccessToken, sessionValidation } from '../service/session.service';
import log from '../lib/logger';



const deserializeUser = async (req:Request,res:Response,next:NextFunction) =>{
    const accessToken = req.headers["x-access-token"] as string;
    const refreshToken = req.headers["x-refresh-token"] as string;
    let deviceInfo ={
        userAgent:req.get('user-agent') as string || "",
        machineId:req.get('machine-id') as string
    }
    
    if(!refreshToken){
        return next();
    }
    if(accessToken){
        const {decoded,expired} = decode(accessToken);
        
        if(decoded){
            const result = await sessionValidation(decoded,deviceInfo);
            
            if(!result){
                return next();
            }
            req.user = result;
            return next();
        }
    }
    const result = await recreateAccessToken(refreshToken,deviceInfo);
    if(!result) return next();
    res.setHeader("x-access-token",result.accessToken);
    req.user = result.userId;
    return next();
};

export default deserializeUser;
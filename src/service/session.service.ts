import mongoose, { Document, Types } from "mongoose";
import log from "../lib/logger";
import { IUser } from "../model/user.model";
import { ISession } from "../model/session.model";
import { findOnSessionQuery, updateManySession,updateOneSession,createNewSession, findManySessionQuery } from "../repo/session.repo";
import { Request } from "express";
import { sendMail } from "../utils/email.utils";
import { login_attemp } from "../utils/login_attemp";
import { decode, sign } from "../utils/jwt.utils";
import config from "../lib/config/default";


interface SessionData {
    userAgent:string;
    geoLocation:string;
    lastActive: Date;
    machineId?:string;
    valid?:boolean;
    userId?:string;
}

interface IDeviceInfo{
    userAgent: string;
    machineId: string;
}    


const createValidateSession = async (
    user: (Document<unknown, any,IUser> & IUser & {
        _id: Types.ObjectId;
    })
,req:Request) => {
    const machineId = req.body.machineId + '-' + user.id;
    const isMachineExits=await findOnSessionQuery({machineId:machineId,userId:user.id});
    let userAgent = req.get("user-agent") || "";
    if(isMachineExits){
        // valid -> false to every machine
        await updateManySession({userId:user.id,valid:true},{valid:false});
        
        // valid -> true to this machine && update last used
        
        const newData:SessionData={
            userAgent:userAgent,
            geoLocation:req.body.geoLocation,
            lastActive:new Date(),
            valid:true
        }
        await updateOneSession({_id:isMachineExits.id},newData);
        
        // send sessionId
        return isMachineExits;
    }

    // Valid -> false to every machine
    await updateManySession({userId:user.id,valid:true},{valid:false});
    
    // delete machine if count > 5
    // const allUserSessions = await findManySessionQuery({userId:user.id});
    // if(allUserSessions.length>4){

    // }
    // create -> new machine for that user
    const newData:SessionData={
        userAgent:userAgent,
        geoLocation:req.body.geoLocation,
        lastActive:new Date(),
        machineId:machineId,
        valid:true,
        userId:user.id

    }
    const newSession = await createNewSession(newData);
    // login attemp
    const loginAttempData = {
        ip:JSON.parse(newData.geoLocation).IPv4,
        userAgent:userAgent,
        email:user.email,
        timeStamp:newData.lastActive
    }
    sendMail(user.email,`Successful sign-in for ${loginAttempData.email} from new device`,login_attemp(loginAttempData));
    // sessionId
    return newSession;
}

const createAccessToken = async (user:(Document<unknown, any, IUser> & IUser & {
    _id: Types.ObjectId;
}),session:Document<unknown, any, ISession> & ISession & {
    _id: Types.ObjectId;
})=>{
    const accessToken = sign({userId:user.id,sessionId:session.id},{expiresIn:config.get("accessTokenTtl") as string});
    return accessToken; 
}

const createRefreshToken = async (session:Document<unknown, any, ISession> & ISession & {
    _id: Types.ObjectId;
}) =>{
    const refreshToken = sign({ sessionId: session.id },
        { expiresIn: config.get("refreshTokenTtl") as string })
        return refreshToken;
}

const sessionValidation= async(decoded:{userId:mongoose.Types.ObjectId;sessionId:mongoose.Types.ObjectId},deviceInfo:IDeviceInfo)=>{
    
    const session = await findOnSessionQuery({_id:decoded.sessionId,machineId:deviceInfo.machineId+'-'+decoded.userId,userAgent:deviceInfo.userAgent,userId:decoded.userId,valid:true});
    
    if(session===null){
        return false;
    }
    await updateOneSession({_id:session.id},{lastActive:new Date()});
    return decoded.userId;
}

const recreateAccessToken = async(refreshToken:string,deviceInfo:IDeviceInfo)=>{
    const {decoded,expired}= decode(refreshToken);
    if(expired){
        return false;
    }
    if(decoded){
        const session = await findOnSessionQuery({_id:decoded.sessionId,userAgent:deviceInfo.userAgent,valid:true});
        if(session===null || session.machineId!==deviceInfo.machineId+'-'+session.userId){
            return false;
        }
        await updateOneSession({_id:session.id},{lastActive:new Date()});
        const accessToken = sign({userId:session.userId,sessionId:session.id},{expiresIn:config.get("accessTokenTtl") as string});
        return {accessToken:accessToken,userId:session.userId}; 
    }
    return false;
}

export { createValidateSession ,createAccessToken, createRefreshToken, sessionValidation,recreateAccessToken};
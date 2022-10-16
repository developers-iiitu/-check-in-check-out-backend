import { Request, Response } from "express";
import { createAccessToken, createValidateSession,createRefreshToken} from "../service/session.service";
import { userValidationService } from "../service/user.service";


// session create - login

const userSessionCreateHandler = async (req:Request,res:Response)=>{
    // validating Password
    const user = await userValidationService({email:req.body.email,password:req.body.password});
    if(!user){
        return res.status(401).json({msg:"Invalid Email or Password"});
    }
   

    // checking session
    const session = await createValidateSession(user,req);
    // create Access Token
    const accessToken = await createAccessToken(user,session);
    // create Refresh Token
    const refreshToken = await createRefreshToken(session);
    // send Response
    return res.status(200).json({msg:"Login Succesfully",accessToken:accessToken,refreshToken:refreshToken});
}

export {userSessionCreateHandler}
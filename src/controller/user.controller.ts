import log from "../logger";
import { Request, Response } from "express";
import _ from "lodash";
import { createUser, fetchUserProfile, updateUserPassword, validatePassword } from "../service/user.service";
import { sendMail } from "../utils/email.utils";
import { decode } from "../utils/jwt.utils";

// create user - register
export async function createUserHandler(req: Request, res: Response) {
    try {
        // first time user is created
        const { user, otp } = await createUser(req.body);

        // mail verfication when password is sent to mail
        const mailRes = await sendMail((await user).email as string, "Password", `<h1>Your password is: ${otp}</h1>`);
        res.send("Please login with password sent to your mail");
    } catch (e) {
        // luserog.error(e);
        res.status(401).json((e as Error).message);
    }
}


// user profile -get
export async function getUserProfileHandler(req: Request, res: Response) {
  
    return res.send(_.omit(req.user.user.toJSON(),"password"));
}


// change password - post

export async function updateUserPasswordHandler(req:Request,res:Response){
        // validate user with given password
        
        const user=await validatePassword({email:req.user.user.email,password:req.body.password});

        log.info(user);
        if(!user){
            return res.status(401).json({
                message:"Invalid password"
            });
        }
        // update password
        const updatedPassword=await updateUserPassword(req.user.user.id,req.body.newPassword);
        return res.send(200);
        
}
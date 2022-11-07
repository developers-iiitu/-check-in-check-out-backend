import { Request, Response } from "express";
import log from "../lib/logger";
import { findOneAdmin } from "../repo/admin.repo";
import { findOneGateGuard } from "../repo/gate_kepper.repo";
import { findOneStudent } from "../repo/student.repo";
import { findOneUser, userUpdateOne, userValidateQuery } from "../repo/user.repo";
import { createStudentUser } from "../service/student.service";
import { sendMail } from "../utils/email.utils";
import { temp_password } from "../utils/temp_password";
import _ from "lodash"
import config from '../lib/config/default';
import bcrypt from 'bcrypt'
import { userValidationService } from "../service/user.service";
import { updateManySession } from "../repo/session.repo";
// user create student schema

const userStudentCreateHandler = async (req: Request, res: Response) => {
    log.info(req.body);
    // check already existing student
    const user = await findOneUser({email:`${req.body.rollNo}@iiitu.ac.in`});
    if(user){
        return res.status(400).json({msg: "User already exists"});
    }
    // create student
    const newUser = await createStudentUser(req.body);
    // send Email
    sendMail(newUser.user.email,"Your temperory password",temp_password({name:newUser.student.name,password:newUser.password}))
    // send response
    return res.status(200).json({msg:"Student Created"});
};

// user profile
const userProfileHandler = async (req:Request,res:Response)=>{
    const user = await findOneUser({_id:req.user});
    if(!user){
        return res.status(400).json({msg: "User not found"});
    }
    let profile;
    if(user.role===2){
        profile = await findOneStudent({userId:user.id});
    }else if(user.role===1){
        profile = await findOneGateGuard({userId:user.id});
    }else{
        profile = await findOneAdmin({userId:user.id});
    }
    profile=_.omit(profile?.toJSON(),["_id","userId","__v"])
    let data = {
        ...profile,
        email:user.email,
        role:user.role
    };
    return res.status(200).json({msg:"Profile",userData:data});

}

// chnage password
const userChangePasswordHandler = async (req:Request,res:Response)=>{
    
    
    try {
        const user = await findOneUser({_id:req.user});
        if(!user){
            return res.status(401).json({msg:"Invalid User"});
        }
        const isValid = await userValidateQuery({user:user,password:req.body.cpassword});
        if(!isValid){
            return res.status(401).json({msg:"Invalid Email or Password"});
        }

        const salt = await bcrypt.genSalt(config.get("saltWorkFactor") as number);
        const hash = bcrypt.hashSync(req.body.newpassword, salt);
        const updatedPassword = await userUpdateOne({_id:req.user},{password:hash});
        const updateSession = await updateManySession({userId:req.user,valid:true},{valid:false});
        return res.status(200).json({msg:"Password Change Succesfully"});
    } catch (error) {
        log.error(error);
        return res.status(500).json({msg:(error as Error).message});
    }
        
    }


export { userStudentCreateHandler,userProfileHandler,userChangePasswordHandler };


















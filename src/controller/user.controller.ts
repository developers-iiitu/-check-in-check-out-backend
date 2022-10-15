import { Request, Response } from "express";
import log from "../lib/logger";
import { findOneUser } from "../repo/user.repo";
import { createStudentUser } from "../service/student.service";
import { sendMail } from "../utils/email.utils";
import { temp_password } from "../utils/temp_password";

// user create student schema

const userStudentCreateHandler = async (req: Request, res: Response) => {
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


export { userStudentCreateHandler };
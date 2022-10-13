import otpGenrator from 'otp-generator';
import _ from "lodash";
import { createUserQuery, findUserQuery, updateQuery, validatePasswordQuery } from '../repo/user.repo';
import { UserDocument } from '../model/user.model';
import config from '../config/default';
import bcrypt from "bcrypt";
import log from '../logger';
export async function createUser(input: { name: string, roll: number, phone: number,hostelName:string,roomNo:number }) {
    const otp = otpGenrator.generate(10, { specialChars: false, lowerCaseAlphabets: true, upperCaseAlphabets: true, digits: true });
    const userdata = {
        email: `${input.roll}@iiitu.ac.in`,
        name: input.name,
        phone: input.phone,
        password: otp,
        role: "user",
        roomNo:input.roomNo,
        hostelName:input.hostelName
    };
    return await { user: createUserQuery(userdata), otp: otp };

}
export async function validatePassword({
    email, password,
}: {
    email: string;
    password: string;
}) {
    const user = await findUserQuery({email});
    
    if (!user) {
        return false;
    }
    const isValid = await validatePasswordQuery({ user, password });
    log.info(isValid);
    if (!isValid) {
        return false;
    }
    
    return _.omit(user, "password");

}

export async function fetchUserProfile(userId:UserDocument["_id"]){
    const user=await findUserQuery({_id:userId});
    if(user){
        return user;
    }
    return false;
    
}


export async function updateUserPassword(userId:UserDocument["_id"],newPassword:string){
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor") as number);
    const hash = await bcrypt.hashSync(newPassword, salt);
    const user=await updateQuery({_id:userId},{password:hash});
    return user;
}
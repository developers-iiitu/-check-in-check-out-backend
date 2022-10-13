import _ from "lodash";
import log from "../logger";
import User, { UserDocument } from "../model/user.model";
export async function createUserQuery(userdata: {
    email: string;
    name: string;                                                                           
    phone: number;
    password: string;
    role: string;
    hostelName:string;
    roomNo:number;
}) {
    try {
        return await User.create(userdata);
    } catch (error) {
        
        throw new Error((error as Error).message);
    }

}

export async function findUserQuery(query: Object) {
    try {
        const user=await User.findOne(query);
        return user;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}


export async function validatePasswordQuery(input:{user:UserDocument, password:string}) {
   
    return await input.user.comparePassword(input.password);
}


export async function updateQuery(findQuery:Object,updateQuery:Object){
   try {
        const user=await User.updateOne(findQuery,{$set:updateQuery});
        return user;
   } catch (error) {
        throw new Error((error as Error).message);
   }
}



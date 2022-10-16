import { findOneUser, userValidateQuery } from "../repo/user.repo"


const userValidationService = async (data:{email:string,password:string}) =>{
    const user = await findOneUser({email:data.email});
    if(!user){
        return false;
    }
    const isValid = await userValidateQuery({user:user,password:data.password});
    if(!isValid){
        return false;
    }
    return user;
}

export {userValidationService}
import { User } from "../model/user.model";




const findOneUser = async (query:Object) =>{
    return await User.findOne(query);
}

const createUser = async (query:Object)=>{
    try {
        const user = await User.create(query);
        return user;
    } catch (error) {
        throw new Error((error as Error).message);
    }
    
}

export {findOneUser,createUser};
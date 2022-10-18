import { Admin } from "../model/admin.model";

const findOneAdmin = async (query:Object)=>{
    try {
        return await Admin.findOne(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export {findOneAdmin};
import { History } from "../model/history.model";


const findOneHistory = async (query:Object)=>{
    try {
        return await History.findOne(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export {findOneHistory}
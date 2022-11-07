import { History } from "../model/history.model";


const findOneHistory = async (query:Object)=>{
    try {
        return await History.findOne(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

const updateOneHistory = async (query:Object,update:Object,array:Object)=>{
    try {
        return await History.updateOne(query,{
            $set:update,
            $push:array
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

const createHistory = async (query:Object)=>{
    try {
        return await History.create(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
export {findOneHistory,createHistory,updateOneHistory}

import { Session } from "../model/session.model"



const findOnSessionQuery = async (query:Object) =>{
    return await Session.findOne(query);
}

const updateManySession = async (query:Object,data:Object)=>{
    return await Session.updateMany(query,{
        $set:data
    });
}
const findManySessionQuery = async (query:Object)=>{
    return await Session.find(query);
}
const updateOneSession = async (query:Object,data:Object)=>{
    return await Session.updateOne(query,{
        $set:data
    })
}

const createNewSession = async (query:Object)=>{
    return await Session.create(query);
}
export {findOnSessionQuery,updateManySession,updateOneSession,createNewSession,findManySessionQuery};
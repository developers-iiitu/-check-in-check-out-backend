import { QrSession } from "../model/qrCodeValidation.model";


const findOneQrSession = async (query:Object)=>{
    try {
        return await QrSession.findOne(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
const createQrSession = async (query:Object)=>{
    try {
        return await QrSession.create(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
const deleteQrSession = async (query:Object)=>{
    try {
        return await QrSession.deleteOne(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
export {findOneQrSession,deleteQrSession,createQrSession}
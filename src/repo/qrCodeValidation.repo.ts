import { QrSession } from "../model/qrCodeValidation.model";


const findOneQrSession = async (query:Object)=>{
    try {
        return await QrSession.findOne(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export {findOneQrSession}
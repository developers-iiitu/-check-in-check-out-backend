import { Request,Response } from "express"

import config from "../lib/config/default";
import log from "../lib/logger";
import { findOneHistory } from "../repo/history.repo"
import { createQrSession, deleteQrSession, findOneQrSession } from "../repo/qrCodeValidation.repo";




const createQrStudent = async (req:Request,res:Response)=>{
    try {
        let checkHistory = await findOneHistory({userId:req.user,out:true});
        if(checkHistory){
            return res.status(400).send({message:"You are already out"});
        }
        let qrSessionCheck = await findOneQrSession({userId:req.user});
        if(qrSessionCheck){
            let currTime = new Date();
            let diff = currTime.getTime() - qrSessionCheck.sentTime.getTime();
            let allowedTime = config.get('qrValidateTime') as number;
            if(diff<=allowedTime){
                return res.status(200).send({message:"Qr Code already exits",qrCode:qrSessionCheck.id});
            }
            await deleteQrSession({_id:qrSessionCheck.id});
        }
        const userData = {
            userId:req.user,
            purpose:req.body.purpose,
            type:req.body.type,
        }
        const qRSessionData={
            userId:req.user,
            isOut:false,
            sentTime:new Date(),
            data:JSON.stringify(userData)
        }
        log.info(JSON.parse(qRSessionData.data));
        const qrSession = await createQrSession(qRSessionData);
        return res.status(200).send({message:"Qr Code Created",qrCode:qrSession.id});

    } catch (error) {
        log.error(error);
        return res.status(500).json({msg:(error as Error).message});
    }
}

export {createQrStudent}
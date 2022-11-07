import { Request,Response } from "express"
import { zip } from "lodash";
import config from "../lib/config/default";
import { findOneHistory } from "../repo/history.repo"
import { findOneQrSession } from "../repo/qrCodeValidation.repo";




const createQrStudent = async (req:Request,res:Response)=>{
    try {
        let checkHistory = await findOneHistory({userId:req.user,out:true});
        if(checkHistory){
            return res.status(400).send({message:"You are already out"});
        }
        let qrSessionCheck = await findOneQrSession({userId:req.user,isOut:true});
        if(qrSessionCheck){
            let currTime = new Date();
            let diff = currTime.getTime() - qrSessionCheck.sentTime.getTime();
            let allowedTime = config.get('qrValidateTime') as number;
            if(diff<=allowedTime){
                return res.status(200).send({message:"Qr Code already exits",});
            }
        }
        const userData = {
            userId:req.user,
            purpose:req.body.purpose,
            type:req.body.type,
        }

    } catch (error) {
        
    }
}
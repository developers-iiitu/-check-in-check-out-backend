import { Request,Response } from "express"

import config from "../lib/config/default";
import log from "../lib/logger";
import { createHistory, findOneHistory, updateOneHistory } from "../repo/history.repo"
import { createQrSession, deleteQrSession, findOneQrSession } from "../repo/qrCodeValidation.repo";
import {generateQR} from "../service/qr.service";


// Create a QR code for a student
const createQrStudent = async (req:Request,res:Response)=>{
    try {
        let checkHistory = await findOneHistory({userId:req.user,out:true});
        if(checkHistory){
            const userData={
                historyId:checkHistory._id
            }
            
            let qrSession = await createQrSession({userId:req.user,sentTime:new Date(),data:JSON.stringify(userData),isOut:true});
            let base64 = await generateQR(qrSession.id);
            return res.status(200).send({msg:"You are already out so incoming qr",qrCode:base64});
        }
        let qrSessionCheck = await findOneQrSession({userId:req.user});
        if(qrSessionCheck){
            let currTime = new Date();
            let diff = currTime.getTime() - qrSessionCheck.sentTime.getTime();
            let allowedTime = config.get('qrValidateTime') as number;
            if(diff<=allowedTime){
                let base64 = await generateQR(qrSessionCheck.id);
                return res.status(200).send({msg:"Qr Code already exits",qrCode:base64});
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
        let base64 = await generateQR(qrSession.id);
        return res.status(200).send({msg:"Qr Code Created",qrCode:base64});

    } catch (error) {
        log.error(error);
        return res.status(500).json({msg:(error as Error).message});
    }
}

// Scan QR code by gate guard
const scanQrStudent = async (req:Request,res:Response)=>{
   
    try {
        let checkQrSession = await findOneQrSession({_id:req.body.qrCodeSessionId});
        if(!checkQrSession){
            return res.status(400).send({message:"Invalid QR Code"});
        }
        let currTime = new Date();
        let diff = currTime.getTime() - checkQrSession.sentTime.getTime();
        let allowedTime = config.get('qrValidateTime') as number;
        if(diff>allowedTime){
            return res.status(400).send({message:"QR Code Expired"});
        }
        let userData = JSON.parse(checkQrSession.data);
        if(checkQrSession.isOut){
            let historyId=userData.historyId;
            await updateOneHistory({_id:historyId},{out:false,incomingTime:new Date()},{duty:{gateNo:req.body.gateNo,gateGuardId:req.user}});
            await deleteQrSession({_id:req.body.qrCodeSessionId});
            return res.status(200).send({message:"Student is In"});
        }
        else{
            
            if(userData.type===1 && !userData.leaveId){
                return res.status(400).send({message:"Please provide leave"});
            }
            let historyData = {
                ...userData,
                outgoingTime:currTime,
                out:true,
                duty:[{gateNo:req.body.gateNo,gateGuardId:req.user}]
            }
            await createHistory(historyData);
            await deleteQrSession({_id:req.body.qrCodeSessionId});
            return res.status(200).send({message:"Student is Out"});
        }

    } catch (error) {
        log.error(error);
        return res.status(500).json({msg:(error as Error).message});
    }
}
export {createQrStudent,scanQrStudent}
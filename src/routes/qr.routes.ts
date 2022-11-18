import { Express, Router } from "express";
import { isGateGuard, requiresUser, validateRequest } from "../middleware";
import {createQrStudent, scanQrStudent,qrStatus} from "../controller/qr.controller";
import { qrStudentCreateSchema, qrStudentScanSchema } from "../schema/qr.schema";


export default function () {
    const router = Router();
    // create a QR code for a student
    router.post("/api/qr/student/genrate",[requiresUser],createQrStudent);
    // Scan QR code by gate guard
    router.post("/api/qr/student/scan",[validateRequest(qrStudentScanSchema),requiresUser,isGateGuard],scanQrStudent);

    // Qr status
    router.get("/api/qr/student/status",requiresUser,qrStatus);
    return router;
}

import { Express, Router } from "express";
import { isGateGuard, requiresUser, validateRequest } from "../middleware";
import {createQrStudent, scanQrStudent} from "../controller/qr.controller";
import { qrStudentCreateSchema, qrStudentScanSchema } from "../schema/qr.schema";


export default function () {
    const router = Router();
    // create a QR code for a student
    router.post("/api/qr/student/genrate",[validateRequest(qrStudentCreateSchema),requiresUser],createQrStudent);
    // Scan QR code by gate guard
    router.post("/api/qr/student/scan",[validateRequest(qrStudentScanSchema),requiresUser,isGateGuard],scanQrStudent);
    return router;
}

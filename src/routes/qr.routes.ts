import { Express, Router } from "express";
import { requiresUser, validateRequest } from "../middleware";
import {createQrStudent} from "../controller/qr.controller";
import { qrStudentCreateSchema } from "../schema/qr.schema";


export default function () {
    const router = Router();
    // create a QR code for a student
    router.post("/api/qr/student/genrate",[requiresUser,validateRequest(qrStudentCreateSchema)],createQrStudent);
    // Scan QR code by gate guard
    router.post("/api/qr/student/scan",requiresUser,createQrStudent);
    return router;
}

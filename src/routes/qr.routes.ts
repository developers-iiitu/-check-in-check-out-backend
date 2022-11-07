import { Express, Router } from "express";
import { requiresUser } from "../middleware";


export default function () {
    const router = Router();
    // create a QR code for a student
    router.post("/api/qr/student/genrate",[requiresUser]);
    // Scan QR code by gate keeper
    return router;
}

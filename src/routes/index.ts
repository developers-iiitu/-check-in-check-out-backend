import { Express } from "express";
import userRoutes from "./user.routes";
export default function (app: Express) {
    app.use(userRoutes());
}
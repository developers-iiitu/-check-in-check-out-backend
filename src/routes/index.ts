import { Express } from "express";
import sessionRoutes from "./session.routes";
import userRoutes from "./user.routes";
export default function (app: Express) {
    app.use(userRoutes());
    app.use(sessionRoutes())
}
import express from "express";
import { deserializeUser } from "../middleware";
import routes from "../routes";
import cors from "cors";
function createServer() {
    const app = express();

    const options: cors.CorsOptions = {
        origin: "*"
    };

    app.use(cors(options));

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use(deserializeUser);

    routes(app);

    return app;
}

export default createServer;
import express from "express";

import cors from "cors";
function createServer() {
    const app = express();

    const options: cors.CorsOptions = {
        origin: "*"
    };

    app.use(cors(options));

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    return app;
}

export default createServer;
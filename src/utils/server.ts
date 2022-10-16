import express from "express";
import useragent from "express-useragent";
import cors from "cors";
function createServer() {
    const app = express();

    const options: cors.CorsOptions = {
        origin: "*"
    };

    app.use(cors(options));

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use(useragent.express());

    return app;
}

export default createServer;
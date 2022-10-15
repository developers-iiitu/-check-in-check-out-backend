
import log from "./lib/logger";
import config from "./lib/config/default";
import connect from "./lib/db/connect";
import createServer from "./utils/server";
import routes from "./routes";




const port = config.get("port") as number;


const app=createServer();




app.listen(port, () => {
  log.info(`Server is listening on port ${port}`);
  connect();
  routes(app);
});

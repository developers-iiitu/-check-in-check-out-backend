
import log from "./lib/logger";
import config from "./lib/config/default";
import connect from "./lib/db/connect";
import createServer from "./utils/server";




const port = config.get("port") as number;


const app=createServer();




app.listen(port, () => {
  log.info(`Server is listening on port ${port}`);
  connect();
});

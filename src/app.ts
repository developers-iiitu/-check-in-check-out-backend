
import log from "./logger";
import config from "./config/default";
import connect from "./db/connect";
import createServer from "./utils/server";




const port = config.get("port") as number;


const app=createServer();




app.listen(port, () => {
  log.info(`Server is listening on port ${port}`);
  connect();
  

});

import _ from "lodash";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const user = _.get(req, "user", null);
  
  if (!user) {
    return res.sendStatus(403);
  }
  
  return next();
};

export default requiresUser;
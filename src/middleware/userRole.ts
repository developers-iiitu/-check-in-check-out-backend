import { Request, Response, NextFunction } from "express";
import { findOneUser } from "../repo/user.repo";

const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findOneUser({ _id: req.user });
    if(!user){
        return res.status(401).json({msg:"User not found"});
    }
    if (user.role === 0) {
      return next();
    }
    return res.status(401).json({ msg: "You are not authorized" });
  } catch (error) {
    return res.status(500).json({ msg: (error as Error).message });
  }
      
};

export {isAdmin};
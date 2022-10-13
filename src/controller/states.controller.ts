import { Request, Response } from "express";
import ckeckStates from "../service/states.service";

export default function alive(req: Request, res: Response   ){
    ckeckStates();
    res.send("alive");
}

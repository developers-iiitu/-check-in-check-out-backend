import { GateGuard } from "../model/gateGuard.model";

const findOneGateGuard = async (query:Object)=>{
    try {
        return await GateGuard.findOne(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
const createGateGuard = async (query:Object)=>{
    try {
        return await GateGuard.create(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
export {findOneGateGuard,createGateGuard};
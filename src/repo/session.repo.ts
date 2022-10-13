import log from "../logger";
import Session from "../model/session.model";


export async function findAndDeleteSessionQuery(query:Object) {
    return Session.findOneAndDelete(query)
}
export async function deleteSessionQuery(query:Object) {
    return Session.deleteOne(query);
}
export async function sessionCreateQuery(input: { userId: string,userAgent:string }) {
    
    return await Session.create({ userId: input.userId, userAgent:input.userAgent });
   
}

export async function findSessionQuery(query:Object) {
   
    const session=await Session.findOne(query);
   
    return session;
}
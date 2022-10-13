import { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
var userMap = new Map<String, UserDocument >();
var sessionMap = new Map<String, SessionDocument >();


export function addToUserMap(key: String, value:  UserDocument) {
    userMap.set(key, value);
}
export function addToSessionMap(key: String, value:  SessionDocument) {
    sessionMap.set(key, value);
}

export function getFromUserMap(key: String) {
    if (userMap.has(key)) {
        return userMap.get(key);
    }
    return false;

}

export function getFromSessionMap(key: String) {
    if (sessionMap.has(key)) {
        return sessionMap.get(key);
    }
    return false;

}

export function removeFromUserMap(key: String) {
    userMap.delete(key);
}

export function removeFromSessionMap(key: String) {
    sessionMap.delete(key);
}
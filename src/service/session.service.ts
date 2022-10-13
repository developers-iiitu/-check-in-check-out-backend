import { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import {
    findAndDeleteSessionQuery,
    findSessionQuery,
    sessionCreateQuery,
    deleteSessionQuery,
} from "../repo/session.repo";
import { decode, sign } from "../utils/jwt.utils";
import config from "../config/default";
import { LeanDocument } from "mongoose";
import { findUserQuery } from "../repo/user.repo";
import log from "../logger";
import _ from "lodash";
import { addToSessionMap, addToUserMap, getFromSessionMap, getFromUserMap, removeFromSessionMap } from "./cache.service";
export async function createSession(input: {
    userId: string;
    userAgent: string;
}) {
    const sessionCheck = await findAndDeleteSessionQuery({
        userId: input.userId,
    });
    removeFromSessionMap(sessionCheck?.id);
    const session = await sessionCreateQuery(input);

    return session;
}

export function createAccessToken(
    user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "password">>,
    session: SessionDocument    
): string {
    const accessToken = sign(
        { user: user.id, sessionId: session.id },
        { expiresIn: config.get("accessTokenTtl") as string }
    );
    return accessToken;
}

export function createRefreshToken(session: SessionDocument): string {
    const refreshToken = sign(
        { session: session.id },
        { expiresIn: config.get("refreshTokenTtl") as string }
    );
    return refreshToken;
}

export async function sessionValidation(
    decoded: {
        user: UserDocument["_id"];
        sessionId: SessionDocument["_id"];
    },
    userAgent: string
) {
    const cachedSession = getFromSessionMap(decoded.sessionId.toString());
    const session = cachedSession ? cachedSession : await findSessionQuery({ _id: decoded.sessionId });
    if (!session) {
        return false;
    }
    if (!cachedSession) {
        addToSessionMap(decoded.sessionId.toString(), session);
    }

    if (session.userAgent !== userAgent) {
        return false;
    }
    const cachedUser = getFromUserMap(decoded.user.toString());
    const user = cachedUser ? cachedUser : await findUserQuery({ _id: decoded.user });
    if (!user) {
        return false;
    }
    if (!cachedUser) {
        addToUserMap(decoded.user.toString(), user);
    }
    return {user:_.omit(user, "password"),sessionId:session.id};
}

export async function recreateAccessToken(refreshToken: string, userAgent: string) {
    const output = decode(refreshToken);

    if (output.decoded) {
        const cachedSession = getFromSessionMap(output.decoded.session.toString());
        const session = cachedSession ? cachedSession : await findSessionQuery({ _id: output.decoded.session });
        if (!session) {
            return false;
        }
        if (!cachedSession) {
            addToSessionMap(output.decoded.session.toString(), session);
        }

        if (session.userAgent !== userAgent) {
            return false;
        }
        const cachedUser = getFromUserMap(session.userId.toString());
        const user = cachedUser ? cachedUser : await findUserQuery({ _id: session.userId });
        if (!user) return false;
        if (!cachedUser) {
            addToUserMap(session.userId.toString(), user);
        }


        const accessToken = createAccessToken(user, session);
        return { accessToken: accessToken, userData:{user:_.omit(user, "password"),sessionId:session.id} };
    }
    return false;
}

export const deleteSession = async (userData :{user:UserDocument,sessionId:SessionDocument["_id"]}) => {
    removeFromSessionMap(userData.sessionId.toString());
    return deleteSessionQuery({ _id: userData.sessionId });
};
    
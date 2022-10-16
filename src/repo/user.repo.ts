import { Document, Types } from "mongoose";
import { User } from "../model/user.model";
import { IUser } from "../model/user.model";



const findOneUser = async (query: Object) => {
    return await User.findOne(query);
}

const createUser = async (query: Object) => {
    try {
        const user = await User.create(query);
        return user;
    } catch (error) {
        throw new Error((error as Error).message);
    }

}
const userValidateQuery = async (input: {
    user: (Document<unknown, any, IUser> & IUser & {
        _id: Types.ObjectId;
    }), password: string
}) => {
    return await input.user.comparePassword(input.password);
}
export { findOneUser, createUser, userValidateQuery };
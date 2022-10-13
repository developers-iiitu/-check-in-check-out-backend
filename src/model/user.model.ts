import mongoose from "mongoose";
import config from "../config/default";
import bcrypt from "bcrypt";


export enum USER_ROLES {
    ADMIN = 0,
    GATE_GUARD = 1,
    STUDENT = 2
}

export interface IUser {
    email: string;
    password: string;
    role: USER_ROLES;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
};

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: USER_ROLES.STUDENT,
        enum: USER_ROLES

    }
}, {
    timestamps: true
});
const saltRounds = config.get("saltRounds") as number;


userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as IUser;
    return bcrypt.compare(candidatePassword, user.password).catch(e => false);
}


export const User = mongoose.model<IUser>("User", userSchema);






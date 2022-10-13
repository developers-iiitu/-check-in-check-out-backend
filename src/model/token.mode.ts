import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface TokenDocument extends mongoose.Document {
    user: UserDocument["_id"];
    type: string;
    token: string;
    sentTime: Date;

}

const TokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    sentTime: {
        type: Date,
        required: true
    }


},
    {
        timestamps: true
    }
);

const Token = mongoose.model<TokenDocument>("Token", TokenSchema);
export default Token;
import mongoose from "mongoose";
import { UserDocument } from "./user.model";


export interface HistoryDocument extends mongoose.Document {
    user: UserDocument["_id"];
    outgoingTime: Date;
    incomingTime: Date;
    purpose: string;
    destination: string;
    type: string;
    url: string;

}

const HistorySchema = new mongoose.Schema<HistoryDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    outgoingTime: {
        type: Date,
        required: true
    },
    incomingTime: {
        type: Date,
        required: true,
    },
    purpose: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
    }
},
    {
        timestamps: true
    }
);

const Saved = mongoose.model<HistoryDocument>("Token", HistorySchema);
export default Saved;
import mongoose from "mongoose";

export interface IQrSession {
    userId: mongoose.Types.ObjectId;
    isOut:boolean;
    data:string;
    sentTime:Date;
    createdAt: Date;
    updatedAt: Date;
};

const QrSessionSchema = new mongoose.Schema<IQrSession>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    isOut: {
        type: Boolean,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    sentTime: {
        type: Date,
        required: true
    }
});


export const QrSession = mongoose.model<IQrSession>("QrSession", QrSessionSchema);

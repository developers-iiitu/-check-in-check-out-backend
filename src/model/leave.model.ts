import mongoose from "mongoose";

export interface ILeave {
    leaveGrantedFrom: string;
    leaveGrantedTo: string;
    leaveReason: string;
    outgoingTime: Date;
    incomingTime: Date;
    url: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

const LeaveSchema = new mongoose.Schema<ILeave>({
    leaveGrantedFrom: {
        type: String,
        required: true
    },
    leaveGrantedTo: {
        type: String,
        required: true
    },
    leaveReason: {
        type: String,
        required: true
    },
    outgoingTime: {
        type: Date,
        required: true
    },
    incomingTime: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
});


export const Leave = mongoose.model<ILeave>("Leave", LeaveSchema);






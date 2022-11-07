import mongoose from "mongoose";

export enum Leave_Types {
    ONE_DAY = 0,
    ON_LEAVE = 1,
}

export interface IHistory {
    userId: mongoose.Types.ObjectId;
    purpose: string;
    type:Leave_Types;
    leaveId?:mongoose.Types.ObjectId;
    outgoingTime: Date;
    incomingTime: Date;
    out: boolean;
    duty: Array<{gateNo:number,gateGuardId: mongoose.Types.ObjectId}>;
    createdAt: Date;
    updatedAt: Date;
};

const HistorySchema = new mongoose.Schema<IHistory>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    purpose: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true,
        default: Leave_Types.ONE_DAY,
        enum: Leave_Types
    },
    leaveId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leave",
    },
    outgoingTime: {
        type: Date,
        required: true
    },
    incomingTime: {
        type: Date,
       
    },
    out: {
        type: Boolean,
        required: true,
        default: true
    },
    duty: [{
        gateNo: {
            type: Number,
            required: true
        },
        gateGuardId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "GateGuard"
        }
    }],


},{timestamps:true});



export const History = mongoose.model<IHistory>("History", HistorySchema);






import mongoose from "mongoose";


export interface ISession {
    userId: mongoose.Types.ObjectId;
    userAgent: string;
    valid:boolean;
    lastActive: Date;
    ip:Array<string>;
    machineId:string;
    createdAt: Date;
    updatedAt: Date;
};

const SessionSchema = new mongoose.Schema<ISession>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    userAgent: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        required: true,
        default: true
    },
    lastActive: {
        type: Date,
        required: true
    },
    ip: [{
        type: String,
        required: true
    }],
    machineId: {
        type: String,
        required: true,
        unique: true
    }


},{timestamps:true});



export const Session = mongoose.model<ISession>("Session", SessionSchema);






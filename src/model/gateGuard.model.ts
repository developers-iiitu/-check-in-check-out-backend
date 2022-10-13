import mongoose from "mongoose";

export interface IGateGuard {
    name: string;
    phone: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

const GateGuardSchema = new mongoose.Schema<IGateGuard>({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    }
});


export const GateGuard = mongoose.model<IGateGuard>("GateGuard", GateGuardSchema);






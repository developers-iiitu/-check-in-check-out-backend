import mongoose from "mongoose";

export interface IStudent {
    name: string;
    phone: string;
    hostelName: string;
    roomNumber: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

const StudentSchema = new mongoose.Schema<IStudent>({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hostelName: {
        type: String,
        required: true
    },
    roomNumber: {
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


export const Student = mongoose.model<IStudent>("Student", StudentSchema);






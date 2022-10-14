import mongoose from "mongoose";

export interface IAdmin {
    name: string;
    phone: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

const AdminSchema = new mongoose.Schema<IAdmin>({
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


export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);






import mongoose, { Schema, Model, Document } from 'mongoose';

export enum AdminRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN'
}

export interface IAdmin extends Document {
    email: string;
    password?: string;
    name: string;
    role: AdminRole;
    inviteToken?: string;
    inviteTokenExpiry?: Date;
    resetToken?: string;
    resetTokenExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        name: { type: String, required: true },
        role: { type: String, enum: Object.values(AdminRole), default: AdminRole.ADMIN },
        inviteToken: { type: String, required: false },
        inviteTokenExpiry: { type: Date, required: false },
        resetToken: { type: String, required: false },
        resetTokenExpiry: { type: Date, required: false },
    },
    {
        timestamps: true,
    }
);

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;

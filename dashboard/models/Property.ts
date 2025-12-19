import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IProperty extends Document {
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    images: string[];
    category: string;
    description: string;
    features: string[];
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
    {
        title: { type: String, required: true },
        location: { type: String, required: true },
        price: { type: String, required: true },
        beds: { type: Number, required: true },
        baths: { type: Number, required: true },
        sqft: { type: String, required: true },
        images: { type: [String], required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        features: { type: [String], default: [] },
        isFeatured: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Prevent overwrite of model if it already exists (Next.js HMR)
const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);

export default Property;

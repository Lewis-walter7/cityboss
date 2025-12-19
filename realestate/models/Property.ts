import mongoose, { Schema, model, models } from 'mongoose';

export interface IProperty {
    id: number; // For compatibility with existing IDs, but usually _id is used
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

const PropertySchema = new Schema<IProperty>({
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Since we are using Next.js with hot reloading, we need to check if the model already exists
const Property = models.Property || model<IProperty>('Property', PropertySchema);

export default Property;

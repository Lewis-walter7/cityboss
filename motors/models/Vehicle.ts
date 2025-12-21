
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IVehicle extends Document {
    make: string;
    vehicleModel: string;
    year: number;
    price: number;
    mileage: number;
    bodyType: 'SUV' | 'Sedan' | '4x4' | 'Luxury' | 'Coupe' | 'Truck' | 'Convertible';
    transmission: 'Automatic' | 'Manual' | 'CVT' | 'Dual Clutch';
    fuelType: 'Gasoline' | 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'Plug-in Hybrid'; // 'Gasoline' usually == 'Petrol' but keeping both for user pref
    drivetrain: 'FWD' | 'RWD' | 'AWD' | '4WD';
    engineCapacity: number;
    exteriorColor: string;
    interiorColor: string;
    engine: string;
    horsepower: number;
    description: string;
    features: string[];
    tradeInAccepted: boolean;
    privateSeller: boolean;
    images: string[];
    isFeatured: boolean;
    isAvailable: boolean;
    status: 'draft' | 'published';
    lastEditedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
    {
        make: { type: String, required: true },
        vehicleModel: { type: String, required: true },
        year: { type: Number, required: true },
        price: { type: Number, required: true },
        mileage: { type: Number, required: true },
        bodyType: { type: String, required: true },
        transmission: { type: String, required: true },
        fuelType: { type: String, required: true },
        drivetrain: { type: String, required: false },
        engineCapacity: { type: Number, required: false },
        exteriorColor: { type: String, required: false },
        interiorColor: { type: String, required: false },
        engine: { type: String, required: false },
        horsepower: { type: Number, required: false },
        description: { type: String, required: false },
        features: { type: [String], required: false },
        tradeInAccepted: { type: Boolean, default: false },
        privateSeller: { type: Boolean, default: false },
        images: { type: [String], required: false },
        isFeatured: { type: Boolean, default: false },
        isAvailable: { type: Boolean, default: true },
        status: { type: String, enum: ['draft', 'published'], default: 'published' },
        lastEditedBy: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

// Performance Indexes
// Compound index for common filter combinations - dramatically speeds up filtered queries
VehicleSchema.index({
    make: 1,
    bodyType: 1,
    transmission: 1,
    fuelType: 1,
    price: 1,
    createdAt: -1
});

// Text index for search functionality - enables fast full-text search
VehicleSchema.index({
    make: 'text',
    vehicleModel: 'text'
});

// Individual indexes for common single-field queries
VehicleSchema.index({ isFeatured: 1, createdAt: -1 });
VehicleSchema.index({ isAvailable: 1 });
VehicleSchema.index({ status: 1 });
VehicleSchema.index({ price: 1 });
VehicleSchema.index({ year: 1 });

// Prevent overwrite of model if it already exists (Next.js HMR)
const Vehicle: Model<IVehicle> = mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);

export default Vehicle;

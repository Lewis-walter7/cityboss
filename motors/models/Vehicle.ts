import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IVehicle extends Document {
    make: string;
    vehicleModel: string;
    year: number;
    price: number;
    mileage: number;
    bodyType: 'SUV' | 'Sedan' | '4x4' | 'Luxury' | 'Coupe' | 'Truck' | 'Convertible';
    transmission: 'Automatic' | 'Manual';
    fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
    drivetrain: 'FWD' | 'RWD' | 'AWD' | '4WD';
    exteriorColor: string;
    interiorColor: string;
    engine: string;
    horsepower: number;
    description: string;
    features: string[];
    images: string[];
    isFeatured: boolean;
    isAvailable: boolean;
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
        exteriorColor: { type: String, required: false },
        interiorColor: { type: String, required: false },
        engine: { type: String, required: false },
        horsepower: { type: Number, required: false },
        description: { type: String, required: false },
        features: { type: [String], required: false },
        images: { type: [String], required: false },
        isFeatured: { type: Boolean, default: false },
        isAvailable: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

// Prevent overwrite of model if it already exists (Next.js HMR)
const Vehicle: Model<IVehicle> = mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);

export default Vehicle;

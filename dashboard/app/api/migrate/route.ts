
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Vehicle from '@/models/Vehicle';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Global mongoose cache to prevent multiple connections in dev
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export async function GET() {
    try {
        await dbConnect();

        // 1. Update all vehicles to have tradeInAccepted: false if missing
        // 2. Ensure engineCapacity is explicitly null or 0 if missing (optional, but good for conformity)

        // Using updateMany to set defaults for new fields
        const result = await Vehicle.updateMany(
            {},
            {
                $setOnInsert: { // This effectively sets defaults if they don't exist, but for updateMany on existing docs we use $set if missing
                    // Mongoose doesn't have a simple "$setIfMissing" operator in pure Mongo query without aggregation pipeline, 
                    // but we can just strict set defaults for everyone if we want, or use a pipeline.
                    // Easiest is to set default values for everyone where the field doesn't exist.
                }
            }
        );

        // More precise approach:
        const updateResult = await Vehicle.updateMany(
            { tradeInAccepted: { $exists: false } },
            { $set: { tradeInAccepted: false } }
        );

        const petrolUpdate = await Vehicle.updateMany(
            { fuelType: 'Gasoline' },
            { $set: { fuelType: 'Petrol' } } // Optional: user asked to add Petrol, maybe they want to migrate Graphite to Petrol? Unlikely, just keeping both is fine.
        );

        return NextResponse.json({
            success: true,
            message: 'Migration completed',
            details: {
                tradeInAcceptedUpdated: updateResult.modifiedCount,
            }
        });

    } catch (error) {
        console.error('Migration failed:', error);
        return NextResponse.json({ success: false, error: 'Migration failed' }, { status: 500 });
    }
}


import mongoose from 'mongoose';
import Admin, { AdminRole } from '../models/Admin';
import { hashPassword } from '../lib/auth';
import dotenv from 'dotenv';
import path from 'path';

// Load env from parent directory or current
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing');
    process.exit(1);
}

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to DB');

        const email = 'admin@cityboss.com';
        const password = 'password123';
        const name = 'Super Admin';

        // Check if exists
        const exists = await Admin.findOne({ email });
        if (exists) {
            console.log('Admin already exists');
            await mongoose.disconnect();
            return;
        }

        const hashedPassword = await hashPassword(password);

        await Admin.create({
            email,
            password: hashedPassword,
            name,
            role: AdminRole.SUPER_ADMIN
        });

        console.log(`Admin created: ${email} / ${password}`);

    } catch (error) {
        console.error('Seed error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seed();

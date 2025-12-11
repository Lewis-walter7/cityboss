import { getDatabase } from '../lib/mongodb';
import { seedVehicles } from '../lib/seed-data';

async function seedDatabase() {
    try {
        console.log('Connecting to database...');
        const db = await getDatabase();
        const collection = db.collection('vehicles');

        // Clear existing vehicles
        console.log('Clearing existing vehicles...');
        await collection.deleteMany({});

        // Insert seed data
        console.log('Inserting seed vehicles...');
        const result = await collection.insertMany(seedVehicles as any[]);

        console.log(`✅ Successfully seeded ${result.insertedCount} vehicles!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();

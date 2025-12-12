
const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({}, { strict: false });
const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);

async function checkVehicles() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await Vehicle.countDocuments();
        console.log(`Total vehicles in DB: ${count}`);

        if (count > 0) {
            const sample = await Vehicle.findOne();
            console.log('Sample vehicle:', JSON.stringify(sample, null, 2));
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkVehicles();

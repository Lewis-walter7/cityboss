
'use client';

import VehicleForm from '@/components/VehicleForm';

export default function AddVehiclePage() {
    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Add New Vehicle</h1>
                <p className="text-gray-400">Complete the details below to create a new premium listing.</p>
            </div>
            <VehicleForm />
        </div>
    );
}

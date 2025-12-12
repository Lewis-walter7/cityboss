
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import VehicleForm from '@/components/VehicleForm';
import { FaSpinner } from 'react-icons/fa';

export default function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await fetch(`/api/vehicles/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setVehicle(data);
                } else {
                    alert("Vehicle not found");
                    router.push('/motors/vehicles');
                }
            } catch (error) {
                console.error("Failed to fetch vehicle", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchVehicle();
        }
    }, [id, router]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Edit Vehicle</h1>
                <p className="text-gray-400">Update the vehicle details and media.</p>
            </div>
            {vehicle && <VehicleForm initialData={vehicle} isEditMode={true} />}
        </div>
    );
}


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaTag, FaRoad, FaGasPump, FaEdit, FaTrash } from 'react-icons/fa';
import clsx from 'clsx';

interface IVehicle {
    _id: string;
    make: string;
    vehicleModel: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    images: string[];
}

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVehicles = async () => {
        try {
            const res = await fetch('/api/vehicles');
            if (res.ok) {
                const data = await res.json();
                setVehicles(data);
            }
        } catch (error) {
            console.error("Failed to fetch vehicles", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
            try {
                const res = await fetch(`/api/vehicles/${id}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setVehicles(prev => prev.filter(v => v._id !== id));
                    // Optional: Validation toast
                } else {
                    alert("Failed to delete vehicle.");
                }
            } catch (error) {
                console.error("Delete failed", error);
                alert("Error deleting vehicle.");
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Vehicles Inventory</h1>
                    <p className="text-sm md:text-base text-gray-400 mt-1">Manage listing, pricing and availability.</p>
                </div>

                <Link
                    href="/motors/vehicles/new"
                    className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 font-medium"
                >
                    <FaPlus className="mr-2" />
                    Add Vehicle
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse border border-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle._id} className="group bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl">
                            <div className="relative h-48 bg-gray-800">
                                {vehicle.images && vehicle.images.length > 0 ? (
                                    <img src={vehicle.images[0]} alt={`${vehicle.make} ${vehicle.vehicleModel}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <span className="text-white font-bold">KES {vehicle.price.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{vehicle.year} {vehicle.make} {vehicle.vehicleModel}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                            <span className="flex items-center gap-1"><FaRoad className="text-blue-400" /> {vehicle.mileage.toLocaleString()} km</span>
                                            <span className="flex items-center gap-1"><FaGasPump className="text-blue-400" /> {vehicle.fuelType}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                                    <Link href={`/motors/vehicles/${vehicle._id}/edit`} className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                                        <FaEdit className="mr-2 text-gray-400" /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(vehicle._id)}
                                        className="flex-1 flex items-center justify-center py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors"
                                    >
                                        <FaTrash className="mr-2" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

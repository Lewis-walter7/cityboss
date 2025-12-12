'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { formatPrice, formatMileage } from '@/lib/utils';
import { Vehicle } from '@/lib/types';
import { Button } from './Button';

interface VehicleCardProps {
    vehicle: Vehicle;
    onFavoriteToggle?: (vehicleId: string) => void;
    isFavorite?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
    vehicle,
    onFavoriteToggle,
    isFavorite = false,
}) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onFavoriteToggle && vehicle._id) {
            onFavoriteToggle(vehicle._id.toString());
        }
    };

    return (
        <Link href={`/vehicles/${vehicle._id?.toString()}`}>
            <div className="card card-hover group cursor-pointer bg-[#111111] rounded-xl border border-white/5 overflow-hidden">
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                    {vehicle.images && vehicle.images.length > 0 ? (
                        <Image
                            src={vehicle.images[0]}
                            alt={`${vehicle.year} ${vehicle.make} ${vehicle.vehicleModel}`}
                            fill
                            className={`object-cover group-hover:scale-110 transition-transform duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'
                                }`}
                            onLoad={() => setIsImageLoading(false)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-gunmetal)] to-[var(--color-charcoal)] flex items-center justify-center">
                            <span className="text-[var(--color-silver)] text-lg">No Image</span>
                        </div>
                    )}

                    {isImageLoading && vehicle.images && vehicle.images.length > 0 && (
                        <div className="skeleton w-full h-full" />
                    )}

                    <div className="overlay" />

                    {vehicle.isFeatured && (
                        <div className="absolute top-4 left-4 bg-[var(--color-accent)] text-black px-3 py-1 rounded-md text-sm font-semibold">
                            Featured
                        </div>
                    )}

                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Toggle favorite"
                    >
                        {isFavorite ? (
                            <IoHeart className="text-[var(--color-racing-red)]" size={20} />
                        ) : (
                            <IoHeartOutline className="text-white" size={20} />
                        )}
                    </button>
                </div>

                <div className="p-6">
                    <h3 className="text-sm font-bold mb-2">
                        {vehicle.year} {vehicle.make} {vehicle.vehicleModel}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-[var(--color-silver)] mb-4">
                        <span>{formatMileage(vehicle.mileage)} mi</span>
                        <span>•</span>
                        <span>{vehicle.transmission}</span>
                        <span>•</span>
                        <span>{vehicle.fuelType}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-[var(--color-charcoal)] text-xs rounded-full">
                            {vehicle.bodyType}
                        </span>
                        <span className="px-3 py-1 bg-[var(--color-charcoal)] text-xs rounded-full">
                            {vehicle.drivetrain}
                        </span>
                        <span className="px-3 py-1 bg-[var(--color-charcoal)] text-xs rounded-full">
                            {vehicle.exteriorColor}
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="heading-4 text-[var(--color-accent)]">
                            {formatPrice(vehicle.price)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

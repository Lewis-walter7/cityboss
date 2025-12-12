
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface VehicleGalleryProps {
    images: string[];
    title: string;
}

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
    const [mainImageIndex, setMainImageIndex] = useState(0);

    // Ensure we have at least one image to display placeholder if empty
    const displayImages = images.length > 0 ? images : [];

    const handleNext = () => {
        setMainImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setMainImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (displayImages.length === 0) {
        return (
            <div className="h-[500px] bg-[var(--color-gunmetal)] flex items-center justify-center rounded-xl">
                <span className="text-[var(--color-silver)]">No Images Available</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-[500px] rounded-xl overflow-hidden group">
                <Image
                    src={displayImages[mainImageIndex]}
                    alt={`${title} - Main View`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                />

                {/* Navigation Arrows */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm"
                    >
                        <IoChevronBack size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm"
                    >
                        <IoChevronForward size={24} />
                    </button>
                </div>
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {displayImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setMainImageIndex(i)}
                            className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${mainImageIndex === i
                                    ? 'border-[var(--color-accent)] opacity-100 ring-2 ring-[var(--color-accent)]/50'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${title} thumbnail ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

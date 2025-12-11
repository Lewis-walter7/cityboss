import React from 'react';
import Link from 'next/link';
import { getDatabase } from '@/lib/mongodb';
import { Vehicle } from '@/lib/types';
import { ObjectId } from 'mongodb';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatMileage } from '@/lib/utils';
import { IoSpeedometer, IoColorPalette, IoCog, IoFlash, IoShield } from 'react-icons/io5';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    try {
        const db = await getDatabase();
        const vehicle = await db.collection<Vehicle>('vehicles').findOne({ _id: new ObjectId(id) });

        if (!vehicle) {
            return { title: 'Vehicle Not Found' };
        }

        return {
            title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
            description: vehicle.description,
            openGraph: {
                title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${formatPrice(vehicle.price)}`,
                description: vehicle.description,
                images: vehicle.images && vehicle.images.length > 0 ? [vehicle.images[0]] : [],
            },
        };
    } catch {
        return { title: 'Vehicle Details' };
    }
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const db = await getDatabase();
    const vehicle = await db.collection<Vehicle>('vehicles').findOne({ _id: new ObjectId(id) });

    if (!vehicle) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen pt-32 pb-16">
                    <div className="container text-center">
                        <h1 className="heading-2 mb-4">Vehicle Not Found</h1>
                        <p className="text-[var(--color-silver)] mb-8">
                            The vehicle you're looking for doesn't exist or has been sold.
                        </p>
                        <Link href="/listings">
                            <Button>Browse Inventory</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const specs = [
        { icon: IoSpeedometer, label: 'Mileage', value: `${formatMileage(vehicle.mileage)} miles` },
        { icon: IoCog, label: 'Transmission', value: vehicle.transmission },
        { icon: IoFlash, label: 'Engine', value: vehicle.engine },
        { icon: IoShield, label: 'Drivetrain', value: vehicle.drivetrain },
        { icon: IoColorPalette, label: 'Exterior', value: vehicle.exteriorColor },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-32 pb-16">
                <div className="container">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="heading-2 mb-2">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                        </h1>
                        <div className="flex items-center gap-4 text-[var(--color-silver)]">
                            <span>{vehicle.bodyType}</span>
                            <span>•</span>
                            <span>{formatMileage(vehicle.mileage)} miles</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Image Gallery */}
                            <div className="rounded-xl overflow-hidden">
                                {vehicle.images && vehicle.images.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="relative h-[500px]">
                                            <Image
                                                src={vehicle.images[0]}
                                                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                        {vehicle.images.length > 1 && (
                                            <div className="grid grid-cols-3 gap-4">
                                                {vehicle.images.slice(1, 4).map((img, i) => (
                                                    <div key={i} className="relative h-40">
                                                        <Image
                                                            src={img}
                                                            alt={`${vehicle.make} ${vehicle.model} ${i + 2}`}
                                                            fill
                                                            className="object-cover rounded-lg"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-[500px] bg-[var(--color-gunmetal)] flex items-center justify-center rounded-xl">
                                        <span className="text-[var(--color-silver)]">No Images Available</span>
                                    </div>
                                )}
                            </div>

                            {/* Specs */}
                            <div className="glass-strong p-6 rounded-xl">
                                <h2 className="heading-4 mb-6">Specifications</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {specs.map((spec, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="p-3 bg-[var(--color-accent)]/10 rounded-lg">
                                                <spec.icon className="text-[var(--color-accent)]" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--color-silver)]">{spec.label}</p>
                                                <p className="font-semibold">{spec.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-[var(--color-accent)]/10 rounded-lg">
                                            <IoFlash className="text-[var(--color-accent)]" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[var(--color-silver)]">Horsepower</p>
                                            <p className="font-semibold">{vehicle.horsepower} HP</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-[var(--color-accent)]/10 rounded-lg">
                                            <IoColorPalette className="text-[var(--color-accent)]" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[var(--color-silver)]">Interior</p>
                                            <p className="font-semibold">{vehicle.interiorColor}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="glass-strong p-6 rounded-xl">
                                <h2 className="heading-4 mb-4">Description</h2>
                                <p className="text-[var(--color-silver)] leading-relaxed">
                                    {vehicle.description}
                                </p>
                            </div>

                            {/* Features */}
                            {vehicle.features && vehicle.features.length > 0 && (
                                <div className="glass-strong p-6 rounded-xl">
                                    <h2 className="heading-4 mb-4">Features</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {vehicle.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                                                <span className="text-[var(--color-silver)]">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="glass-strong p-6 rounded-xl sticky top-32">
                                <div className="text-center mb-6 pb-6 border-b border-white/10">
                                    <p className="text-sm text-[var(--color-silver)] mb-2">Price</p>
                                    <p className="heading-2 text-[var(--color-accent)]">
                                        {formatPrice(vehicle.price)}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <Link href="/contact">
                                        <Button className="w-full" size="lg">
                                            Contact Us
                                        </Button>
                                    </Link>
                                    <Button className="w-full" size="lg" variant="secondary">
                                        Schedule Test Drive
                                    </Button>
                                </div>

                                <div className="text-sm text-[var(--color-silver)] space-y-2">
                                    <p>📞 Call: +1 (555) 123-4567</p>
                                    <p>✉️ Email: info@citybossmotors.com</p>
                                    <p>📍 123 Auto Drive, City, State</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

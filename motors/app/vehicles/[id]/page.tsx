import React from 'react';
import Link from 'next/link';
import { connectToDB } from '@/lib/mongoose';
import Vehicle from '@/models/Vehicle';
import mongoose from 'mongoose';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatMileage } from '@/lib/utils';
import { IoSpeedometer, IoColorPalette, IoCog, IoFlash, IoShield, IoLogoWhatsapp, IoCall } from 'react-icons/io5';
import { Metadata } from 'next';
import Image from 'next/image';
import { VehicleGallery } from '@/components/ui/VehicleGallery';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    try {
        await connectToDB();

        if (!mongoose.isValidObjectId(id)) {
            return { title: 'Vehicle Not Found' };
        }

        const vehicle = await Vehicle.findById(id).lean();

        if (!vehicle) {
            return { title: 'Vehicle Not Found' };
        }

        return {
            title: `${vehicle.year} ${vehicle.make} ${vehicle.vehicleModel}`,
            description: vehicle.description,
            openGraph: {
                title: `${vehicle.year} ${vehicle.make} ${vehicle.vehicleModel} - ${formatPrice(vehicle.price)}`,
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

    await connectToDB();

    let vehicle = null;
    if (mongoose.isValidObjectId(id)) {
        vehicle = await Vehicle.findById(id).lean();
    }

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
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="heading-2">
                                {vehicle.year} {vehicle.make} {vehicle.vehicleModel}
                            </h1>
                            {vehicle.privateSeller && (
                                <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/50 text-purple-300 text-sm font-bold rounded-full">
                                    PRIVATE SELLER
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-[var(--color-silver)]">
                            <span>{vehicle.bodyType}</span>
                            <span>•</span>
                            <span>{formatMileage(vehicle.mileage)} miles</span>
                            {vehicle.tradeInAccepted && (
                                <>
                                    <span>•</span>
                                    <span className="text-green-400">Trade-In Accepted</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8 pl-4 lg:pl-0">
                            {/* Image Gallery */}
                            <div className="rounded-xl overflow-hidden">
                                <VehicleGallery
                                    images={vehicle.images || []}
                                    title={`${vehicle.year} ${vehicle.make} ${vehicle.vehicleModel}`}
                                />
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
                                    <Link href={`https://wa.me/254713111106?text=Hi, I am interested in the ${vehicle.make} ${vehicle.vehicleModel}`} target="_blank">
                                        <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] mb-2 text-white flex items-center justify-center gap-2 rounded-xl" size="lg">
                                            <IoLogoWhatsapp size={20} />
                                            Enquire via Whatsapp
                                        </Button>
                                    </Link>
                                    <Link href="tel:+254713111106">
                                        <Button className="w-full bg-black rounded-xl hover:bg-black/80 flex items-center justify-center gap-2" size="lg" variant="secondary">
                                            <IoCall size={20} />
                                            Call Now
                                        </Button>
                                    </Link>
                                </div>

                                <div className="text-sm text-[var(--color-silver)] space-y-2">
                                    <p>📞 +254 713 111106</p>
                                    <p>✉️ info@citybossmotors.co.ke</p>
                                    <p>📍 Ridgeway Astro Petro Station, <br />
                                        Kiambu Road, Kiambu, Kenya</p>
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

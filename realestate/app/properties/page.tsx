import React from 'react';
import Link from 'next/link';
import { Bed, Bath, Maximize, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/Footer';

import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export default async function PropertiesPage() {
    await dbConnect();
    const properties = await Property.find({}).sort({ createdAt: -1 });

    return (
        <main className="min-h-screen pt-32 pb-20 bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div>
                        <h1 className="heading-1 mb-4 text-white">Kenya&apos;s <span className="text-[var(--color-accent)]">Finest</span></h1>
                        <p className="text-zinc-500 text-lg max-w-xl">
                            Browse our exclusive collection of premium properties across Nairobi and the Kenyan coast.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input type="text" placeholder="Search Kenya locations..." className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors" />
                        </div>
                        <Button variant="outline">Filters</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div key={property.id} className="group glass rounded-[var(--radius-lg)] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent-glow)]">
                            <div className="relative h-72 overflow-hidden">
                                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 glass-strong px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">{property.category}</div>
                                <div className="absolute top-4 right-4 glass-strong px-3 py-1 rounded-full text-sm font-bold text-[var(--color-accent)]">{property.price}</div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-1 text-zinc-500 text-xs mb-2">
                                    <MapPin className="w-3 h-3" />
                                    {property.location}
                                </div>
                                <h3 className="heading-4 text-white mb-6 group-hover:text-[var(--color-accent)] transition-colors">
                                    {property.title}
                                </h3>

                                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Bed className="w-4 h-4" />
                                            <span className="text-sm font-semibold text-white">{property.beds > 0 ? property.beds : 'N/A'}</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-tighter text-zinc-600">Beds</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Bath className="w-4 h-4" />
                                            <span className="text-sm font-semibold text-white">{property.baths > 0 ? property.baths : 'N/A'}</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-tighter text-zinc-600">Baths</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Maximize className="w-4 h-4" />
                                            <span className="text-sm font-semibold text-white">{property.sqft}</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-tighter text-zinc-600">{property.beds > 0 ? 'Sft' : 'Area'}</span>
                                    </div>
                                </div>
                                <Link href={`/properties/${property.id}`} className="pointer-events-auto">
                                    <Button className="w-full mt-8" variant="outline">View Property</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}

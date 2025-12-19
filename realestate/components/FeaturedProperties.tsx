import React from 'react';
import Link from 'next/link';
import { Bed, Bath, Maximize, MapPin, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';

import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export const FeaturedProperties = async () => {
    await dbConnect();
    const properties = await Property.find({ isFeatured: true }).limit(3).sort({ createdAt: -1 });

    return (
        <section id="properties" className="py-24 bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="heading-2 mb-4 text-white">Featured <span className="text-[var(--color-accent)]">Properties</span></h2>
                        <p className="text-zinc-400 text-lg">
                            Explore our hand-picked selection of the most prestigious properties currently on the market.
                        </p>
                    </div>
                    <Link href="/properties">
                        <Button variant="ghost" className="group">
                            View All Properties
                            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div key={property._id.toString()} className="group relative glass rounded-[var(--radius-lg)] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--color-accent-glow)] hover:-translate-y-1">
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 glass-strong px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                                    {property.category}
                                </div>
                                <div className="absolute top-4 right-4 glass-strong px-3 py-1 rounded-full text-sm font-bold text-[var(--color-accent)]">
                                    {property.price}
                                </div>
                            </div>

                            {/* Content ... */}
                            <div className="p-6">
                                <div className="flex items-center gap-1 text-zinc-500 text-xs mb-2">
                                    <MapPin className="w-3 h-3" />
                                    {property.location}
                                </div>
                                <h3 className="heading-4 text-white mb-4 group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
                                    {property.title}
                                </h3>

                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
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
                                        <span className="text-[10px] uppercase tracking-tighter text-zinc-600">{property.category === 'Prime Land' ? 'Area' : 'Sft'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Overlay Button */}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <Link href={`/properties/${property._id}`} className="pointer-events-auto">
                                    <Button size="sm">View Details</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

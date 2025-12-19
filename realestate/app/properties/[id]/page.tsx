import React from 'react';
import { useParams } from 'next/navigation';
import { Bed, Bath, Maximize, MapPin, ChevronLeft, Calendar, Shield, Share2, Heart, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/Footer';

import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

export default async function PropertyDetailPage({ params }: Props) {
    await dbConnect();
    const { id } = await params;

    let property;
    try {
        property = await Property.findById(id);
    } catch (e) {
        return notFound();
    }

    if (!property) {
        return notFound();
    }


    return (
        <main className="min-h-screen bg-[var(--color-background)] pb-20 pt-24">
            {/* Header / Navigation */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <Link href="/properties" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Properties
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="glass-strong px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                                {property.category}
                            </span>
                        </div>
                        <h1 className="heading-2 text-white mb-2">{property.title}</h1>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <MapPin className="w-4 h-4" />
                            <span>{property.location}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[var(--color-accent)] text-4xl font-bold mb-1">{property.price}</div>
                        <div className="text-zinc-500 text-sm uppercase tracking-widest">Guide Price</div>
                    </div>
                </div>
            </div>

            {/* Content Gallery & Specs */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Gallery & Details */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Main Image */}
                    <div className="aspect-[16/10] rounded-[var(--radius-lg)] overflow-hidden glass p-2">
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover rounded-[calc(var(--radius-lg)-8px)]"
                        />
                    </div>

                    {/* Gallery Thumbnails */}
                    {property.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {property.images.map((img: string, i: number) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden glass p-1 cursor-pointer hover:p-0 transition-all">
                                    <img src={img} alt={`${property.title} ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Quick Specs */}
                    <div className="glass p-8 rounded-[var(--radius-lg)] grid grid-cols-3 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                                <Bed className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-white font-bold">{property.beds > 0 ? property.beds : 'N/A'}</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Bedrooms</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                                <Bath className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-white font-bold">{property.baths > 0 ? property.baths : 'N/A'}</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Bathrooms</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                                <Maximize className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-white font-bold">{property.sqft}</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500">{property.beds > 0 ? 'Square Ft' : 'Total Area'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="heading-4 text-white mb-6">Property Overview</h3>
                        <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-wrap">
                            {property.description}
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div>
                        <h3 className="heading-4 text-white mb-6">Premium Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {property.features?.map((feature: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 text-zinc-300 bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                                    <Shield className="w-4 h-4 text-[var(--color-accent)]" />
                                    <span className="text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Inquiry & Actions */}
                <div className="space-y-8">
                    {/* Inquiry Card */}
                    <div className="glass p-8 rounded-[var(--radius-lg)] sticky top-32 shadow-2xl border border-white/10">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                            Inquire for Private View
                        </h3>

                        <form className="space-y-4">
                            <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none" />
                            <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none" />
                            <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none" />
                            <textarea rows={4} placeholder="Your message..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none" />

                            <Button className="w-full py-4 font-bold tracking-widest text-xs uppercase">Schedule Viewing</Button>
                        </form>

                        <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/5">
                            <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                <Heart className="w-4 h-4" />
                                Save
                            </button>
                            <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Agent Tip */}
                    <div className="bg-[var(--color-accent)]/10 p-6 rounded-[var(--radius-lg)] border border-[var(--color-accent)]/20">
                        <div className="flex gap-3">
                            <Calendar className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                            <div>
                                <h4 className="text-white text-sm font-bold mb-1">Schedule a Consultation</h4>
                                <p className="text-zinc-500 text-xs leading-relaxed">
                                    Our executive advisors are available for evening and weekend consultations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

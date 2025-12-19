import React from 'react';
import { Button } from './ui/Button';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[var(--color-background)] z-10" />
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury modern villa"
                    className="w-full h-full object-cover scale-105 animate-pulse-slow"
                />
            </div>

            <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                    </span>
                    <span className="text-xs font-semibold tracking-wider uppercase text-white/80">Premier Kenya Real Estate</span>
                </div>

                <h1 className="heading-1 mb-6 text-gradient">
                    Kenya&apos;s Most <br />
                    <span className="text-white">Exclusive Estates</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-medium [text-shadow:_0_1px_20px_rgb(0_0_0_/_60%)]">
                    Discover a curated collection of ultra-luxury estates and prime development land in Kenya&apos;s most desirable locations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="w-full sm:w-auto">Explore Properties</Button>
                </div>

                {/* Stats */}
                <div className="mt-20 grid justify-center grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/5 pt-10">
                    {[
                        { label: 'Properties', value: '450+' },
                        { label: 'Happy Clients', value: '1.2k' },
                        { label: 'Award Winning', value: '25' },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { SpinningWheel } from './SpinningWheel';
import { IoArrowForward, IoTrendingUp, IoShieldCheckmark, IoSpeedometer } from 'react-icons/io5';

export const NewHero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-background)] pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)] opacity-5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Side: Content (Cols 5) */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                            <span className="text-xs font-medium tracking-wide text-[var(--color-silver)] uppercase">2025 Inventory Arriving</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                            City Boss <br />
                            <span className="text-gradient">Motors</span>
                        </h1>

                        <p className="text-lg text-[var(--color-silver)] mb-10 max-w-lg leading-relaxed font-light">
                            Redefining the car buying experience. From luxury sedans to powerful 4x4s, find your perfect match with our AI-powered selection process.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Link href="/listings">
                                <Button size="lg" className="w-full sm:w-auto min-w-[160px] group shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                                    Explore Cars
                                    <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/sell">
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto min-w-[160px]">
                                    Sell Vehicle
                                </Button>
                            </Link>
                        </div>

                        {/* Trending / Stats Area */}
                        <div className="bg-[#111]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-semibold text-white">Trending Now</span>
                                <span className="text-xs text-[var(--color-accent)]">View Report</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[var(--color-accent)] transition-colors" />
                                        <span className="text-sm text-[var(--color-silver)] group-hover:text-white transition-colors">Electric SUVs</span>
                                    </div>
                                    <span className="text-xs font-mono text-[var(--color-silver)]">High Demand</span>
                                </div>
                                <div className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[var(--color-accent)] transition-colors" />
                                        <span className="text-sm text-[var(--color-silver)] group-hover:text-white transition-colors">Luxury Sedans</span>
                                    </div>
                                    <span className="text-xs font-mono text-[var(--color-silver)] text-orange-400">Viral</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right Side: Spinning Animation (Cols 7) */}
                    <div className="lg:col-span-7 h-[600px] flex items-center justify-center relative">
                        <SpinningWheel />
                    </div>
                </div>
            </div>
        </section>
    );
};

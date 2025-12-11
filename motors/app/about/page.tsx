'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { IoShieldCheckmark, IoRibbonOutline, IoDiamondOutline, IoPeopleOutline } from 'react-icons/io5';

const stats = [
    { label: 'Years of Experience', value: '15+' },
    { label: 'Vehicles Sold', value: '2,500+' },
    { label: 'Happy Clients', value: '98%' },
    { label: 'Premium Brands', value: '12+' },
];

const values = [
    {
        icon: IoShieldCheckmark,
        title: 'Uncompromised Quality',
        desc: 'Every vehicle undergoes a rigourous 150-point inspection by certified technicians.'
    },
    {
        icon: IoRibbonOutline,
        title: 'Transparent Pricing',
        desc: 'No hidden fees or surprises. The price you see is the price you pay, guaranteed.'
    },
    {
        icon: IoDiamondOutline,
        title: 'Premium Selection',
        desc: 'We curate only the finest specifications and trims for the discerning driver.'
    },
    {
        icon: IoPeopleOutline,
        title: 'Lifetime Support',
        desc: 'Our relationship doesn\'t end at the sale. Enjoy lifetime support and advice.'
    }
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16 bg-[var(--color-background)] overflow-hidden">
                <div className="container mx-auto px-6">

                    {/* Hero Section */}
                    <div className="relative py-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none"
                        />

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="heading-1 mb-6 relative z-10"
                        >
                            We Are <span className="text-gradient">City Boss Motors</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-[var(--color-silver)] max-w-3xl mx-auto leading-relaxed relative z-10"
                        >
                            Redefining the luxury car buying experience in Kenya.
                            Where passion meets performance, and quality is the only standard we know.
                        </motion.p>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                        {/* Story Card - Large */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 glass-strong p-10 rounded-3xl flex flex-col justify-center relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-500" />
                            <h2 className="heading-3 mb-6 relative z-10">Our Story</h2>
                            <div className="space-y-4 text-[var(--color-silver)] text-lg leading-relaxed relative z-10">
                                <p>
                                    Founded with a singular vision to elevate the automotive landscape in Nairobi, City Boss Motors isn't just a dealership—it's a curator of automotive excellence.
                                </p>
                                <p>
                                    We realized that the Kenyan market deserved better than vetted imports and opaque pricing. We established a showroom where every car tells a story of quality, maintenance, and prestige. From the moment you walk in, to the moment you drive out, we ensure a world-class experience.
                                </p>
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-white/5 hover:border-[var(--color-accent)]/30 transition-colors"
                                >
                                    <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                                    <span className="text-sm text-[var(--color-silver)]">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="mb-16">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="heading-2 text-center mb-12"
                        >
                            Why Drive With Us?
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-strong p-8 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent)] to-orange-600 rounded-xl flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-[var(--color-silver)] leading-relaxed text-sm">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Strip */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="h-64 rounded-3xl overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gunmetal)] via-[var(--color-background)] to-[var(--color-gunmetal)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-4xl md:text-6xl font-bold text-white/5 uppercase tracking-widest pointer-events-none select-none">
                                Excellence in Motion
                            </h2>
                        </div>
                        {/* Decorative lines */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />
                    </motion.div>

                </div>
            </main>
            <Footer />
        </>
    );
}

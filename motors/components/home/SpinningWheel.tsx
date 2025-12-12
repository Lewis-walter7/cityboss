'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    SiBmw, SiMercedes, SiPorsche,
    SiToyota, SiNissan, SiSubaru, SiMitsubishi, SiMazda
} from 'react-icons/si';
import { IoCarSport, IoStar } from 'react-icons/io5';

// Brands popular in Kenya + Luxury tier
const brands = [
    { icon: SiToyota, label: 'Toyota', tier: 'standard' },
    { icon: SiMercedes, label: 'Mercedes', tier: 'luxury' },
    { icon: SiSubaru, label: 'Subaru', tier: 'standard' },
    { icon: SiBmw, label: 'BMW', tier: 'luxury' },
    { icon: SiNissan, label: 'Nissan', tier: 'standard' },
    { icon: SiPorsche, label: 'Porsche', tier: 'luxury' },
    { icon: SiMazda, label: 'Mazda', tier: 'standard' },
    { icon: SiMitsubishi, label: 'Mitsubishi', tier: 'standard' },
];

export const SpinningWheel: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Responsive values based on screen size
    const containerSize = isMobile ? 320 : 480;
    const center = containerSize / 2;
    const radius = isMobile ? 140 : 210;
    const logoSize = isMobile ? 40 : 56;
    const logoHalfSize = logoSize / 2;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[100px]" />
            </div>

            {/* Main Rotating Container - Forced Aspect Square for Perfect Circle */}
            <div
                className="relative flex items-center justify-center"
                style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
            >

                {/* Ripple Circles */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--color-accent)]/40 rounded-full"
                        style={{ width: `${i * 35}%`, height: `${i * 35}%` }}
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.4, 0.8, 0.4],
                            borderColor: [`rgba(255, 85, 0, 0.3)`, `rgba(255, 85, 0, 0.6)`, `rgba(255, 85, 0, 0.3)`]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                        }}
                    />
                ))}

                {/* Central Hub */}
                <motion.div
                    className="absolute z-20 rounded-full bg-[#111] border-2 border-[var(--color-accent)] shadow-[0_0_40px_rgba(255,85,0,0.4)] flex items-center justify-center"
                    style={{
                        width: isMobile ? '64px' : '96px',
                        height: isMobile ? '64px' : '96px'
                    }}
                    animate={{
                        boxShadow: [
                            "0 0 20px rgba(255, 85, 0, 0.2)",
                            "0 0 50px rgba(255, 85, 0, 0.6)",
                            "0 0 20px rgba(255, 85, 0, 0.2)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <IoCarSport className={isMobile ? 'text-2xl' : 'text-4xl'} style={{ color: 'var(--color-accent)' }} />
                </motion.div>

                {/* Orbiting Elements Container */}
                <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
                    {brands.map((brand, index) => {
                        const angle = (index / brands.length) * 2 * Math.PI;
                        const top = center + Math.sin(angle) * radius;
                        const left = center + Math.cos(angle) * radius;
                        const isLuxury = brand.tier === 'luxury';

                        return (
                            <motion.div
                                key={index}
                                className={`absolute rounded-2xl flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 group ${isLuxury
                                    ? 'bg-black/80 border border-[var(--color-accent)] shadow-[0_0_15px_rgba(255,85,0,0.3)]'
                                    : 'bg-[#1a1a1a]/90 border border-white/10 hover:border-white/30'
                                    }`}
                                style={{
                                    width: `${logoSize}px`,
                                    height: `${logoSize}px`,
                                    top: `${top}px`,
                                    left: `${left}px`,
                                    marginLeft: `-${logoHalfSize}px`,
                                    marginTop: `-${logoHalfSize}px`,
                                }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                whileHover={{ scale: 1.2 }}
                            >
                                <brand.icon
                                    className={`transition-colors ${isLuxury ? 'text-[var(--color-accent)]' : 'text-[#888] group-hover:text-white'
                                        }`}
                                    style={{ fontSize: isMobile ? '20px' : '24px' }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Stats - Positioned relative to main container wrapper */}
            <motion.div
                className="absolute top-[10%] right-[5%] lg:right-[15%] bg-[#111]/90 backdrop-blur border border-white/5 p-3 rounded-xl flex items-center gap-3 shadow-xl z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="p-2 bg-green-500/20 rounded-lg">
                    <IoStar className="text-green-500" />
                </div>
                <div>
                    <p className="text-xs text-[var(--color-silver)]">Trusted</p>
                    <p className="text-sm font-bold text-white">KE Market</p>
                </div>
            </motion.div>
        </div>
    );
};

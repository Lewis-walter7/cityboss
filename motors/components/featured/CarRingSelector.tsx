'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface CarModel {
    id: string;
    name: string;
    modelPath: string;
    brand: string;
    price: string;
    year: string;
}

interface CarRingSelectorProps {
    cars: CarModel[];
    activeCarId: string;
    onSelect: (id: string) => void;
}

const CarRingSelector: React.FC<CarRingSelectorProps> = ({ cars, activeCarId, onSelect }) => {
    // We'll display them in a horizontal list for now, styled as a "ring" or premium selector
    // A true 3D ring UI in HTML/CSS can be complex, so we'll start with a premium horizontal carousel
    // that centers the active item.

    return (
        <div className="w-full relative py-8 overflow-hidden">
            {/* Background decorative line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2" />

            <div className="flex items-center justify-center gap-8 perspective-1000">
                {cars.map((car) => {
                    const isActive = car.id === activeCarId;

                    return (
                        <motion.button
                            key={car.id}
                            onClick={() => onSelect(car.id)}
                            className={`relative group flex flex-col items-center justify-center transition-all duration-300 focus:outline-none z-10`}
                            animate={{
                                scale: isActive ? 1.2 : 0.9,
                                opacity: isActive ? 1 : 0.5,
                                y: isActive ? 0 : 10,
                            }}
                            whileHover={{ scale: isActive ? 1.25 : 1, opacity: 1, y: 0 }}
                        >
                            {/* Circle Indicator */}
                            <div
                                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-300
                                    ${isActive
                                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_20px_var(--color-accent)]'
                                        : 'border-white/20 group-hover:border-white/60 bg-black/40'
                                    }`}
                            >
                                <span className={`text-xs font-bold ${isActive ? 'text-[var(--color-accent)]' : 'text-white'}`}>
                                    {car.year.slice(2)}
                                </span>
                            </div>

                            {/* Text Info */}
                            <div className="text-center">
                                <h3 className={`text-sm font-bold uppercase tracking-wider whitespace-nowrap ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                                    {car.brand}
                                </h3>
                                <p className={`text-xs ${isActive ? 'text-[var(--color-accent)]' : 'text-zinc-600'}`}>
                                    {car.name.replace(car.brand, '').trim()}
                                </p>
                            </div>

                            {/* Active Glow */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute inset-0 bg-[var(--color-accent)]/20 blur-xl -z-10 rounded-full"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default CarRingSelector;

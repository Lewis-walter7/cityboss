'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IoStar } from 'react-icons/io5';
import { Testimonial } from '@/lib/types';

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        content: 'Absolutely amazing experience! Found my dream car and the team made everything so easy. Highly recommend City Boss Motors!',
        date: '2024-11-15',
        role: 'Verified Buyer'
    },
    {
        id: 2,
        name: 'Michael Chen',
        rating: 5,
        content: 'Professional service from start to finish. They went above and beyond to find the perfect SUV for my family.',
        date: '2024-11-08',
        role: 'Business Owner'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        rating: 5,
        content: 'The quality of vehicles here is unmatched. Bought a BMW X5 and it\'s in pristine condition. Will definitely be back!',
        date: '2024-10-28',
        role: 'Automotive Enthusiast'
    }
];

export const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-[var(--color-surface)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Background glow for the section */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="text-center mb-16 relative z-10">
                    <h2 className="heading-2 mb-4">Client Stories</h2>
                    <p className="text-[var(--color-silver)] text-lg">
                        See what our valued clients have to say about their experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="glass-strong p-8 rounded-2xl relative group hover:border-[var(--color-accent)]/30 transition-all duration-500 hover:transform hover:-translate-y-2"
                        >
                            <div className="absolute top-6 right-8 text-[var(--color-accent)] opacity-10 text-8xl font-serif leading-none h-16 overflow-hidden select-none">"</div>

                            <div className="flex gap-1 mb-6 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <IoStar
                                        key={i}
                                        size={16}
                                        className={i < testimonial.rating ? 'text-[var(--color-accent)]' : 'text-gray-800'}
                                    />
                                ))}
                            </div>

                            <p className="text-[var(--color-silver)] mb-8 leading-relaxed relative z-10 font-light">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 relative flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-purple-600 shadow-lg">
                                    <span className="text-white font-bold text-lg tracking-wide">
                                        {getInitials(testimonial.name)}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white tracking-wide">{testimonial.name}</h4>
                                    <p className="text-xs text-[var(--color-accent)] font-medium uppercase tracking-wider">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

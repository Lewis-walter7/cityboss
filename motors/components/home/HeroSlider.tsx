'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Button } from '../ui/Button';

const slides = [
    {
        id: 1,
        title: 'Find Your Perfect Ride',
        subtitle: 'Premium Pre-Owned Vehicles',
        description: 'Explore our curated collection of luxury cars, SUVs, and more',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&auto=format',
        cta: { text: 'Browse Inventory', href: '/listings' },
    },
    {
        id: 2,
        title: 'Luxury Redefined',
        subtitle: 'Premium Selection',
        description: 'Experience excellence with our hand-picked collection',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1920&auto=format',
        cta: { text: 'View Collection', href: '/listings?bodyType=Luxury' },
    },
    {
        id: 3,
        title: 'Adventure Awaits',
        subtitle: 'Off-Road Ready',
        description: 'Conquer any terrain with our 4x4 and SUV selection',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1920&auto=format',
        cta: { text: 'Explore SUVs', href: '/listings?bodyType=SUV' },
    },
];

export const HeroSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <p className="text-[var(--color-accent)] font-semibold mb-4 tracking-wide uppercase text-sm">
                                    {slides[currentSlide].subtitle}
                                </p>
                                <h1 className="heading-1 mb-6 leading-tight">
                                    {slides[currentSlide].title}
                                </h1>
                                <p className="text-xl text-[var(--color-silver)] mb-8">
                                    {slides[currentSlide].description}
                                </p>
                                <div className="flex gap-4">
                                    <Link href={slides[currentSlide].cta.href}>
                                        <Button size="lg">
                                            {slides[currentSlide].cta.text}
                                        </Button>
                                    </Link>
                                    <Link href="/sell">
                                        <Button size="lg" variant="secondary">
                                            Sell Your Car
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 glass rounded-full hover:bg-white/20 transition-all z-10"
                aria-label="Previous slide"
            >
                <IoChevronBack size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 glass rounded-full hover:bg-white/20 transition-all z-10"
                aria-label="Next slide"
            >
                <IoChevronForward size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentSlide(index);
                            setIsAutoPlaying(false);
                        }}
                        className={`h-1 rounded-full transition-all ${index === currentSlide
                                ? 'w-12 bg-[var(--color-accent)]'
                                : 'w-8 bg-white/50 hover:bg-white/70'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

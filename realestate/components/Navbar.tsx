"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass-strong shadow-[0_4px_20px_rgba(0,0,0,0.6)]' : 'py-6 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src="/citybosslogo.png"
                        alt="City Boss Estates Logo"
                        className="h-10 w-auto object-contain"
                    />
                    <span className="hidden sm:inline-block text-xl font-black tracking-tighter text-white">
                        CITY<span className="text-[var(--color-accent)]">BOSS</span>
                        <span className="ml-1 text-[10px] font-light tracking-widest uppercase text-zinc-500">Estates</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/properties" className="text-sm font-medium text-white/70 hover:text-[var(--color-accent)] transition-colors">Properties</Link>
                    <Link href="/properties?category=land" className="text-sm font-medium text-white/70 hover:text-[var(--color-accent)] transition-colors">Land</Link>
                    <Link href="/#services" className="text-sm font-medium text-white/70 hover:text-[var(--color-accent)] transition-colors">Services</Link>
                    <Link href="/about" className="text-sm font-medium text-white/70 hover:text-[var(--color-accent)] transition-colors">About</Link>
                    <Link href="/contact" className="text-sm font-medium text-white/70 hover:text-[var(--color-accent)] transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden sm:block text-sm font-medium text-white/70 hover:text-white transition-colors">
                        Sign In
                    </Link>
                    <Button size="sm">List Property</Button>
                </div>
            </div>
        </nav>
    );
};

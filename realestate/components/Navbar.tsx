"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Menu, X, Landmark, Home, Info, Phone, Plus } from 'lucide-react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { href: '/properties', label: 'Properties', icon: Home },
        { href: '/properties?category=Prime Land', label: 'Land', icon: Landmark },
        { href: '/#services', label: 'Services', icon: Plus },
        { href: '/about', label: 'About', icon: Info },
        { href: '/contact', label: 'Contact', icon: Phone },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled || isOpen ? 'py-4 glass-strong shadow-[0_4px_20px_rgba(0,0,0,0.6)]' : 'py-6 bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 z-[70]" onClick={() => setIsOpen(false)}>
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

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-white/70 hover:text-[var(--color-accent)] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <Button size="sm">List Property</Button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-all z-[70]"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[50] md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}>
                <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

                <div className="relative h-full flex flex-col pt-32 px-8 pb-12 overflow-y-auto">
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 text-2xl font-bold text-white hover:text-[var(--color-accent)] transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <div className="p-3 bg-white/5 rounded-xl text-[var(--color-accent)]">
                                    <link.icon className="w-6 h-6" />
                                </div>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-10 border-t border-white/10 space-y-4">
                        <Button className="w-full py-6 text-lg font-bold">List Property</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

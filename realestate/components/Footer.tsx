import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-black pt-20 pb-5 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/citybosslogo.png"
                                    alt="City Boss Estates Logo"
                                    className="h-8 w-auto object-contain"
                                />
                                <span className="text-xl font-black tracking-tighter text-white">
                                    CITY<span className="text-[var(--color-accent)]">BOSS</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                            Defining the future of luxury living through innovation, integrity, and unparalleled service in the real estate market.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[var(--color-accent)] hover:text-white transition-all">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-zinc-500 hover:text-[var(--color-accent)] text-sm transition-colors">About Us</Link></li>
                            <li><Link href="/#services" className="text-zinc-500 hover:text-[var(--color-accent)] text-sm transition-colors">Services</Link></li>
                            <li><Link href="/contact" className="text-zinc-500 hover:text-[var(--color-accent)] text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Properties */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Properties</h4>
                        <ul className="space-y-4">
                            <li><Link href="/properties" className="text-zinc-500 hover:text-[var(--color-accent)] text-sm transition-colors">Luxury Villas</Link></li>
                            <li><Link href="/properties" className="text-zinc-500 hover:text-[var(--color-accent)] text-sm transition-colors">Modern Penthouses</Link></li>
                            <li><Link href="/properties?category=land" className="text-zinc-500 hover:text-[var(--color-accent)] text-sm transition-colors">Investment Land</Link></li>
                            <li><Link href="/properties" className="text-zinc-500 hover:text-[var(--color-accent)] text-sm transition-colors">Kenyan Estates</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[var(--color-accent)] mt-1" />
                                <span className="text-zinc-500 text-sm">Westlands Commercial Centre<br />Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[var(--color-accent)]" />
                                <span className="text-zinc-500 text-sm">+254 700 000 000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[var(--color-accent)]" />
                                <span className="text-zinc-500 text-sm">contact@cityboss.estate</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-medium">
                        © 2025 City Boss Estates. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/privacy" className="text-zinc-600 hover:text-white text-[10px] uppercase tracking-widest font-medium transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-zinc-600 hover:text-white text-[10px] uppercase tracking-widest font-medium transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

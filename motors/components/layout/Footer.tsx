import React from 'react';
import Link from 'next/link';
import { IoLogoFacebook, IoLogoInstagram, IoCar, IoCall, IoLocation, IoLogoWhatsapp } from 'react-icons/io5';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: '/', label: 'Home' },
        { href: '/listings', label: 'Browse Inventory' },
        { href: '/sell', label: 'Sell Your Car' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ];

    const socialLinks = [
        { icon: IoLogoFacebook, href: '#', label: 'Facebook' },
        { icon: IoLogoInstagram, href: '#', label: 'Instagram' },
    ];

    return (
        <footer className="bg-[var(--color-charcoal)] border-t border-white/5">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <IoCar className="text-[var(--color-accent)] text-3xl group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xl font-bold">
                                City Boss <span className="text-gradient">Motors</span>
                            </span>
                        </Link>
                        <p className="text-[var(--color-silver)] text-sm mb-4">
                            Your trusted partner for premium pre-owned vehicles. Find your dream car with confidence.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/citybossmotors"
                                className="text-[var(--color-silver)] hover:text-[var(--color-accent)] transition-colors"
                                aria-label="Facebook"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IoLogoFacebook size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com/city_boss_motors/"
                                className="text-[var(--color-silver)] hover:text-[var(--color-accent)] transition-colors"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IoLogoInstagram size={24} />
                            </a>
                            <a
                                href="https://wa.me/+254713111106"
                                className="text-[var(--color-silver)] hover:text-[var(--color-accent)] transition-colors"
                                aria-label="WhatsApp"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IoLogoWhatsapp size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--color-silver)] hover:text-[var(--color-accent)] transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-[var(--color-silver)] text-sm">
                                <IoCall className="text-[var(--color-accent)]" size={18} />
                                <a href="tel:+254713111106" className="hover:text-[var(--color-accent)] transition-colors">
                                    +254 713 111106
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-[var(--color-silver)] text-sm">
                                <IoLogoWhatsapp className="text-[var(--color-accent)]" size={18} />
                                <a href="https://wa.me/+254713111106" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">
                                    WhatsApp Us
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-[var(--color-silver)] text-sm">
                                <IoLocation className="text-[var(--color-accent)] mt-1" size={18} />
                                <span>Ridgeway Astro Petro Station,<br />Kiambu Road, Kiambu, Kenya</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
                        <ul className="space-y-2 text-sm text-[var(--color-silver)]">
                            <li className="flex justify-between">
                                <span>Monday - Friday:</span>
                                <span>9AM - 7PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday:</span>
                                <span>9AM - 6PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday:</span>
                                <span>10AM - 5PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-silver)]">
                        <p>© {currentYear} City Boss Motors. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-[var(--color-accent)] transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-[var(--color-accent)] transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

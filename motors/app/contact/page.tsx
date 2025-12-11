'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoTimeOutline, IoSend } from 'react-icons/io5';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000); // Reset after 5s
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to send message');
            }
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred. Please try again.');
        }
    };

    const contactInfo = [
        {
            icon: IoCallOutline,
            title: 'Call Us',
            content: '+254 700 000 000',
            sub: 'Mon-Sat from 8am to 6pm'
        },
        {
            icon: IoMailOutline,
            title: 'Email Us',
            content: 'sales@citybossmotors.com',
            sub: 'We reply within 24 hours'
        },
        {
            icon: IoLocationOutline,
            title: 'Visit Showroom',
            content: 'Ngong Road, Nairobi',
            sub: 'Next to Karen Roundabout'
        },
        {
            icon: IoTimeOutline,
            title: 'Business Hours',
            content: 'Mon - Sat: 9:00 AM - 6:00 PM',
            sub: 'Sunday: By Appointment'
        }
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16 bg-[var(--color-background)] overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="text-center mb-16 pt-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-6 border border-[var(--color-accent)]/20"
                        >
                            Get in Touch
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="heading-1 mb-6"
                        >
                            Let's Start a <span className="text-gradient">Conversation</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-[var(--color-silver)] max-w-2xl mx-auto"
                        >
                            Whether you're looking to buy, sell, or just talk cars, our team of experts is ready to assist you.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* Left Side: Contact Info & Map */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {contactInfo.map((item, i) => (
                                    <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group">
                                        <div className="w-10 h-10 bg-[var(--color-surface)] rounded-xl flex items-center justify-center text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform">
                                            <item.icon size={20} />
                                        </div>
                                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                                        <p className="text-white/90 font-medium mb-1">{item.content}</p>
                                        <p className="text-xs text-[var(--color-silver)]">{item.sub}</p>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Decorative visual instead of Map (since we don't have API key) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="h-64 rounded-3xl overflow-hidden relative glass-strong border border-white/5 flex items-center justify-center group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gunmetal)] to-black opacity-80" />
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="relative z-10 text-center">
                                    <IoLocationOutline size={48} className="text-[var(--color-accent)] mx-auto mb-2" />
                                    <p className="text-white font-semibold text-lg">Visit Our Showroom</p>
                                    <p className="text-[var(--color-silver)]">Ngong Road, Nairobi</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-strong p-8 md:p-10 rounded-3xl relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />

                            <h2 className="heading-3 mb-6">Send a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Input
                                        label="Name"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                    <Input
                                        label="Phone"
                                        type="tel"
                                        placeholder="+254..."
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    />
                                </div>

                                <Input
                                    label="Email"
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />

                                <div>
                                    <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2 block">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-[var(--color-gunmetal)] text-white rounded-lg border border-transparent focus:border-[var(--color-accent)] focus:outline-none transition-all duration-300 placeholder:text-[var(--color-silver)/50] resize-none"
                                        placeholder="How can we help you today?"
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-lg"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? 'Sending...' : (
                                        <span className="flex items-center justify-center gap-2">
                                            Send Message <IoSend size={18} />
                                        </span>
                                    )}
                                </Button>

                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-xl text-center text-sm ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}
                                    >
                                        {message}
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { IoCheckmarkCircle, IoCarSport, IoCash, IoTime, IoShieldCheckmark } from 'react-icons/io5';

const conditions = [
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Good', label: 'Good' },
    { value: 'Fair', label: 'Fair' },
];

const years = Array.from({ length: 30 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
});

export default function SellCarPage() {
    const [formData, setFormData] = useState({
        make: '',
        vehicleModel: '',
        year: years[0].value,
        mileage: '',
        price: '',
        condition: 'Good',
        description: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('/api/sell-car', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    year: parseInt(formData.year),
                    mileage: parseInt(formData.mileage),
                    price: parseInt(formData.price),
                    images: [], // In production, this would include uploaded images
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to submit vehicle');
            }
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <>
                <Navbar />
                <main className="min-h-screen pt-32 pb-16 flex items-center justify-center">
                    <div className="container max-w-2xl px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-strong p-12 rounded-2xl text-center border border-green-500/20"
                        >
                            <div className="inline-flex p-5 bg-green-500/10 rounded-full mb-8">
                                <IoCheckmarkCircle className="text-green-400 text-6xl" />
                            </div>
                            <h1 className="heading-2 mb-4">Submission Received!</h1>
                            <p className="text-[var(--color-silver)] text-lg mb-8 leading-relaxed">
                                {message}
                            </p>
                            <Button size="lg" onClick={() => {
                                setStatus('idle');
                                setMessage('');
                                setFormData({
                                    make: '',
                                    vehicleModel: '',
                                    year: years[0].value,
                                    mileage: '',
                                    price: '',
                                    condition: 'Good',
                                    description: '',
                                    ownerName: '',
                                    ownerEmail: '',
                                    ownerPhone: '',
                                });
                            }}>
                                Submit Another Vehicle
                            </Button>
                        </motion.div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16 bg-[var(--color-background)] overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-10">

                        {/* Left Side: Visual & Value Props */}
                        <div className="lg:sticky lg:top-32">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                                    <span className="text-xs font-medium tracking-wide text-[var(--color-silver)] uppercase">Fast & Secure Process</span>
                                </div>

                                <h1 className="heading-1 mb-6">
                                    Sell Your Car <br />
                                    <span className="text-gradient">Specifically to Us</span>
                                </h1>

                                <p className="text-lg text-[var(--color-silver)] mb-10 leading-relaxed max-w-lg">
                                    Get a fair, market-based offer for your premium vehicle in minutes. We handle the paperwork, you get paid fast.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { icon: IoCash, title: 'Instant Valuation', desc: 'Competitive offers based on real-time market data.' },
                                        { icon: IoTime, title: 'Fast Processing', desc: 'Complete the entire process in under 24 hours.' },
                                        { icon: IoShieldCheckmark, title: 'Secure Payment', desc: 'Direct bank transfer or certified cheque instantly.' }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                        >
                                            <div className="p-3 bg-[var(--color-surface)] rounded-lg text-[var(--color-accent)]">
                                                <item.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                                                <p className="text-sm text-[var(--color-silver)]">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side: Glass Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="glass-strong p-8 md:p-10 rounded-3xl relative"
                        >
                            <div className="absolute -top-1 -right-1 w-20 h-20 bg-[var(--color-accent)]/20 rounded-full blur-2xl pointer-events-none" />

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                {/* Vehicle Section */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-black font-bold text-sm">1</div>
                                        <h2 className="text-xl font-semibold text-white">Vehicle Details</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <Input
                                            label="Make"
                                            required
                                            placeholder="e.g. BMW"
                                            value={formData.make}
                                            onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
                                        />
                                        <Input
                                            label="Model"
                                            required
                                            placeholder="e.g. X5"
                                            value={formData.vehicleModel}
                                            onChange={(e) => setFormData(prev => ({ ...prev, vehicleModel: e.target.value }))}
                                        />
                                        <Select
                                            label="Year"
                                            value={formData.year}
                                            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                                            options={years}
                                        />
                                        <Input
                                            label="Mileage (km)"
                                            type="number"
                                            required
                                            placeholder="e.g. 50000"
                                            value={formData.mileage}
                                            onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                                        />
                                        <Input
                                            label="Expected Price (KSH)"
                                            type="number"
                                            required
                                            placeholder="e.g. 2,500,000"
                                            value={formData.price}
                                            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                        />
                                        <Select
                                            label="Condition"
                                            value={formData.condition}
                                            onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                                            options={conditions}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2 block">
                                            Description & Features
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 bg-[var(--color-gunmetal)] text-white rounded-lg border border-transparent focus:border-[var(--color-accent)] focus:outline-none transition-all duration-300 placeholder:text-[var(--color-silver)/50] resize-none"
                                            placeholder="Tell us about the car's condition, service history, and any modifications..."
                                            value={formData.description}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                {/* Owner Section */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">2</div>
                                        <h2 className="text-xl font-semibold text-white">Contact Info</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <Input
                                            label="Full Name"
                                            required
                                            placeholder="Your Name"
                                            value={formData.ownerName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <Input
                                                label="Phone Number"
                                                type="tel"
                                                required
                                                placeholder="+254 7..."
                                                value={formData.ownerPhone}
                                                onChange={(e) => setFormData(prev => ({ ...prev, ownerPhone: e.target.value }))}
                                            />
                                            <Input
                                                label="Email Address"
                                                type="email"
                                                required
                                                placeholder="you@example.com"
                                                value={formData.ownerEmail}
                                                onChange={(e) => setFormData(prev => ({ ...prev, ownerEmail: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full h-14 text-lg font-semibold shadow-[0_0_20px_rgba(255,85,0,0.3)] hover:shadow-[0_0_30px_rgba(255,85,0,0.5)] transition-shadow"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </span>
                                        ) : 'Submit for Valuation'}
                                    </Button>

                                    {status === 'error' && message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-center text-sm"
                                        >
                                            {message}
                                        </motion.div>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

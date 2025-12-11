'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAdd, IoRemove } from 'react-icons/io5';

const faqs = [
    {
        question: "Do you offer financing options?",
        answer: "Yes, we partner with leading banks and financial institutions in Kenya to offer flexible financing solutions tailored to your budget. Our team can assist you with the entire application process."
    },
    {
        question: "Can I trade in my current vehicle?",
        answer: "Absolutely. We offer competitive trade-in values for your existing car. Simply visit our 'Sell Your Car' page or bring your vehicle to our showroom for a comprehensive evaluation."
    },
    {
        question: "Do your cars come with a warranty?",
        answer: "All our certified pre-owned and new vehicles come with a comprehensive warranty package. Depending on the vehicle age and model, this ranges from 6 months to 2 years, covering major mechanical components."
    },
    {
        question: "Do you import cars on behalf of clients?",
        answer: "Yes, we specialize in sourcing specific luxury and performance vehicles from the UK, Japan, and Australia. We handle all logistics, tax clearance, and registration for a hassle-free experience."
    },
    {
        question: "Where are you located?",
        answer: "Our showroom is located in a prime area of Nairobi. Visit our Contact page for the exact map location and opening hours. We also offer private viewings by appointment."
    }
];

export const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-[var(--color-background)] relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
                    <p className="text-[var(--color-silver)] text-lg">
                        Everything you need to know about buying with City Boss Motors
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${activeIndex === index
                                    ? 'border-[var(--color-accent)] bg-white/5'
                                    : 'border-white/10 hover:border-white/20 glass'
                                }`}
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-medium transition-colors ${activeIndex === index ? 'text-white' : 'text-[var(--color-silver)]'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`p-2 rounded-full border transition-all duration-300 ${activeIndex === index
                                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                                        : 'border-white/10 text-[var(--color-silver)]'
                                    }`}>
                                    {activeIndex === index ? <IoRemove size={20} /> : <IoAdd size={20} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-[var(--color-silver)] leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

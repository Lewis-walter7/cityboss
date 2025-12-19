"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoContractOutline, IoCarSportOutline, IoWarningOutline, IoSaveOutline, IoCheckmarkDoneOutline } from "react-icons/io5";

export default function TermsConditions() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const sections = [
        {
            title: "Agreement to Terms",
            icon: <IoContractOutline className="text-2xl text-[var(--color-accent)]" />,
            content: (
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    By accessing or using the City Boss Motors website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services. These terms apply to all visitors, users, and others who access the Service.
                </p>
            )
        },
        {
            title: "Vehicle Information & Availability",
            icon: <IoCarSportOutline className="text-2xl text-[var(--color-accent)]" />,
            content: (
                <div className="space-y-3 text-[var(--color-text-secondary)]">
                    <p>
                        We strive to ensure that all vehicle descriptions, photographs, pricing, and other information on our website are accurate and up-to-date. However, errors may occur.
                    </p>
                    <ul className="list-disc list-inside ml-2">
                        <li><strong>Pricing:</strong> Prices are subject to change without notice and do not include taxes, title, registration, or dealer documentation fees.</li>
                        <li><strong>Availability:</strong> Vehicle availability is not guaranteed and subject to prior sale. Please contact us to confirm availability.</li>
                        <li><strong>Specifications:</strong> Manufacturers occasionally change specifications. We are not responsible for discrepancies in features or equipment listed.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Test Drives & Dealer Policies",
            icon: <IoCheckmarkDoneOutline className="text-2xl text-[var(--color-accent)]" />,
            content: (
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    To schedule or participate in a test drive, you must possess a valid driver's license and proof of insurance. City Boss Motors reserves the right to refuse a test drive to anyone at our sole discretion. You are responsible for any damage caused to the vehicle while in your possession or control during a test drive.
                </p>
            )
        },
        {
            title: "Limitation of Liability",
            icon: <IoWarningOutline className="text-2xl text-[var(--color-accent)]" />,
            content: (
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    In no event shall City Boss Motors, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
            )
        },
        {
            title: "Governing Law",
            icon: <IoSaveOutline className="text-2xl text-[var(--color-accent)]" />,
            content: (
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    These Terms shall be governed and construed in accordance with the laws of the State, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)] rounded-full blur-[150px] opacity-10"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[150px] opacity-10"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-8 group"
                    >
                        <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <h1 className="heading-1 mb-6">
                        Terms & <span className="text-gradient">Conditions</span>
                    </h1>
                    <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                        Please read these terms carefully before using our services. They outline the rules and regulations for the use of City Boss Motors' Website.
                    </p>
                    <div className="mt-6 flex items-center gap-4 text-sm text-[var(--color-silver)]">
                        <span>Last Updated: December 19, 2025</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--color-silver)]"></span>
                        <span>Version 2.0</span>
                    </div>
                </motion.div>

                <div className="grid gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-[var(--radius-lg)] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                        >
                            <div className="flex items-start gap-5">
                                <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 shadow-[0_0_15px_rgba(255,85,0,0.15)]">
                                    {section.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="heading-3 mb-4 text-white">{section.title}</h3>
                                    {section.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="mt-8 p-8 border-t border-white/10"
                    >
                        <h4 className="heading-4 mb-4">Questions?</h4>
                        <p className="text-[var(--color-text-secondary)] mb-4">
                            If you have any questions about our Terms & Conditions, please refrain from using the site until you have contacted us for clarification.
                        </p>
                        <ul className="space-y-2 text-[var(--color-text-primary)]">
                            <li>Email: <a href="mailto:support@citybossmotors.com" className="hover:text-[var(--color-accent)] transition-colors">support@citybossmotors.com</a></li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

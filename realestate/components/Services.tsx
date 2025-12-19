import React from 'react';
import { ShieldCheck, Zap, Globe, Users, TrendingUp, Headphones } from 'lucide-react';

const services = [
    {
        title: "Secure Transactions",
        description: "Our legal experts ensure every transaction is encrypted and protected by the highest industry standards.",
        icon: ShieldCheck
    },
    {
        title: "Instant Valuations",
        description: "Get real-time market data and professional property valuations in seconds with our AI-driven tools.",
        icon: Zap
    },
    {
        title: "Global Reach",
        description: "Access an exclusive network of international buyers and premium listings across all six continents.",
        icon: Globe
    },
    {
        title: "Expert Consulting",
        description: "Dedicated advisors with decades of experience in the luxury real estate sector at your disposal.",
        icon: Users
    },
    {
        title: "Market Insights",
        description: "Stay ahead with deep analytical reports on emerging trends and investment opportunities.",
        icon: TrendingUp
    },
    {
        title: "24/7 Concierge",
        description: "Personalized support for all your property management and acquisition needs, anytime, anywhere.",
        icon: Headphones
    }
];

export const Services = () => {
    return (
        <section id="services" className="py-24 bg-[var(--color-surface)] relative overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-accent)] opacity-5 blur-[120px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-accent)] opacity-5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="heading-2 mb-4 text-white">Why Choose <span className="text-[var(--color-accent)]">City Boss</span></h2>
                    <p className="text-zinc-500 text-lg">
                        We provide a comprehensive suite of services tailored to the needs of sophisticated property owners and investors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="p-8 rounded-[var(--radius-lg)] bg-white/5 border border-white/5 hover:border-[var(--color-accent)] transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-[var(--color-accent)] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="heading-4 text-white mb-3">{service.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

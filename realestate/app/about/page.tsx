import React from 'react';
import { ShieldCheck, Zap, Globe, Users, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-[var(--color-background)]">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]"></span>
                            </span>
                            <span className="text-xs font-semibold tracking-wider uppercase text-white/80">The City Boss Legacy</span>
                        </div>
                        <h1 className="heading-1 mb-8 text-white">Defined by <span className="text-gradient">Excellence</span></h1>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            Born from a legacy of premium automotive excellence, City Boss Estates has evolved into Kenya&apos;s most prestigious real estate partner. We don&apos;t just sell properties; we curate lifestyle experiences for those who demand the extraordinary.
                        </p>
                        <div className="flex gap-4">
                            <Button>View Listings</Button>
                            <Button variant="outline">Our Story</Button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[var(--radius-lg)] overflow-hidden glass p-2">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
                                alt="Luxury Office"
                                className="w-full h-full object-cover rounded-[calc(var(--radius-lg)-8px)]"
                            />
                        </div>
                        {/* Animated decorative elements */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--color-accent)]/10 blur-3xl animate-pulse-slow"></div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section id="values" className="bg-white/5 py-24 mb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="heading-2 text-white mb-4 text-center mx-auto">Our Core <span className="text-[var(--color-accent)]">Principles</span></h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">Guided by the same standards that defined our automotive roots, we bring precision and passion to every transaction.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="w-8 h-8" />,
                                title: "Integrity",
                                desc: "Unwavering commitment to transparency and ethical dealings in the Kenyan market."
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "Precision",
                                desc: "Every detail matters. From legal documentation to property finishing, we ensure perfection."
                            },
                            {
                                icon: <Award className="w-8 h-8" />,
                                title: "Excellence",
                                desc: "We set the benchmark for luxury real estate services in East Africa."
                            }
                        ].map((value, i) => (
                            <div key={i} className="glass p-8 rounded-[var(--radius-lg)] hover:shadow-2xl hover:shadow-[var(--color-accent-glow)] transition-all duration-500">
                                <div className="text-[var(--color-accent)] mb-6">{value.icon}</div>
                                <h3 className="heading-4 text-white mb-4">{value.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats/Achievements */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="glass rounded-[var(--radius-lg)] p-12 overflow-hidden relative">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {[
                            { label: 'Market Experience', value: '15+ Years' },
                            { label: 'Exclusive Listings', value: '250+' },
                            { label: 'Trusted Partners', value: '50+' },
                            { label: 'Successful Closing', value: '1.5k' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent"></div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="heading-2 text-white mb-8">Ready to Start Your <span className="text-[var(--color-accent)]">Legacy?</span></h2>
                <p className="text-zinc-400 text-lg mb-12">
                    Whether you are seeking your dream home or a landmark investment, our advisors are ready to guide you.
                </p>
                <Button size="lg" className="px-12">Contact Our Team</Button>
            </section>

            <Footer />
        </main>
    );
}

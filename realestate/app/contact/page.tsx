import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="heading-1 mb-4 text-white">Contact <span className="text-[var(--color-accent)]">Us</span></h1>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        Ready to secure your piece of Kenya&apos;s luxury? Get in touch with our elite advisors.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="heading-3 text-white mb-8">Get in Touch</h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                Whether you are looking to buy, sell, or invest in premium Kenyan real estate, City Boss Estates is your trusted partner.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Our Nairobi Office</h4>
                                        <span className="text-zinc-500 text-sm">Westlands Commercial Centre, Ring Rd Westlands<br />Nairobi, Kenya</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Call Us</h4>
                                        <span className="text-zinc-500 text-sm">+254 700 000 000</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Email Us</h4>
                                        <span className="text-zinc-500 text-sm">contact@cityboss.estate</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-white font-bold mb-4">Follow Our Journey</h3>
                            <div className="flex gap-4">
                                {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                                    <Button key={social} variant="outline" size="sm" className="text-xs uppercase tracking-widest px-4">
                                        {social}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass p-8 rounded-[var(--radius-lg)] shadow-2xl">
                        <h3 className="heading-4 text-white mb-8">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">First Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">Last Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">Email Address</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">How can we help?</label>
                                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors" placeholder="Tell us about your property goals..." />
                            </div>

                            <Button className="w-full group">
                                Send Message
                                <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

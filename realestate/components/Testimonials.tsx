import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Property Investor",
        content: "The level of professionalism and attention to detail from City Boss Estates is unmatched. They helped me find a portfolio of properties that exceeded my expectations.",
        avatar: "SJ",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Luxury Homeowner",
        content: "Selling my penthouse was a seamless experience. Their global network and marketing strategy brought in the perfect buyer within weeks.",
        avatar: "MC",
        rating: 5
    },
    {
        name: "Emma Rodriguez",
        role: "First-time Luxury Buyer",
        content: "I was looking for something truly unique, and they delivered. Their concierge service made the entire acquisition process stress-free.",
        avatar: "ER",
        rating: 5
    }
];

export const Testimonials = () => {
    return (
        <section className="py-24 bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="heading-2 mb-4 text-white">Client <span className="text-[var(--color-accent)]">Stories</span></h2>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        Hear from our prestigious clients about their experiences with our premium real estate services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="glass p-8 rounded-[var(--radius-lg)] flex flex-col items-center text-center relative">
                            <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5" />

                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#ff8800] flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-[var(--color-accent-glow)]">
                                {testimonial.avatar}
                            </div>

                            <div className="flex items-center gap-1 mb-4 text-[var(--color-accent)]">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-white/80 italic mb-8 relative z-10">
                                &quot;{testimonial.content}&quot;
                            </p>

                            <div>
                                <h4 className="text-white font-bold">{testimonial.name}</h4>
                                <p className="text-zinc-500 text-xs uppercase tracking-widest">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

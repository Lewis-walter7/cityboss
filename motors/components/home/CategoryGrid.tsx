import React from 'react';
import Link from 'next/link';
import { IoCarSport, IoSpeedometer, IoShield, IoDiamond } from 'react-icons/io5';

const categories = [
    {
        name: 'SUV',
        slug: 'SUV',
        icon: IoCarSport,
        description: 'Spacious and versatile',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format',
    },
    {
        name: 'Sedan',
        slug: 'Sedan',
        icon: IoSpeedometer,
        description: 'Comfort and efficiency',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format',
    },
    {
        name: '4x4',
        slug: '4x4',
        icon: IoShield,
        description: 'Off-road champions',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format',
    },
    {
        name: 'Luxury',
        slug: 'Luxury',
        icon: IoDiamond,
        description: 'Premium performance',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&auto=format',
    },
];

export const CategoryGrid: React.FC = () => {
    return (
        <section className="py-24 bg-[var(--color-background)] relative overflow-hidden">
            {/* Background glow for the section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="heading-2 mb-4">Shop by Category</h2>
                    <p className="text-[var(--color-silver)] text-lg max-w-2xl mx-auto">
                        Whether you need speed, comfort, or off-road capability, we have the perfect collection for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={category.slug}
                            href={`/listings?bodyType=${category.slug}`}
                            className="group relative overflow-hidden rounded-2xl h-[400px] border border-white/5 shadow-2xl"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Hover Border Glow */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-accent)]/50 rounded-2xl transition-colors duration-300" />

                            <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 pb-10">
                                <div className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-300">
                                    <category.icon className="text-white text-3xl" />
                                </div>

                                <h3 className="heading-3 mb-2">{category.name}</h3>
                                <p className="text-[var(--color-silver)] text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    {category.description}
                                </p>

                                <div className="text-[var(--color-accent)] font-medium text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    View Inventory
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

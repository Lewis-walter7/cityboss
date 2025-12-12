'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
// import Featured3DViewer from '@/components/featured/Featured3DViewer'; // Static import removed
import CarRingSelector, { CarModel } from '@/components/featured/CarRingSelector';
import { useState } from 'react';

const Featured3DViewer = dynamic(() => import('@/components/featured/Featured3DViewer'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-white/20">Loading 3D Engine...</div>
});

const cars: CarModel[] = [
    {
        id: 'bmw-m5',
        name: 'M5 Competition',
        brand: 'BMW',
        year: '2018',
        price: 'KES 14,500,000',
        modelPath: '/models/2018_bmw_m5.glb'
    },
    {
        id: 'merc-g63',
        name: 'G 63 AMG',
        brand: 'Mercedes-Benz',
        year: '2022',
        price: 'KES 32,000,000',
        modelPath: '/models/mercedes-benz_g-class_g63_amg.glb'
    },
    {
        id: 'toyota-prado',
        name: 'Prado',
        brand: 'Toyota',
        year: '2010',
        price: 'KES 4,200,000',
        modelPath: '/models/tayota_prado_2010_3d_model.glb'
    }
];

export default function FeaturedListings() {
    const [activeCarId, setActiveCarId] = useState(cars[0].id);
    const activeCar = cars.find(c => c.id === activeCarId) || cars[0];

    return (
        <section className="py-24 bg-[#0f1012] text-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
                    >
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-blue-500">Inventory</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 mt-4 max-w-lg mx-auto"
                    >
                        Explore our hand-picked selection of premium vehicles in immersive 3D.
                    </motion.p>
                </div>

                <div className="h-[600px] flex flex-col relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                    {/* 3D Viewer Area - Takes up remaining space */}
                    <div className="flex-1 relative w-full h-full min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCar.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full absolute inset-0"
                            >
                                <Featured3DViewer modelPath={activeCar.modelPath} />
                            </motion.div>
                        </AnimatePresence>

                        {/* Car Info Overlay */}
                        <div className="absolute top-8 left-8 md:top-12 md:left-12 pointer-events-none z-20">
                            <motion.div
                                key={activeCar.id + "info"}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-3xl md:text-5xl font-black">{activeCar.brand}</h3>
                                <p className="text-xl md:text-2xl font-bold text-white/80">{activeCar.name}</p>
                                <p className="text-xl text-[var(--color-accent)] font-mono mt-2">{activeCar.price}</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom Ring Selector */}
                    <div className="w-full pb-6 pt-4 bg-gradient-to-t from-black/60 to-transparent relative z-20">
                        <CarRingSelector
                            cars={cars}
                            activeCarId={activeCarId}
                            onSelect={setActiveCarId}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
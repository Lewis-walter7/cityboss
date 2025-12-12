'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCar, FaBuilding, FaArrowRight } from 'react-icons/fa';
import clsx from 'clsx';

export default function SelectProject() {
    const router = useRouter();
    const [loading, setLoading] = useState<'motors' | 'realestate' | null>(null);

    const selectProject = async (project: 'motors' | 'realestate') => {
        setLoading(project);
        try {
            await fetch('/api/project/select', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project }),
            });
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Failed to select project', error);
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 premium-bg-mesh relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl w-full">
                <div className="text-center mb-12 md:mb-16 space-y-4">
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Workspace</span>
                    </h1>
                    <p className="text-base sm:text-xl text-gray-400 font-light">Choose a domain to manage the CityBoss empire</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Motors Card */}
                    <button
                        onClick={() => selectProject('motors')}
                        disabled={loading !== null}
                        className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-white/10 group-hover:border-blue-500/50 transition-colors"></div>
                        <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>

                        <div className="relative h-full p-6 sm:p-10 flex flex-col justify-between items-start text-left">
                            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                <FaCar size={32} className="sm:w-10 sm:h-10" />
                            </div>

                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Motors</h3>
                                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">Manage inventory, dealers, and vehicle analytics.</p>
                            </div>

                            <div className="w-full flex items-center justify-between pt-6 sm:pt-8 border-t border-white/5 group-hover:border-blue-500/30 transition-colors">
                                <span className="text-xs sm:text-sm font-medium text-gray-500 group-hover:text-blue-400">Enter Workspace</span>
                                <FaArrowRight className="text-gray-600 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </button>

                    {/* Real Estate Card */}
                    <button
                        onClick={() => selectProject('realestate')}
                        disabled={!!loading}
                        className="group relative p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 bg-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <FaBuilding size={28} className="sm:w-9 sm:h-9" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Real Estate</h2>
                            <p className="text-sm sm:text-base text-gray-400">Manage properties, agents, and housing developments.</p>
                            {loading === 'realestate' && <div className="mt-4 text-emerald-400 text-sm animate-pulse">Entering...</div>}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

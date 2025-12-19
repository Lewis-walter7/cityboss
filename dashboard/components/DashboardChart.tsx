
'use client';

import React from 'react';

interface ChartData {
    label: string;
    value: number;
}

interface DashboardChartProps {
    data: ChartData[];
    title: string;
    color?: 'blue' | 'emerald';
}

export default function DashboardChart({ data, title, color = 'blue' }: DashboardChartProps) {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    const accentColor = color === 'emerald' ? 'emerald' : 'blue';

    return (
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6 shadow-xl">
            <h3 className="text-gray-400 text-sm font-medium mb-8 uppercase tracking-wider">{title}</h3>

            <div className="relative h-48 flex items-end gap-2 md:gap-4 px-2">
                {/* Y-axis grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-full border-t border-white/10"></div>
                    ))}
                </div>

                {/* Bars */}
                {data.map((item, index) => {
                    const heightPercentage = (item.value / maxValue) * 100;
                    return (
                        <div key={index} className="flex-1 flex flex-col items-center group cursor-default">
                            {/* Tooltip */}
                            <div className="opacity-0 group-hover:opacity-100 mb-2 transition-opacity duration-300 absolute -translate-y-12">
                                <div className="bg-gray-800 border border-white/20 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                                    {item.value} Listings
                                </div>
                            </div>

                            {/* Bar */}
                            <div
                                className={`w-full max-w-[40px] rounded-t-lg transition-all duration-700 bg-gradient-to-t 
                                    ${accentColor === 'emerald'
                                        ? 'from-emerald-600/20 to-emerald-400 group-hover:to-emerald-300'
                                        : 'from-blue-600/20 to-blue-400 group-hover:to-blue-300'}
                                `}
                                style={{
                                    height: `${Math.max(heightPercentage, 4)}%`,
                                    boxShadow: `0 0 20px ${accentColor === 'emerald' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(96, 165, 250, 0.1)'}`
                                }}
                            ></div>

                            {/* Label */}
                            <span className="text-[10px] text-gray-500 mt-4 font-medium uppercase tracking-tighter">
                                {item.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

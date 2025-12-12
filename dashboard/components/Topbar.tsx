
'use client';

import { FaRegBell, FaSearch } from 'react-icons/fa';

export default function Topbar({ user, project }: { user: any, project?: string }) {
    const isRealEstate = project === 'realestate';

    return (
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300">
            {/* Glass background applied via absolute to allow content to sit on top nicely */}
            <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-md border-b border-white/5 z-0"></div>

            <div className="relative z-10 flex items-center">
                <h2 className="text-xl font-bold text-white capitalize tracking-tight">
                    <span className={isRealEstate ? "text-emerald-400" : "text-blue-400"}>{project}</span>
                    <span className="text-gray-500 ml-2 font-medium">Dashboard</span>
                </h2>
            </div>

            <div className="relative z-10 flex items-center gap-6">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all w-64"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
                    <FaRegBell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-gray-900"></span>
                </button>
            </div>
        </header>
    );
}

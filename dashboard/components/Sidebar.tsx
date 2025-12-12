'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUsers, FaCar, FaSignOutAlt, FaCog, FaBuilding, FaExchangeAlt, FaChevronUp, FaUserShield } from 'react-icons/fa';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Sidebar({ user, project }: { user: any, project?: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const motorsItems = [
        { name: 'Dashboard', icon: FaHome, href: '/motors' },
        { name: 'Vehicles', icon: FaCar, href: '/motors/vehicles' },
    ];

    const realEstateItems = [
        { name: 'Dashboard', icon: FaHome, href: '/realestate' },
        { name: 'Properties', icon: FaBuilding, href: '/realestate/properties' },
    ];

    const menuItems = project === 'realestate' ? realEstateItems : motorsItems;
    const title = project === 'realestate' ? 'CityBoss Realty' : 'CityBoss Motors';
    const gradient = project === 'realestate'
        ? 'from-emerald-400 to-teal-500'
        : 'from-blue-400 to-indigo-500';

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.refresh();
        router.push('/login');
    };

    return (
        <aside className="w-72 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen sticky top-0 shadow-2xl z-50">
            <div className="p-8 pb-4">
                <Link href={`/${project}`} className="block group">
                    <h1 className={`text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${gradient} mb-1`}>
                        {title}
                    </h1>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-0.5 group-hover:text-white transition-colors duration-300">
                        Admin Workspace
                    </p>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    // Colors based on project
                    const activeBg = project === 'realestate' ? 'bg-emerald-500/10' : 'bg-blue-500/10';
                    const activeText = project === 'realestate' ? 'text-emerald-400' : 'text-blue-400';

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? `${activeBg} ${activeText}`
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-lg ${project === 'realestate' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                            )}
                            <item.icon className={clsx("mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110", isActive ? "" : "opacity-70 group-hover:opacity-100")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-white/5" ref={menuRef}>
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-full flex items-center p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group"
                    >
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${project === 'realestate' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}>
                            {user.name.charAt(0)}
                        </div>
                        <div className="ml-3 text-left flex-1 min-w-0">
                            <p className="text-sm font-medium text-white group-hover:text-gray-200 transition-colors truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <FaChevronUp className={`ml-2 w-3 h-3 text-gray-500 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Menu Dropdown */}
                    <div className={clsx(
                        "absolute bottom-full left-0 w-full mb-3 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom",
                        isMenuOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                    )}>
                        <div className="p-2 space-y-1">
                            <Link
                                href="/admins"
                                className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaUserShield className="mr-3 h-4 w-4 text-gray-500" />
                                Manage Admins
                            </Link>

                            <Link
                                href="/select-project"
                                className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaExchangeAlt className="mr-3 h-4 w-4 text-gray-500" />
                                Switch Portfolio
                            </Link>

                            <div className="h-px bg-white/10 my-1 mx-2"></div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
                            >
                                <FaSignOutAlt className="mr-3 h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

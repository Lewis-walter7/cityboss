'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    FaTimes,
    FaCar,
    FaHome,
    FaUsers,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaExchangeAlt,
    FaUserShield,
    FaChevronDown
} from 'react-icons/fa';

interface SidebarProps {
    user: any;
    project?: 'motors' | 'realestate';
    isMobileMenuOpen?: boolean;
    setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function Sidebar({ user, project = 'motors', isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const router = useRouter();
    const isRealEstate = project === 'realestate';

    const primaryColor = isRealEstate ? 'emerald' : 'blue';

    const navItems = [
        { name: 'Dashboard', href: `/${project}`, icon: FaChartBar },
        { name: isRealEstate ? 'Properties' : 'Vehicles', href: `/${project}/${isRealEstate ? 'properties' : 'vehicles'}`, icon: isRealEstate ? FaHome : FaCar },
    ];

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };

        if (userMenuOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [userMenuOpen]);

    const handleSignOut = async () => {
        try {
            // Call the logout API to properly delete the httpOnly cookie
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include', // Important: include cookies in request
            });

            // Redirect to login page
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Still redirect even if API call fails
            router.push('/login');
        }
    };

    const handleSwitchPortfolio = () => {
        const newProject = project === 'motors' ? 'realestate' : 'motors';
        document.cookie = `project_mode=${newProject}; path=/`;
        router.push(`/${newProject}`);
        setUserMenuOpen(false);
        setIsMobileMenuOpen?.(false);
    };

    const handleManageAdmins = () => {
        router.push('/admins');
        setUserMenuOpen(false);
        setIsMobileMenuOpen?.(false);
    };

    const closeMobileMenu = () => setIsMobileMenuOpen?.(false);

    const [isDesktop, setIsDesktop] = useState(false);

    // Check if we're on desktop
    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);

        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Debug: Log when isMobileMenuOpen changes
    useEffect(() => {
        console.log('🎨 Sidebar isMobileMenuOpen:', isMobileMenuOpen);
        console.log('🎨 isDesktop:', isDesktop);
    }, [isMobileMenuOpen, isDesktop]);

    return (
        <>
            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('Overlay clicked, closing sidebar');
                        setIsMobileMenuOpen?.(false);
                    }}
                />
            )}

            {/* Sidebar */}
            <aside
                className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-900/95 backdrop-blur-md border-r border-white/10 flex flex-col z-50 transition-transform duration-300 ease-in-out"
                style={{
                    transform: isDesktop || isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button - Mobile Only */}
                <div className="lg:hidden absolute top-4 right-4 z-50">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Close button clicked, setting isMobileMenuOpen to false');
                            setIsMobileMenuOpen?.(false);
                        }}
                        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold">
                        <span className={`text-${primaryColor}-400`}>City</span>
                        <span className="text-white">Boss</span>
                    </h1>
                    <p className="text-sm text-gray-400 mt-1 capitalize">{project} Admin</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                                    ${isActive
                                        ? `bg-${primaryColor}-600 text-white shadow-lg shadow-${primaryColor}-500/20`
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Menu */}
                <div className="border-t border-white/10 p-4">
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <div className={`w-10 h-10 rounded-full bg-${primaryColor}-600 flex items-center justify-center text-white font-bold`}>
                                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                            </div>
                            <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {userMenuOpen && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 border border-white/10 rounded-lg shadow-xl overflow-hidden">
                                <button
                                    onClick={handleSwitchPortfolio}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    <FaExchangeAlt className="w-4 h-4" />
                                    <span>Switch Portfolio</span>
                                </button>

                                <button
                                    onClick={handleManageAdmins}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors border-t border-white/5"
                                >
                                    <FaUserShield className="w-4 h-4" />
                                    <span>Manage Admins</span>
                                </button>

                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-white/5"
                                >
                                    <FaSignOutAlt className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

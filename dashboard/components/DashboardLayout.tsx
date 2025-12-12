'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

interface DashboardLayoutProps {
    user: any;
    project: 'motors' | 'realestate';
    children: React.ReactNode;
}

export default function DashboardLayout({ user, project, children }: DashboardLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        console.log('🔄 DashboardLayout - Mobile menu state changed:', isMobileMenuOpen);
    }, [isMobileMenuOpen]);

    const handleSetMobileMenuOpen = (open: boolean) => {
        console.log('📱 Setting mobile menu open:', open);
        setIsMobileMenuOpen(open);
    };

    return (
        <div className="flex h-screen premium-bg-mesh text-white">
            <Sidebar
                user={user}
                project={project}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={handleSetMobileMenuOpen}
            />
            <div className="flex-1 flex flex-col min-w-0 relative">
                <Topbar
                    user={user}
                    project={project}
                    setIsMobileMenuOpen={handleSetMobileMenuOpen}
                />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
                    {children}
                </main>
            </div>
        </div>
    );
}

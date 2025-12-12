
import { getAdminSession } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { cookies } from 'next/headers';

// admins page needs layout wrapper because it's not under /motors or /realestate
// We should check project context cookie to decide which theme to show, or default to one.

export default async function AdminsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAdminSession();
    const cookieStore = await cookies();
    const project = cookieStore.get('project_mode')?.value || 'motors'; // Default to motors if unknown

    return (
        <div className="flex h-screen premium-bg-mesh text-white">
            <Sidebar user={session} project={project} />
            <div className="flex-1 flex flex-col min-w-0 relative">
                <Topbar user={session} project={project} />
                <main className="flex-1 p-8 overflow-y-auto relative z-10">
                    {children}
                </main>
            </div>
        </div>
    );
}

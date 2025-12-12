
import { getAdminSession } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default async function MotorsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAdminSession();

    // We can pass 'motors' as a context prop or handle it inside Sidebar
    return (
        <div className="flex h-screen premium-bg-mesh text-white">
            <Sidebar user={session} project="motors" />
            <div className="flex-1 flex flex-col min-w-0 relative">
                <Topbar user={session} project="motors" />
                <main className="flex-1 p-8 overflow-y-auto relative z-10">
                    {children}
                </main>
            </div>
        </div>
    );
}

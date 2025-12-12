
import { getAdminSession } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default async function RealEstateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAdminSession();

    return (
        <div className="flex h-screen premium-bg-mesh text-white">
            <Sidebar user={session} project="realestate" />
            <div className="flex-1 flex flex-col min-w-0 relative">
                <Topbar user={session} project="realestate" />
                <main className="flex-1 p-8 overflow-y-auto relative z-10">
                    {children}
                </main>
            </div>
        </div>
    );
}


import { getAdminSession } from "@/lib/auth";
import DashboardLayout from "@/components/DashboardLayout";

export default async function MotorsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAdminSession();

    return (
        <DashboardLayout user={session} project="motors">
            {children}
        </DashboardLayout>
    );
}

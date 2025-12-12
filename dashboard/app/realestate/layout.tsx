
import { getAdminSession } from "@/lib/auth";
import DashboardLayout from "@/components/DashboardLayout";

export default async function RealEstateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAdminSession();

    return (
        <DashboardLayout user={session} project="realestate">
            {children}
        </DashboardLayout>
    );
}

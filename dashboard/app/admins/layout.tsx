
import { getAdminSession } from "@/lib/auth";
import DashboardLayout from "@/components/DashboardLayout";
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
    const project = (cookieStore.get('project_mode')?.value || 'motors') as 'motors' | 'realestate';

    return (
        <DashboardLayout user={session} project={project}>
            {children}
        </DashboardLayout>
    );
}

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import AuthenticatedGuard from "@/components/Provider/AuthenticatedGuard";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenticatedGuard>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <DashboardHeader></DashboardHeader>
                    {children}
                </main>
            </SidebarProvider>
        </AuthenticatedGuard>
    );
}

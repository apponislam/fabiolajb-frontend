import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <DashboardHeader></DashboardHeader>
                {children}
            </main>
        </SidebarProvider>
    );
}

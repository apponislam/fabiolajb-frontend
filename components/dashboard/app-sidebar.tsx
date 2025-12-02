"use client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItems } from "@/lib/constants/navigation";
import { LogOut } from "lucide-react";

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="border-r border-[#EFEFEF] bg-white!">
            {/* Logo */}
            <div className="p-6 pb-12 shrink-0 bg-white">
                <Link href="/">
                    <Image src="/logoblack.svg" alt="Logo Black" width={86} height={50} />
                </Link>
            </div>

            <SidebarContent className="bg-white flex flex-col justify-between h-full">
                {/* Main Menu */}
                <div>
                    <SidebarGroup className="p-6 pt-0">
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-6">
                                {MenuItems.map((item) => {
                                    const isActive = pathname === item.url;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url} className={`flex items-center gap-3 px-4 py-3 h-auto rounded-lg transition-colors duration-200 ${isActive ? "bg-[#3CB371] text-white hover:bg-[#3CB371]! hover:text-white!" : "text-[#2A2A2E] bg-transparent hover:bg-[#3CB371]! hover:text-white!"}`}>
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="font-medium">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>

                {/* Logout Button (keeps your EXACT style) */}
                <div className="p-6 pt-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <button
                                    onClick={() => console.log("Logging out...")}
                                    className="flex items-center gap-3 px-4 py-3 h-auto rounded-lg transition-colors duration-200 
                                        text-[#2A2A2E] bg-transparent hover:bg-[#3CB371]! hover:text-white! w-full cursor-pointer"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}

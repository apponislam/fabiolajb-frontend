"use client";
import { usePathname } from "next/navigation";
import { MenuItems } from "@/lib/constants/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { TfiReload } from "react-icons/tfi";
import Link from "next/link";

export function DashboardHeader() {
    const pathname = usePathname();
    const currentItem = MenuItems.find((item) => pathname === item.url) || MenuItems[0];
    return (
        <header className="bg-white border-b border-[#EFEFEF] px-3 md:px-6 py-2 md:py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                    <SidebarTrigger className="md:hidden flex items-center justify-center" />
                    <div className="flex items-center">
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{currentItem.title}</h1>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <Link href="/auth/change-password">
                        <button className="text-[#3CB371] hover:text-[#3CB371] transition-colors duration-200  items-center gap-2 cursor-pointer flex">
                            <TfiReload></TfiReload> <span className="hidden md:inline-block">Change Password</span>
                        </button>
                    </Link>

                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">MR</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#404040]">Moni Roy</span>
                            <span className="text-xs text-gray-500 text-left">Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

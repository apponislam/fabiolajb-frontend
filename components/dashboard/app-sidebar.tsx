// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

// import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
// import Image from "next/image";
// import Link from "next/link";

// // Menu items.
// const items = [
//     {
//         title: "Home",
//         url: "#",
//         icon: Home,
//     },
//     {
//         title: "Inbox",
//         url: "#",
//         icon: Inbox,
//     },
//     {
//         title: "Calendar",
//         url: "#",
//         icon: Calendar,
//     },
//     {
//         title: "Search",
//         url: "#",
//         icon: Search,
//     },
//     {
//         title: "Settings",
//         url: "#",
//         icon: Settings,
//     },
// ];

// export function AppSidebar() {
//     return (
//         <Sidebar className="border-r border-[#EFEFEF] bg-white!">
//             <div className="p-6 pb-12 shrink-0 bg-white">
//                 <Link href="/">
//                     <Image src="/logoblack.svg" alt="Logo Black" width={86} height={50}></Image>
//                 </Link>
//             </div>
//             <SidebarContent className="bg-white">
//                 <SidebarGroup>
//                     <SidebarGroupContent>
//                         <SidebarMenu>
//                             {items.map((item) => (
//                                 <SidebarMenuItem key={item.title}>
//                                     <SidebarMenuButton asChild>
//                                         <Link href={item.url}>
//                                             <item.icon />
//                                             <span>{item.title}</span>
//                                         </Link>
//                                     </SidebarMenuButton>
//                                 </SidebarMenuItem>
//                             ))}
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>
//         </Sidebar>
//     );
// }

"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
    {
        title: "Overview",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Quote",
        url: "/quote",
        icon: Inbox,
    },
    {
        title: "Service",
        url: "/service",
        icon: Calendar,
    },
    {
        title: "Payment",
        url: "/payment",
        icon: Search,
    },
    {
        title: "Contact",
        url: "/contact",
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="border-r border-[#EFEFEF] bg-white!">
            <div className="p-6 pb-12 shrink-0 bg-white">
                <Link href="/">
                    <Image src="/logoblack.svg" alt="Logo Black" width={86} height={50}></Image>
                </Link>
            </div>
            <SidebarContent className="bg-white">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} className={`flex items-center gap-3 px-4 py-3 h-auto rounded-lg transition-colors duration-200 hover:bg-[#3CB371] ${isActive ? "bg-[#3CB371] text-white" : "text-[#2A2A2E] bg-transparent hover:bg-[#3CB371] hover:text-white"}`}>
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
            </SidebarContent>
        </Sidebar>
    );
}

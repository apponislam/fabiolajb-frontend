"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [activeNav, setActiveNav] = useState("Home");

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Quote", path: "/quote" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-[#282828] text-white py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left Side - Logo */}
                <div className="shrink-0">
                    <Image src="/logowhite.svg" alt="Logo" width={120} height={32} className="h-8 w-auto" />
                </div>

                {/* Middle - Navigation */}
                <div className="hidden md:flex items-center space-x-1 bg-[#FFFFFF1A] backdrop-blur-sm rounded-[30px] p-1">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.path} className={`px-6 py-3 rounded-[30px] transition-all duration-200 ${activeNav === item.name ? "bg-[#3CB371] text-white font-semibold" : "text-white hover:bg-white/10"}`} onClick={() => setActiveNav(item.name)}>
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right Side - Button */}
                <div className="shrink-0">
                    <button className="bg-[#3CB371] text-white px-6 py-3 rounded-[30px] font-semibold hover:bg-[#35a065] transition-colors whitespace-nowrap">Get Free Quote</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

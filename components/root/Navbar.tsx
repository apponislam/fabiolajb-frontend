"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [activeNav, setActiveNav] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

                {/* Middle - Navigation - Desktop */}
                <div className="hidden md:flex items-center space-x-2 bg-[#FFFFFF1A] backdrop-blur-sm rounded-[40px] p-3">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.path} className={`px-4 py-2 rounded-[30px] transition-all duration-200 ${activeNav === item.name ? "bg-[#3CB371] text-white font-semibold" : "text-white hover:bg-white/10"}`} onClick={() => setActiveNav(item.name)}>
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden flex flex-col space-y-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                </button>

                {/* Right Side - Button - Desktop */}
                <div className="hidden md:block shrink-0">
                    <button className="bg-[#3CB371] text-white px-6 py-3 rounded-[30px] font-semibold hover:bg-[#35a065] transition-colors whitespace-nowrap">Get Free Quote</button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-[#282828] md:hidden border-t border-white/20">
                        <div className="flex flex-col p-4 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`px-4 py-3 rounded-[30px] transition-all duration-200 ${activeNav === item.name ? "bg-[#3CB371] text-white font-semibold" : "text-white hover:bg-white/10"}`}
                                    onClick={() => {
                                        setActiveNav(item.name);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button className="bg-[#3CB371] text-white px-4 py-3 rounded-[30px] font-semibold hover:bg-[#35a065] transition-colors mt-4">Get Free Quote</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = useMemo(
        () => [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Quote", path: "/quote" },
            { name: "Contact", path: "/contact" },
        ],
        []
    );

    // Use useCallback to memoize the function and avoid dependency issues
    const getActiveNavFromPath = useCallback(
        (path: string) => {
            const navItem = navItems.find((item) => item.path === path);
            return navItem ? navItem.name : "Home"; // Fallback to Home if no match
        },
        [navItems]
    ); // Add navItems as dependency

    const [activeNav, setActiveNav] = useState(getActiveNavFromPath(pathname));

    // Update activeNav when route changes
    useEffect(() => {
        setActiveNav(getActiveNavFromPath(pathname));
    }, [pathname, getActiveNavFromPath]);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            if (y > 180 && !scrolled) {
                setScrolled(true);
            } else if (y < 60 && scrolled) {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    const logoSrc = scrolled ? "/logowhite.svg" : isHomePage ? "/logowhite.svg" : "/logoblack.svg";

    return (
        <nav className={`text-white py-4 px-6 ${scrolled ? "bg-[#282828]" : "bg-transparent"}`}>
            <div className="container mx-auto flex items-center justify-between">
                {/* Left Side - Logo */}
                <div className="shrink-0">
                    {/* <Image src={isHomePage ? "/logowhite.svg" : "/logoblack.svg"} alt="Logo" width={120} height={32} className="h-8 w-auto" /> */}
                    <Image src={logoSrc} alt="Logo" width={120} height={32} className="h-8 w-auto" />
                </div>

                {/* Middle - Navigation - Desktop */}
                <div className="hidden md:flex items-center space-x-2 bg-[#FFFFFF1A] backdrop-blur-sm rounded-[40px] p-3">
                    {/* {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`px-4 py-2 rounded-[30px] transition-all duration-200 
    ${activeNav === item.name ? "bg-[#3CB371] text-white font-semibold" : isHomePage ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}
                            onClick={() => setActiveNav(item.name)}
                        >
                            {item.name}
                        </Link>
                    ))} */}
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`px-4 py-2 rounded-[30px] transition-all duration-200 
            ${activeNav === item.name ? "bg-[#3CB371] text-white font-semibold" : isHomePage ? "text-white hover:bg-white/10" : scrolled ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}
        `}
                            onClick={() => setActiveNav(item.name)}
                        >
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
                                    className={`px-4 py-3 text-center rounded-[30px] transition-all duration-200 ${activeNav === item.name ? "bg-[#3CB371] text-white font-semibold" : "text-white hover:bg-white/10"}`}
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

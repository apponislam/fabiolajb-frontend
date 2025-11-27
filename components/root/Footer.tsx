import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="bg-[#282828] text-white py-8 md:py-12 px-4">
            <div className="container mx-auto text-center">
                {/* Main heading */}
                <h2 className="font-open-sans font-normal text-[14px] md:text-[16px] leading-[100%] tracking-[2.8px] uppercase text-white opacity-50 mb-3 md:mb-[15px]">UPSKILL FOR A BETTER FUTURE</h2>

                {/* Request More Information button */}
                <h1 className="font-montserrat font-bold text-[28px] md:text-[36px] lg:text-[48px] leading-[120%] tracking-[0px] mb-4 md:mb-5">Request More Information</h1>

                {/* Company description */}
                <p className="text-white/50 mb-12 md:mb-20 text-[16px] md:text-[18px] max-w-2xl mx-auto px-4">Lift Media, LLC is a clinical stage healthcare company which is developing a unique.</p>

                {/* Get Free Quote and Contact Us buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-12 mb-8 md:mb-12">
                    <button className="bg-transparent w-full sm:w-[200px] lg:w-[241px] text-[#3CB371] px-6 md:px-8 py-3 rounded-[30px] font-semibold hover:bg-[#35a065] hover:text-white transition-colors border border-[#3CB371]">Get Free Quote</button>
                    <button className="border bg-[#3CB371] w-full sm:w-[200px] lg:w-[241px] border-[#3CB371] text-white px-6 md:px-8 py-3 rounded-[30px] font-semibold hover:bg-transparent hover:text-[#3CB371] transition-colors">Contact Us</button>
                </div>

                {/* Navigation links */}
                <nav className="mb-8 md:mb-12">
                    <ul className="flex flex-col sm:flex-row justify-center gap-6 md:gap-12 lg:gap-20 text-white">
                        <li>
                            <Link href="/about" className="hover:text-white/80 transition-colors text-[16px] md:text-[18px]">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/service" className="hover:text-white/80 transition-colors text-[16px] md:text-[18px]">
                                Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/quote" className="hover:text-white/80 transition-colors text-[16px] md:text-[18px]">
                                Quote
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Bottom section with logo, copyright, and social icons */}
                <div className="pt-6 md:pt-8 border-t border-white/50 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
                    {/* Logo */}
                    <div className="order-2 lg:order-1">
                        <Image src="/logowhite.svg" alt="Logo White" height={40} width={69} className="w-auto h-8 md:h-10" />
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-300 text-[14px] md:text-[16px] order-1 lg:order-2">&copy; 2025 Just Breathe Cleaning Services</p>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-3 md:gap-4 order-3">
                        <div className="cursor-pointer w-10 h-10 md:w-[45px] md:h-[45px] border-2 border-white/50 bg-transparent rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                            <FaLinkedinIn size={16} className="text-white" />
                        </div>
                        <div className="cursor-pointer w-10 h-10 md:w-[45px] md:h-[45px] border-2 border-white/50 bg-transparent rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                            <FaFacebookF size={16} className="text-white" />
                        </div>
                        <div className="cursor-pointer w-10 h-10 md:w-[45px] md:h-[45px] border-2 border-white/50 bg-transparent rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                            <FiInstagram size={16} className="text-white" />
                        </div>
                        <div className="cursor-pointer w-10 h-10 md:w-[45px] md:h-[45px] border-2 border-white/50 bg-transparent rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                            <FaYoutube size={16} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

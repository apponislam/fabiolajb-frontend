import Footer from "@/components/root/Footer";
import HeroSection from "@/components/root/home/HeroSection";
import HomeAboutUs from "@/components/root/home/HomeAbout";
import HomeQuoteSection from "@/components/root/home/HomeQuote";
import HomeServices from "@/components/root/home/HomeServices";
import Navbar from "@/components/root/Navbar";

export default function Home() {
    return (
        <>
            <Navbar></Navbar>
            <HeroSection></HeroSection>
            <HomeAboutUs></HomeAboutUs>
            <HomeServices></HomeServices>
            <HomeQuoteSection></HomeQuoteSection>
            <Footer></Footer>
        </>
    );
}

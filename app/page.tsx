import Footer from "@/components/root/Footer";
import HeroSection from "@/components/root/home/HeroSection";
import HomeAboutUs from "@/components/root/home/HomeAbout";
import Navbar from "@/components/root/Navbar";

export default function Home() {
    return (
        <>
            <Navbar></Navbar>
            <HeroSection></HeroSection>
            <HomeAboutUs></HomeAboutUs>
            <Footer></Footer>
        </>
    );
}

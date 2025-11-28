import Footer from "@/components/root/Footer";
import Navbar from "@/components/root/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar></Navbar>
            {children}
            <Footer />
        </>
    );
}

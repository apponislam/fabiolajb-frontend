import Footer from "@/components/root/Footer";
import Navbar from "@/components/root/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <div className="mt-28">
                {children}
                <Footer />
            </div>
        </>
    );
}

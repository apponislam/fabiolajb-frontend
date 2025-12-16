import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/Provider/ReduxProvider";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Professional Cleaning Solutions",
    description: "Get a free quote for professional cleaning services. Residential, commercial, office, kitchen, and washroom cleaning services with instant tailored quotes.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} antialiased`}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}

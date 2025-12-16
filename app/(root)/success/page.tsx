// app/success/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3CB371]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

                <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>

                <p className="text-gray-600 mb-6">Thank you for your payment. We will contact you soon.</p>

                <div className="space-y-3">
                    <Link href="/" className="block w-full bg-[#3CB371] hover:bg-[#35a065] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                        Return to Home
                    </Link>

                    <p className="text-sm text-gray-500">Session ID: {sessionId?.substring(0, 20)}...</p>
                </div>
            </div>
        </div>
    );
}

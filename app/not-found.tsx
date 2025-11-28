import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-[#282828] flex items-center justify-center px-4">
            <div className="text-center text-white max-w-lg">
                {/* Error Code with subtle accent */}
                <div className="relative inline-block mb-8">
                    <h1 className="text-8xl md:text-9xl font-bold text-[#3CB371] mb-4 relative z-10">404</h1>
                    <div className="absolute inset-0 bg-[#3CB371] blur-2xl opacity-20 rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Page Not Found</h2>

                    <p className="text-gray-300 text-lg leading-relaxed">We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you may have entered the wrong URL.</p>

                    {/* Action Button */}
                    <div className="pt-4">
                        <Link href="/" className="inline-flex items-center justify-center bg-[#3CB371] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#35a065] transition-all duration-300 hover:shadow-2xl hover:scale-105 min-w-48">
                            Return to Homepage
                        </Link>
                    </div>

                    {/* Support Text */}
                    <p className="text-gray-400 text-sm pt-4">
                        Need help?{" "}
                        <Link href="/contact" className="text-[#3CB371] hover:underline font-medium">
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

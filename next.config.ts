import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["justbreathe.apponislam.top", "*.apponislam.top"],
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "10.10.7.26",
                port: "5003",
                pathname: "/**",
            },
        ],
        unoptimized: true, // Add this line
    },
};

export default nextConfig;

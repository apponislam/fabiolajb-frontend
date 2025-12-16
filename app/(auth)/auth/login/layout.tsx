"use client";

import NonAuthenticatedGuard from "@/components/Provider/NonAuthenticatedGuard";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <NonAuthenticatedGuard>{children}</NonAuthenticatedGuard>;
}

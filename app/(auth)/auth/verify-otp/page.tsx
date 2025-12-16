// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const verifyCodeSchema = z.object({
//     code: z.string().min(1, "Verification code is required"),
// });

// type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

// const VerifyCodePage = () => {
//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<VerifyCodeFormData>({
//         resolver: zodResolver(verifyCodeSchema),
//     });

//     const onSubmit = (data: VerifyCodeFormData) => {
//         console.log(data);
//         router.push("/auth/reset-password");
//     };

//     return (
//         <div className="h-screen flex p-4 md:p-[104px]">
//             {/* Left Side - Image */}
//             <div className="hidden lg:block lg:w-1/2">
//                 <div className="h-full">
//                     <Image src="/auth/verify-code.svg" alt="Verify Code" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
//                 </div>
//             </div>

//             {/* Right Side - Verify Code Form */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center">
//                 <div className="w-full max-w-md">
//                     {/* Back to Login */}
//                     <div className="mb-6">
//                         <Link href="/auth/login" className="text-[#3CB371] hover:underline flex items-center gap-2">
//                             ← Back to login
//                         </Link>
//                     </div>

//                     {/* Header */}
//                     <div className="text-center mb-8">
//                         <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Verify code</h1>
//                         <p className="text-[#434343] text-left">An authentication code has been sent to your email.</p>
//                     </div>

//                     {/* Verify Code Form */}
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                         {/* Code Input */}
//                         <div className="relative">
//                             <div className="relative">
//                                 <input {...register("code")} type="text" id="code" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent peer" placeholder=" " />
//                                 <label htmlFor="code" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
//                                     Enter Code
//                                 </label>
//                             </div>
//                             {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
//                         </div>

//                         {/* Resend Code */}
//                         <div className="text-left">
//                             <p className="text-[#434343]">
//                                 Didn&apos;t receive a code?{" "}
//                                 <button type="button" className="text-[#3CB371] hover:underline font-semibold">
//                                     Resend
//                                 </button>
//                             </p>
//                         </div>

//                         {/* Verify Button */}
//                         <button type="submit" className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200">
//                             Verify
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VerifyCodePage;

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useVerifyEmailMutation, useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const verifyCodeSchema = z.object({
    code: z.string().min(1, "Verification code is required").length(4, "Code must be 6 digits"),
});

type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

const VerifyCodePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
    const [resendEmail, { isLoading: isResending }] = useForgetPasswordMutation();
    const [resendCountdown, setResendCountdown] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<VerifyCodeFormData>({
        resolver: zodResolver(verifyCodeSchema),
    });

    // Countdown timer for resend
    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setTimeout(() => {
                setResendCountdown(resendCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCountdown]);

    const onSubmit = async (data: VerifyCodeFormData) => {
        if (!email) {
            toast.error("Email is required");
            return;
        }

        try {
            const result = await verifyEmail({
                email: email,
                oneTimeCode: parseInt(data.code, 10),
            }).unwrap();

            if (result.success) {
                // Get the verification token from API response
                const token = result.data;

                toast.success(result.message || "Email verified successfully");
                // Navigate to reset password page with email and token
                router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
            } else {
                toast.error(result.message || "Failed to verify code");
            }
        } catch (error: any) {
            console.error("Verify code error:", error);
            toast.error(error?.data?.message || "Failed to verify code");
        }
    };

    const handleResendCode = async () => {
        if (!email || resendCountdown > 0) return;

        try {
            const result = await resendEmail({
                email: email,
            }).unwrap();

            if (result.success) {
                toast.success(result.message || "New code sent successfully");
                setResendCountdown(60); // 60 seconds countdown
                reset(); // Clear the code input
            } else {
                toast.error(result.message || "Failed to resend code");
            }
        } catch (error: any) {
            console.error("Resend code error:", error);
            toast.error(error?.data?.message || "Failed to resend code");
        }
    };

    // Auto-focus and auto-submit for OTP (optional)
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
        setValue("code", value);

        // Auto-submit when 6 digits are entered
        if (value.length === 6) {
            handleSubmit(onSubmit)();
        }
    };

    if (!email) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-red-500 mb-4">Email not found</h1>
                    <p className="text-gray-600 mb-4">Please go back and enter your email first.</p>
                    <Link href="/auth/forgot-password" className="text-[#3CB371] hover:underline">
                        ← Back to Forgot Password
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex p-4 md:p-[104px]">
            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2">
                <div className="h-full">
                    <Image src="/auth/verify-code.svg" alt="Verify Code" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
                </div>
            </div>

            {/* Right Side - Verify Code Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md">
                    {/* Back to Login */}
                    <div className="mb-6">
                        <Link href="/auth/login" className="text-[#3CB371] hover:underline flex items-center gap-2">
                            ← Back to login
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Verify code</h1>
                        <p className="text-[#434343] text-left">
                            An authentication code has been sent to <span className="font-semibold text-[#3CB371]">{email}</span>
                        </p>
                    </div>

                    {/* Verify Code Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Code Input */}
                        <div className="relative">
                            <div className="relative">
                                <input
                                    {...register("code")}
                                    type="text"
                                    id="code"
                                    className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent peer text-center text-xl tracking-widest"
                                    placeholder=" "
                                    disabled={isVerifying}
                                    maxLength={6}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    onChange={handleCodeChange}
                                    autoComplete="one-time-code"
                                    autoFocus
                                />
                                <label htmlFor="code" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Enter 4-digit Code
                                </label>
                            </div>
                            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
                        </div>

                        {/* Resend Code */}
                        <div className="text-left">
                            <p className="text-[#434343]">
                                Didn&apos;t receive a code?{" "}
                                <button type="button" onClick={handleResendCode} disabled={isResending || resendCountdown > 0} className="text-[#3CB371] hover:underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isResending ? "Sending..." : resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend"}
                                </button>
                            </p>
                        </div>

                        {/* Verify Button */}
                        <button type="submit" disabled={isVerifying} className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isVerifying ? "Verifying..." : "Verify"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyCodePage;

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Image from "next/image";
// import { useState } from "react";
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// const changePasswordSchema = z
//     .object({
//         newPassword: z.string().min(1, "New password is required"),
//         confirmPassword: z.string().min(1, "Please confirm your password"),
//     })
//     .refine((data) => data.newPassword === data.confirmPassword, {
//         message: "Passwords don't match",
//         path: ["confirmPassword"],
//     });

// type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// const ChangePasswordPage = () => {
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<ChangePasswordFormData>({
//         resolver: zodResolver(changePasswordSchema),
//     });

//     const onSubmit = (data: ChangePasswordFormData) => {
//         console.log(data);
//         // Handle password change submission
//     };

//     return (
//         <div className="h-screen flex p-4 md:p-[104px]">
//             {/* Left Side - Image */}
//             <div className="hidden lg:block lg:w-1/2">
//                 <div className="h-full">
//                     <Image src="/auth/change-password.svg" alt="Change Password" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
//                 </div>
//             </div>

//             {/* Right Side - Change Password Form */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center">
//                 <div className="w-full max-w-md">
//                     {/* Header */}
//                     <div className="text-center mb-8">
//                         <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Change Password</h1>
//                         <p className="text-[#434343] text-left">Your previous password has been reseted. Please set a new password for your account.</p>
//                     </div>

//                     {/* Change Password Form */}
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                         {/* New Password */}
//                         <div className="relative">
//                             <div className="relative">
//                                 <input {...register("newPassword")} type={showNewPassword ? "text" : "password"} id="newPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " />
//                                 <label htmlFor="newPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
//                                     Create New Password
//                                 </label>
//                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowNewPassword(!showNewPassword)}>
//                                     {showNewPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
//                                 </button>
//                             </div>
//                             {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
//                         </div>

//                         {/* Confirm Password */}
//                         <div className="relative">
//                             <div className="relative">
//                                 <input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " />
//                                 <label htmlFor="confirmPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
//                                     Re-enter New Password
//                                 </label>
//                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                                     {showConfirmPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
//                                 </button>
//                             </div>
//                             {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
//                         </div>

//                         {/* Set Password Button */}
//                         <button type="submit" className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200">
//                             Set password
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChangePasswordPage;

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            toast.error("Verification token is missing");
            return;
        }

        try {
            // Prepare headers with Authorization token
            const requestData = {
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
                // Add token to request headers through the API configuration
            };

            // Call reset password mutation with custom headers
            const result = await resetPassword({
                body: requestData,
                headers: {
                    Authorization: token,
                },
            }).unwrap();

            if (result.success) {
                toast.success(result.message || "Password reset successfully");
                router.push("/auth/login");
            } else {
                toast.error(result.message || "Failed to reset password");
            }
        } catch (error: any) {
            console.error("Reset password error:", error);
            toast.error(error?.data?.message || "Failed to reset password");
        }
    };

    // If no token, show error
    if (!token) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-red-500 mb-4">Invalid Request</h1>
                    <p className="text-gray-600 mb-4">Verification token is missing. Please restart the password reset process.</p>
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
                    <Image src="/auth/change-password.svg" alt="Reset Password" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
                </div>
            </div>

            {/* Right Side - Reset Password Form */}
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
                        <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Reset Password</h1>
                        <p className="text-[#434343] text-left">Create a new password for {email ? <span className="font-semibold text-[#3CB371]">{email}</span> : "your account"}</p>
                    </div>

                    {/* Reset Password Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* New Password */}
                        <div className="relative">
                            <div className="relative">
                                <input {...register("newPassword")} type={showPassword ? "text" : "password"} id="password" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " disabled={isLoading} />
                                <label htmlFor="password" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    New Password
                                </label>
                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                                    {showPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
                                </button>
                            </div>
                            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <div className="relative">
                                <input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " disabled={isLoading} />
                                <label htmlFor="confirmPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Confirm New Password
                                </label>
                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
                                    {showConfirmPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Reset Password Button */}
                        <button type="submit" disabled={isLoading} className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? "Resetting Password..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

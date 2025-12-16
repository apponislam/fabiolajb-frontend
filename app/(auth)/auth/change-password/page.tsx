// // "use client";

// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";
// // import Image from "next/image";
// // import { useState } from "react";
// // import { LuEye, LuEyeClosed } from "react-icons/lu";

// // const changePasswordSchema = z
// //     .object({
// //         oldPassword: z.string().min(1, "Old password is required"),
// //         newPassword: z.string().min(1, "New password is required"),
// //         confirmPassword: z.string().min(1, "Please confirm your password"),
// //     })
// //     .refine((data) => data.newPassword === data.confirmPassword, {
// //         message: "Passwords don't match",
// //         path: ["confirmPassword"],
// //     });

// // type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// // const ChangePasswordPage = () => {
// //     const [showOldPassword, setShowOldPassword] = useState(false);
// //     const [showNewPassword, setShowNewPassword] = useState(false);
// //     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //     const {
// //         register,
// //         handleSubmit,
// //         formState: { errors },
// //     } = useForm<ChangePasswordFormData>({
// //         resolver: zodResolver(changePasswordSchema),
// //     });

// //     const onSubmit = (data: ChangePasswordFormData) => {
// //         console.log(data);
// //         // Handle password change submission
// //     };

// //     return (
// //         <div className="h-screen flex p-4 md:p-[104px]">
// //             {/* Left Side - Image */}
// //             <div className="hidden lg:block lg:w-1/2">
// //                 <div className="h-full">
// //                     <Image src="/auth/change-password.svg" alt="Change Password" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
// //                 </div>
// //             </div>

// //             {/* Right Side - Change Password Form */}
// //             <div className="w-full lg:w-1/2 flex items-center justify-center">
// //                 <div className="w-full max-w-md">
// //                     {/* Header */}
// //                     <div className="text-center mb-8">
// //                         <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Change Password</h1>
// //                         <p className="text-[#434343] text-left">Your previous password has been reseted. Please set a new password for your account.</p>
// //                     </div>

// //                     {/* Change Password Form */}
// //                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //                         {/* Old Password */}
// //                         <div className="relative">
// //                             <div className="relative">
// //                                 <input {...register("oldPassword")} type={showOldPassword ? "text" : "password"} id="oldPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " />
// //                                 <label htmlFor="oldPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
// //                                     Old Password
// //                                 </label>
// //                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowOldPassword(!showOldPassword)}>
// //                                     {showOldPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
// //                                 </button>
// //                             </div>
// //                             {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>}
// //                         </div>

// //                         {/* New Password */}
// //                         <div className="relative">
// //                             <div className="relative">
// //                                 <input {...register("newPassword")} type={showNewPassword ? "text" : "password"} id="newPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " />
// //                                 <label htmlFor="newPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
// //                                     Create New Password
// //                                 </label>
// //                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowNewPassword(!showNewPassword)}>
// //                                     {showNewPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
// //                                 </button>
// //                             </div>
// //                             {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
// //                         </div>

// //                         {/* Confirm Password */}
// //                         <div className="relative">
// //                             <div className="relative">
// //                                 <input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " />
// //                                 <label htmlFor="confirmPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
// //                                     Re-enter New Password
// //                                 </label>
// //                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
// //                                     {showConfirmPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
// //                                 </button>
// //                             </div>
// //                             {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
// //                         </div>

// //                         {/* Set Password Button */}
// //                         <button type="submit" className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200">
// //                             Set password
// //                         </button>
// //                     </form>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ChangePasswordPage;

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Image from "next/image";
// import { useState } from "react";
// import { LuEye, LuEyeClosed } from "react-icons/lu";
// import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// const changePasswordSchema = z
//     .object({
//         currentPassword: z.string().min(1, "Current password is required"),
//         newPassword: z.string().min(1, "New password is required"),
//         confirmPassword: z.string().min(1, "Please confirm your password"),
//     })
//     .refine((data) => data.newPassword === data.confirmPassword, {
//         message: "Passwords don't match",
//         path: ["confirmPassword"],
//     });

// type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// const ChangePasswordPage = () => {
//     const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [changePassword, { isLoading }] = useChangePasswordMutation();
//     const router = useRouter();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm<ChangePasswordFormData>({
//         resolver: zodResolver(changePasswordSchema),
//     });

//     const onSubmit = async (data: ChangePasswordFormData) => {
//         try {
//             const result = await changePassword({
//                 currentPassword: data.currentPassword,
//                 newPassword: data.newPassword,
//                 confirmPassword: data.confirmPassword,
//             }).unwrap();

//             if (result.success) {
//                 toast.success(result.message || "Password changed successfully");
//                 reset(); // Clear form
//                 // Redirect to dashboard after successful password change
//                 router.push("/dashboard");
//             } else {
//                 toast.error(result.message || "Failed to change password");
//             }
//         } catch (error: any) {
//             console.error("Change password error:", error);
//             toast.error(error?.data?.message || "Failed to change password");
//         }
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
//                         {/* Current Password */}
//                         <div className="relative">
//                             <div className="relative">
//                                 <input {...register("currentPassword")} type={showCurrentPassword ? "text" : "password"} id="currentPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " disabled={isLoading} />
//                                 <label htmlFor="currentPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
//                                     Current Password
//                                 </label>
//                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowCurrentPassword(!showCurrentPassword)} disabled={isLoading}>
//                                     {showCurrentPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
//                                 </button>
//                             </div>
//                             {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
//                         </div>

//                         {/* New Password */}
//                         <div className="relative">
//                             <div className="relative">
//                                 <input {...register("newPassword")} type={showNewPassword ? "text" : "password"} id="newPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " disabled={isLoading} />
//                                 <label htmlFor="newPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
//                                     Create New Password
//                                 </label>
//                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowNewPassword(!showNewPassword)} disabled={isLoading}>
//                                     {showNewPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
//                                 </button>
//                             </div>
//                             {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
//                         </div>

//                         {/* Confirm Password */}
//                         <div className="relative">
//                             <div className="relative">
//                                 <input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " disabled={isLoading} />
//                                 <label htmlFor="confirmPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
//                                     Re-enter New Password
//                                 </label>
//                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
//                                     {showConfirmPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
//                                 </button>
//                             </div>
//                             {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
//                         </div>

//                         {/* Set Password Button */}
//                         <button type="submit" disabled={isLoading} className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
//                             {isLoading ? "Changing Password..." : "Set password"}
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
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(1, "New password is required"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordPage = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordFormData) => {
        try {
            const result = await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            }).unwrap();

            if (result.success) {
                toast.success(result.message || "Password changed successfully");
                reset(); // Clear form
                // Redirect to dashboard after successful password change
                router.push("/dashboard");
            } else {
                toast.error(result.message || "Failed to change password");
            }
        } catch (error: any) {
            console.error("Change password error:", error);
            toast.error(error?.data?.message || "Failed to change password");
        }
    };

    return (
        <div className="h-screen flex p-4 md:p-[104px]">
            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2">
                <div className="h-full">
                    <Image src="/auth/change-password.svg" alt="Change Password" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
                </div>
            </div>

            {/* Right Side - Change Password Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Change Password</h1>
                        <p className="text-[#434343] text-left">Your previous password has been reseted. Please set a new password for your account.</p>
                    </div>

                    {/* Change Password Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Current Password */}
                        <div className="relative">
                            <div className="relative">
                                <input {...register("currentPassword")} type={showCurrentPassword ? "text" : "password"} id="currentPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " disabled={isLoading} />
                                <label htmlFor="currentPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Current Password
                                </label>
                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowCurrentPassword(!showCurrentPassword)} disabled={isLoading}>
                                    {showCurrentPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
                                </button>
                            </div>
                            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
                        </div>

                        {/* New Password */}
                        <div className="relative">
                            <div className="relative">
                                <input {...register("newPassword")} type={showNewPassword ? "text" : "password"} id="newPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " disabled={isLoading} />
                                <label htmlFor="newPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Create New Password
                                </label>
                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowNewPassword(!showNewPassword)} disabled={isLoading}>
                                    {showNewPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
                                </button>
                            </div>
                            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <div className="relative">
                                <input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " disabled={isLoading} />
                                <label htmlFor="confirmPassword" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Re-enter New Password
                                </label>
                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
                                    {showConfirmPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Set Password Button */}
                        <button type="submit" disabled={isLoading} className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? "Changing Password..." : "Set password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;

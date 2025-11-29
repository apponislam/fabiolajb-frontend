"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        console.log(data);
        router.push("/auth/verify-otp");
    };

    return (
        <div className="h-screen flex p-4 md:p-[104px]">
            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2">
                <div className="h-full">
                    <Image src="/auth/change-password.svg" alt="Forgot Password" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
                </div>
            </div>

            {/* Right Side - Forgot Password Form */}
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
                        <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Forgot your password?</h1>
                        <p className="text-[#434343] text-left">Don&apos;t worry, happens to all of us. Enter your email below to recover your password</p>
                    </div>

                    {/* Forgot Password Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email */}
                        <div className="relative">
                            <div className="relative">
                                <input {...register("email")} type="email" id="email" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent peer" placeholder=" " />
                                <label htmlFor="email" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Email
                                </label>
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

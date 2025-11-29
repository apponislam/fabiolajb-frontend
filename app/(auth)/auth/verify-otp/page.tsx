"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const verifyCodeSchema = z.object({
    code: z.string().min(1, "Verification code is required"),
});

type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

const VerifyCodePage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyCodeFormData>({
        resolver: zodResolver(verifyCodeSchema),
    });

    const onSubmit = (data: VerifyCodeFormData) => {
        console.log(data);
        router.push("/auth/reset-password");
    };

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
                        <p className="text-[#434343] text-left">An authentication code has been sent to your email.</p>
                    </div>

                    {/* Verify Code Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Code Input */}
                        <div className="relative">
                            <div className="relative">
                                <input {...register("code")} type="text" id="code" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent peer" placeholder=" " />
                                <label htmlFor="code" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Enter Code
                                </label>
                            </div>
                            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
                        </div>

                        {/* Resend Code */}
                        <div className="text-left">
                            <p className="text-[#434343]">
                                Didn&apos;t receive a code?{" "}
                                <button type="button" className="text-[#3CB371] hover:underline font-semibold">
                                    Resend
                                </button>
                            </p>
                        </div>

                        {/* Verify Button */}
                        <button type="submit" className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200">
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyCodePage;

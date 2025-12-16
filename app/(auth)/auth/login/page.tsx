// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Image from "next/image";
// import { useState } from "react";
// import { LuEye, LuEyeClosed } from "react-icons/lu";
// import Link from "next/link";

// const loginSchema = z.object({
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(1, "Password is required"),
//     rememberMe: z.boolean().optional(),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// const LoginPage = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<LoginFormData>({
//         resolver: zodResolver(loginSchema),
//     });

//     const onSubmit = (data: LoginFormData) => {
//         console.log(data);
//         // Handle login submission
//     };

//     return (
//         <div className="h-screen flex p-4 md:p-[104px]">
//             {/* Left Side - Image */}
//             <div className="hidden lg:block lg:w-1/2">
//                 <div className="h-full">
//                     <Image src="/auth/login.svg" alt="Login" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
//                 </div>
//             </div>

//             {/* Right Side - Login Form */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center">
//                 <div className="w-full max-w-md">
//                     {/* Header */}
//                     <div className="text-center mb-8">
//                         <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Login</h1>
//                         <p className="text-[#434343] text-left">Login to access your &lsquo;&lsquo;Just Breathe Cleaning Services&rsquo;&rsquo; account</p>
//                     </div>

//                     {/* Login Form */}
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                         <div className="relative">
//                             <div className="relative">
//                                 <input {...register("email")} type="email" id="email" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent peer" placeholder=" " />
//                                 <label htmlFor="email" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
//                                     Email
//                                 </label>
//                             </div>
//                             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//                         </div>

//                         {/* Password */}
//                         <div className="relative">
//                             <div className="relative">
//                                 <input {...register("password")} type={showPassword ? "text" : "password"} id="password" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " />
//                                 <label htmlFor="password" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
//                                     Password
//                                 </label>
//                                 <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowPassword(!showPassword)}>
//                                     {showPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
//                                 </button>
//                             </div>
//                             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//                         </div>

//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                                 <div className="relative h-4 w-4">
//                                     <input {...register("rememberMe")} type="checkbox" id="rememberMe" className="peer w-4 h-4 appearance-none border border-[#5E5E5E] rounded checked:bg-[#3CB371] checked:border-[#3CB371]" />
//                                     <svg className="absolute left-0 top-0 w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
//                                         <path d="M5 12l5 5l10 -10" />
//                                     </svg>
//                                 </div>
//                                 <label htmlFor="rememberMe" className="text-[#5E5E5E]">
//                                     Remember me
//                                 </label>
//                             </div>

//                             <Link href="/auth/forgot-password" className="text-[#3CB371] hover:underline">
//                                 Forgot password?
//                             </Link>
//                         </div>

//                         {/* Login Button */}
//                         <button type="submit" className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200">
//                             Login
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authApi";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login(data).unwrap();

            if (result.success && result.data) {
                dispatch(
                    setCredentials({
                        user: result.data.userInfo,
                        accessToken: result.data.createToken,
                    })
                );

                toast.success("Login successful!");
                router.push("/dashboard");
            } else {
                toast.error(result.message || "Login failed");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Login failed");
        }
    };

    return (
        <div className="h-screen flex p-4 md:p-[104px]">
            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2">
                <div className="h-full">
                    <Image src="/auth/login.svg" alt="Login" width={600} height={800} className="w-full h-full object-cover rounded-2xl" />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-medium text-[#434343] mb-2 text-left">Login</h1>
                        <p className="text-[#434343] text-left">Login to access your &lsquo;&lsquo;Just Breathe Cleaning Services&rsquo;&rsquo; account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="relative">
                            <div className="relative">
                                <input {...register("email")} type="email" id="email" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent peer" placeholder=" " />
                                <label htmlFor="email" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Email
                                </label>
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="relative">
                                <input {...register("password")} type={showPassword ? "text" : "password"} id="password" className="w-full px-4 py-3 border border-[#5E5E5E] rounded-[18px] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent pr-10 peer" placeholder=" " />
                                <label htmlFor="password" className="absolute left-4 top-3 text-[#5E5E5E] transition-all duration-200 transform peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#3CB371] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm">
                                    Password
                                </label>
                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <LuEyeClosed className="text-[#5E5E5E]" /> : <LuEye className="text-[#3CB371]" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="relative h-4 w-4">
                                    <input {...register("rememberMe")} type="checkbox" id="rememberMe" className="peer w-4 h-4 appearance-none border border-[#5E5E5E] rounded checked:bg-[#3CB371] checked:border-[#3CB371]" />
                                    <svg className="absolute left-0 top-0 w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                        <path d="M5 12l5 5l10 -10" />
                                    </svg>
                                </div>
                                <label htmlFor="rememberMe" className="text-[#5E5E5E]">
                                    Remember me
                                </label>
                            </div>

                            <Link href="/auth/forgot-password" className="text-[#3CB371] hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button type="submit" disabled={isLoading} className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

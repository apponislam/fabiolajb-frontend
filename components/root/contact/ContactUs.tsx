"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BsSend, BsEnvelope } from "react-icons/bs";
import { LuPhoneCall } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";

const contactSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = (data: ContactFormData) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-4xl font-medium text-[#364153] mb-6">
                        <span className="text-[#3CB371]">Provide</span> your details and get a<br className="hidden xl:block" />
                        tailored quote
                        <span className="text-[#3CB371]"> instantly.</span>
                    </h1>
                    <p className="text-[14px] text-[#797979] mx-auto">
                        We&apos;re more than just a cleaning company – we&apos;re your partners in creating clean, <br /> healthy, and stress-free spaces where you can truly breathe easy.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto items-start">
                    {/* Contact Information - 3 Cards */}
                    <div className="space-y-6">
                        {/* Call Us Card */}
                        <div className="bg-white rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-6  ">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#3CB371] p-3 rounded-full w-11 h-11 flex items-center justify-center">
                                    <LuPhoneCall className="text-white text-lg" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#434343]">Call Us</h4>
                                    <p className="text-[#5E5E5E] mt-1">+(08) 255 201 888</p>
                                </div>
                            </div>
                        </div>

                        {/* Email Now Card */}
                        <div className="bg-white rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-6  ">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#3CB371] p-3 rounded-full w-11 h-11 flex items-center justify-center">
                                    <BsEnvelope className="text-white text-lg" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#434343]">Email Now</h4>
                                    <p className="text-[#5E5E5E] mt-1">Hello@procleaning.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div className="bg-white rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-6  ">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#3CB371] p-3 rounded-full w-11 h-11 flex items-center justify-center">
                                    <IoLocationSharp className="text-white text-lg" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#434343]">Address</h4>
                                    <p className="text-[#5E5E5E] mt-1">7510, Brand Tower, New York, USA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="bg-white rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-6 border-t border-[#3CB371] h-full flex flex-col justify-between">
                        <h2 className="text-xl md:text-2xl font-medium text-[#5E5E5E] mb-6 text-center">Get In Touch</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  flex-1 flex flex-col justify-center">
                            {/* First Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#364153] font-semibold mb-2 text-sm">Full name</label>
                                    <input {...register("fullName")} type="text" placeholder="Your full name" className="w-full px-3 py-2 border-b-2 border-[#E5E7EB] bg-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-[#364153] font-semibold mb-2 text-sm">E-mail</label>
                                    <input {...register("email")} type="email" placeholder="Your email address" className="w-full px-3 py-2 border-b-2 border-[#E5E7EB] bg-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            {/* Second Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#364153] font-semibold mb-2 text-sm">Phone</label>
                                    <input {...register("phone")} type="tel" placeholder="Your phone number" className="w-full px-3 py-2 border-b-2 border-[#E5E7EB] bg-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-[#364153] font-semibold mb-2 text-sm">Message</label>
                                    <input {...register("message")} type="text" placeholder="Your message" className="w-full px-3 py-2 border-b-2 border-[#E5E7EB] bg-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#3CB371] text-white py-2 rounded-lg font-semibold hover:bg-[#2E8B57] transition-colors duration-200 flex items-center justify-center gap-2 mt-6">
                                Send Message <BsSend />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

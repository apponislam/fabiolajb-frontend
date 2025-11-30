"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BsSend } from "react-icons/bs";

const quoteSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    cleaningFrequency: z.string().min(1, "Cleaning frequency is required"),
    email: z.string().email("Invalid email address"),
    preferredDateTime: z.string().min(1, "Preferred date and time is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    serviceAddress: z.string().min(1, "Service address is required"),
    businessName: z.string().optional(),
    propertySize: z.string().optional(),
    serviceType: z.string().min(1, "Service type is required"),
    additionalNotes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const RequestQuote = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteSchema),
    });

    const onSubmit = (data: QuoteFormData) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-medium text-[#364153] mb-6">
                        <span className="text-[#3CB371]">Provide</span> your details and get a<br />
                        tailored quote
                        <span className="text-[#3CB371]"> instantly.</span>
                    </h1>
                    <p className="text-[14px] text-[#797979] mx-auto">
                        We&apos;re more than just a cleaning company – we&apos;re your partners in creating clean, <br /> healthy, and stress-free spaces where you can truly breathe easy.
                    </p>
                </div>

                {/* Form Section */}
                {/* Form Section */}
                <div className="container mx-auto">
                    <h2 className="text-2xl md:text-3xl font-medium text-[#5E5E5E] mb-8 text-center">Request a Quote</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {/* Full Name & Cleaning Frequency */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Full Name</label>
                                <input {...register("fullName")} type="text" placeholder="John Doe" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Cleaning Frequency</label>
                                <select {...register("cleaningFrequency")} className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent">
                                    <option value="">Select frequency</option>
                                    <option value="one-time">One-time</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="bi-weekly">Bi-weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                                {errors.cleaningFrequency && <p className="text-red-500 text-sm mt-1">{errors.cleaningFrequency.message}</p>}
                            </div>
                        </div>

                        {/* Email & Date/Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Email Address</label>
                                <input {...register("email")} type="email" placeholder="john.doe@example.com" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Preferred Date & Time</label>
                                <input {...register("preferredDateTime")} type="text" placeholder="mm/dd/yyyy --:-- --" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.preferredDateTime && <p className="text-red-500 text-sm mt-1">{errors.preferredDateTime.message}</p>}
                            </div>
                        </div>

                        {/* Phone & Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Phone Number</label>
                                <input {...register("phoneNumber")} type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Service Address</label>
                                <input {...register("serviceAddress")} type="text" placeholder="123 Main Street, Suite 100, City, State, ZIP" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.serviceAddress && <p className="text-red-500 text-sm mt-1">{errors.serviceAddress.message}</p>}
                            </div>
                        </div>

                        {/* Business Name & Property Size */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Business Name</label>
                                <input {...register("businessName")} type="text" placeholder="ABC Corporation" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Property Size / Area (sq.ft)</label>
                                <input {...register("propertySize")} type="number" placeholder="1500" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                            </div>
                        </div>

                        {/* Service Type */}
                        <div>
                            <label className="block text-[#364153] font-semibold mb-2">Service Type</label>
                            <select {...register("serviceType")} className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent">
                                <option value="">Select a service</option>
                                <option value="office-cleaning">Office Cleaning</option>
                                <option value="spring-cleaning">Spring Cleaning</option>
                                <option value="house-cleaning">House Cleaning</option>
                                <option value="commercial-cleaning">Commercial Cleaning</option>
                            </select>
                            {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>}
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-[#364153] font-semibold mb-2">Additional Notes</label>
                            <textarea {...register("additionalNotes")} placeholder="Any special requirements or additional information..." rows={2} className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent resize-none" />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200 flex items-center justify-center gap-2">
                            Submit Quote Request <BsSend />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestQuote;

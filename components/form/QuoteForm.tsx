// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// // Zod validation schema
// const quoteFormSchema = z.object({
//     fullName: z.string().min(1, "Full name is required"),
//     email: z.string().email("Invalid email address"),
//     phone: z.string().min(1, "Phone number is required"),
//     businessName: z.string().min(1, "Business name is required"),
//     serviceType: z.string().min(1, "Please select a service type"),
//     frequency: z.string().min(1, "Please select cleaning frequency"),
//     dateTime: z.string().min(1, "Date and time is required"),
//     address: z.string().min(1, "Address is required"),
//     propertySize: z.string().min(1, "Property size is required"),
//     notes: z.string().optional(),
// });

// type QuoteFormData = z.infer<typeof quoteFormSchema>;

// const QuoteForm = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<QuoteFormData>({
//         resolver: zodResolver(quoteFormSchema),
//         defaultValues: {
//             fullName: "John Doe",
//             email: "john.doe@example.com",
//             phone: "+1 (555) 000-0000",
//             businessName: "ABC Corporation",
//             serviceType: "",
//             frequency: "",
//             dateTime: "mm/dd/yyyy --:-- --",
//             address: "123 Main Street, Suite 100, City, State, ZIP",
//             propertySize: "1500",
//             notes: "Any special requirements or additional information...",
//         },
//     });

//     const onSubmit = (data: QuoteFormData) => {
//         console.log(data);
//         // Handle form submission
//     };

//     return (
//         <div className="bg-[#FFFFFF1A] backdrop-blur-sm rounded-2xl p-8 border border-[#FFFFFF]">
//             <h2 className="text-2xl font-bold mb-6 text-center text-white">Request a Quote</h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {/* Full Name & Cleaning Frequency */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-2 text-white">Full Name</label>
//                         <input {...register("fullName")} type="text" className="w-full  border border-white rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-2 text-white">Cleaning Frequency</label>
//                         <select {...register("frequency")} className="w-full  border border-white rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3CB371] transition-colors">
//                             <option value="">Select frequency</option>
//                             <option value="once">One Time</option>
//                             <option value="weekly">Weekly</option>
//                             <option value="biweekly">Bi-Weekly</option>
//                             <option value="monthly">Monthly</option>
//                         </select>
//                         {errors.frequency && <p className="text-red-400 text-sm mt-1">{errors.frequency.message}</p>}
//                     </div>
//                 </div>

//                 {/* Email & Date/Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-2 text-white">Email Address</label>
//                         <input {...register("email")} type="email" className="w-full  border border-white rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-2 text-white">Preferred Date & Time</label>
//                         <input {...register("dateTime")} type="text" className="w-full  border border-white rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.dateTime && <p className="text-red-400 text-sm mt-1">{errors.dateTime.message}</p>}
//                     </div>
//                 </div>

//                 {/* Phone & Address */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-2 text-white">Phone Number</label>
//                         <input {...register("phone")} type="tel" className="w-full  border border-white rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-2 text-white">Service Address</label>
//                         <input {...register("address")} type="text" className="w-full  border border-white rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
//                     </div>
//                 </div>

//                 {/* Business Name & Property Size */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-2 text-white">Business Name</label>
//                         <input {...register("businessName")} type="text" className="w-full  border border-white rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.businessName && <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-2 text-white">Property Size / Area (sq.ft)</label>
//                         <input {...register("propertySize")} type="text" className="w-full bg-white/10 border border-white rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.propertySize && <p className="text-red-400 text-sm mt-1">{errors.propertySize.message}</p>}
//                     </div>
//                 </div>

//                 {/* Service Type */}
//                 <div>
//                     <label className="block text-sm font-medium mb-2 text-white">Service Type</label>
//                     <select {...register("serviceType")} className="w-full border border-white rounded-lg px-4 py-3 text-white bg-transparent focus:outline-none focus:border-[#3CB371] transition-colors">
//                         <option value="" className="bg-[#282828] text-white">
//                             Select a service
//                         </option>
//                         <option value="residential" className="bg-[#282828] text-white">
//                             Residential Cleaning
//                         </option>
//                         <option value="commercial" className="bg-[#282828] text-white">
//                             Commercial Cleaning
//                         </option>
//                         <option value="deep" className="bg-[#282828] text-white">
//                             Deep Cleaning
//                         </option>
//                         <option value="move" className="bg-[#282828] text-white">
//                             Move In/Out Cleaning
//                         </option>
//                     </select>
//                     {errors.serviceType && <p className="text-red-400 text-sm mt-1">{errors.serviceType.message}</p>}
//                 </div>

//                 {/* Additional Notes */}
//                 <div>
//                     <label className="block text-sm font-medium mb-2 text-white">Additional Notes</label>
//                     <textarea {...register("notes")} rows={3} className="w-full  border border-white rounded-lg px-4 py-3 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors resize-none" />
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold hover:bg-[#35a065] transition-colors">
//                     Submit Quote Request
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default QuoteForm;

"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod validation schema
const quoteFormSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    businessName: z.string().min(1, "Business name is required"),
    serviceType: z.string().min(1, "Please select a service type"),
    frequency: z.string().min(1, "Please select cleaning frequency"),
    dateTime: z.string().min(1, "Date and time is required"),
    address: z.string().min(1, "Address is required"),
    propertySize: z.string().min(1, "Property size is required"),
    notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const QuoteForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 000-0000",
            businessName: "ABC Corporation",
            serviceType: "",
            frequency: "",
            dateTime: "mm/dd/yyyy --:-- --",
            address: "123 Main Street, Suite 100, City, State, ZIP",
            propertySize: "1500",
            notes: "Any special requirements or additional information...",
        },
    });

    const onSubmit = (data: QuoteFormData) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <div className="bg-[#FFFFFF1A] backdrop-blur-sm rounded-2xl p-6 border border-[#FFFFFF] mt-30">
            <h2 className="text-xl font-bold mb-4 text-center text-white">Request a Quote</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Full Name & Cleaning Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Full Name</label>
                        <input {...register("fullName")} type="text" className="w-full border border-white rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Cleaning Frequency</label>
                        <select {...register("frequency")} className="w-full border border-white rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#3CB371] transition-colors">
                            <option value="">Select frequency</option>
                            <option value="once">One Time</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Bi-Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        {errors.frequency && <p className="text-red-400 text-xs mt-1">{errors.frequency.message}</p>}
                    </div>
                </div>

                {/* Email & Date/Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Email Address</label>
                        <input {...register("email")} type="email" className="w-full border border-white rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Preferred Date & Time</label>
                        <input {...register("dateTime")} type="text" className="w-full border border-white rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.dateTime && <p className="text-red-400 text-xs mt-1">{errors.dateTime.message}</p>}
                    </div>
                </div>

                {/* Phone & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Phone Number</label>
                        <input {...register("phone")} type="tel" className="w-full border border-white rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Service Address</label>
                        <input {...register("address")} type="text" className="w-full border border-white rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                </div>

                {/* Business Name & Property Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Business Name</label>
                        <input {...register("businessName")} type="text" className="w-full border border-white rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Property Size / Area (sq.ft)</label>
                        <input {...register("propertySize")} type="text" className="w-full border border-white rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.propertySize && <p className="text-red-400 text-xs mt-1">{errors.propertySize.message}</p>}
                    </div>
                </div>

                {/* Service Type */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-white">Service Type</label>
                    <select {...register("serviceType")} className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent focus:outline-none focus:border-[#3CB371] transition-colors">
                        <option value="" className="bg-[#282828] text-white">
                            Select a service
                        </option>
                        <option value="residential" className="bg-[#282828] text-white">
                            Residential Cleaning
                        </option>
                        <option value="commercial" className="bg-[#282828] text-white">
                            Commercial Cleaning
                        </option>
                        <option value="deep" className="bg-[#282828] text-white">
                            Deep Cleaning
                        </option>
                        <option value="move" className="bg-[#282828] text-white">
                            Move In/Out Cleaning
                        </option>
                    </select>
                    {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType.message}</p>}
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-white">Additional Notes</label>
                    <textarea {...register("notes")} rows={2} className="w-full border border-white rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors resize-none" />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-[#3CB371] text-white py-2 rounded-lg font-semibold hover:bg-[#35a065] transition-colors">
                    Submit Quote Request
                </button>
            </form>
        </div>
    );
};

export default QuoteForm;

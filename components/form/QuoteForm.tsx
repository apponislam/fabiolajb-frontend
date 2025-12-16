// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { CalendarIcon, Clock } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { useState } from "react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { useCreateQuoteMutation } from "@/redux/features/quote/quoteApi";
// import { useGetActiveServicesQuery } from "@/redux/features/services/servicesApi";

// // Update Zod validation schema to match API requirements
// const quoteFormSchema = z.object({
//     fullName: z.string().min(1, "Full name is required"),
//     email: z.string().email("Invalid email address"),
//     phone: z.string().min(1, "Phone number is required"),
//     businessName: z.string().min(1, "Business name is required"),
//     serviceType: z.string().min(1, "Please select a service type"),
//     frequency: z.string().min(1, "Please select cleaning frequency"),
//     dateTime: z.date().refine((date) => date !== undefined && date !== null, {
//         message: "Preferred date and time is required",
//     }),
//     address: z.string().min(1, "Address is required"),
//     propertySize: z.string().min(1, "Property size is required"),
//     notes: z.string().optional(),
// });

// type QuoteFormData = z.infer<typeof quoteFormSchema>;

// const QuoteForm = () => {
//     const [selectedDate, setSelectedDate] = useState<Date>();
//     const [selectedTime, setSelectedTime] = useState("9:00 AM");
//     const [createQuote, { isLoading, isSuccess, error }] = useCreateQuoteMutation();

//     // Fetch active services
//     const { data: servicesData, isLoading: isServicesLoading } = useGetActiveServicesQuery(undefined);
//     const services = servicesData?.data || [];

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//         reset,
//         getValues, // Use getValues instead of watch
//     } = useForm<QuoteFormData>({
//         resolver: zodResolver(quoteFormSchema),
//     });

//     const onSubmit = async (data: QuoteFormData) => {
//         try {
//             // Format data according to API requirements
//             const formattedData = {
//                 fullName: data.fullName,
//                 email: data.email,
//                 phone: data.phone,
//                 serviceType: data.serviceType, // This will be the service _id
//                 cleaningFrequency: data.frequency,
//                 preferredDateTime: data.dateTime.toISOString(),
//                 serviceAddress: data.address,
//                 propertySize: parseInt(data.propertySize),
//                 additionalNotes: data.notes || "",
//                 businessName: data.businessName,
//             };

//             console.log("Submitting quote:", formattedData);

//             // Send the request
//             await createQuote(formattedData).unwrap();

//             // Reset form on success
//             reset();
//             setSelectedDate(undefined);
//             setSelectedTime("9:00 AM");
//         } catch (err) {
//             console.error("Failed to submit quote:", err);
//         }
//     };

//     const handleDateSelect = (date: Date | undefined) => {
//         if (date) {
//             // Combine date with selected time
//             const [hours, minutes] = convertTimeStringTo24Hour(selectedTime);
//             date.setHours(hours, minutes, 0, 0);
//             setSelectedDate(date);
//             setValue("dateTime", date, { shouldValidate: true });
//         }
//     };

//     const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const newTime = e.target.value;
//         setSelectedTime(newTime);

//         if (selectedDate) {
//             // Update the date with new time
//             const [hours, minutes] = convertTimeStringTo24Hour(newTime);
//             const updatedDate = new Date(selectedDate);
//             updatedDate.setHours(hours, minutes, 0, 0);
//             setValue("dateTime", updatedDate, { shouldValidate: true });
//         }
//     };

//     const convertTimeStringTo24Hour = (timeStr: string): [number, number] => {
//         const [timePart, modifier] = timeStr.split(" ");
//         const [hoursStr, minutesStr] = timePart.split(":");
//         let hours = parseInt(hoursStr);
//         const minutes = parseInt(minutesStr);

//         if (modifier === "PM" && hours < 12) hours += 12;
//         if (modifier === "AM" && hours === 12) hours = 0;

//         return [hours, minutes];
//     };

//     const formatDateTime = (date: Date | undefined): string => {
//         if (!date) return "Select date and time";

//         const dateStr = format(date, "MMM dd, yyyy");
//         const timeStr = format(date, "hh:mm a");
//         return `${dateStr} at ${timeStr}`;
//     };

//     // Get the current service type value
//     const getSelectedService = () => {
//         const serviceId = getValues("serviceType");
//         return services.find((service: any) => service._id === serviceId);
//     };

//     const selectedService = getSelectedService();

//     // Generate time options from 8 AM to 5 PM
//     const timeOptions = Array.from({ length: 10 }, (_, i) => {
//         const hour = 8 + i;
//         const period = hour >= 12 ? "PM" : "AM";
//         const displayHour = hour > 12 ? hour - 12 : hour;
//         return {
//             value: `${displayHour}:00 ${period}`,
//             label: `${displayHour}:00 ${period}`,
//         };
//     });

//     return (
//         <div className="bg-[#FFFFFF1A] backdrop-blur-sm rounded-2xl p-6 border border-[#FFFFFF] mt-4 md:mt-30">
//             <h2 className="text-xl font-bold mb-4 text-center text-white">Request a Quote</h2>

//             {isSuccess && (
//                 <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
//                     <p className="text-green-300 text-center">Quote request submitted successfully!</p>
//                 </div>
//             )}

//             {error && (
//                 <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
//                     <p className="text-red-300 text-center">Failed to submit quote. Please try again.</p>
//                 </div>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//                 {/* Full Name & Cleaning Frequency */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Full Name</label>
//                         <input {...register("fullName")} type="text" placeholder="Enter your full name" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Cleaning Frequency</label>
//                         <Select onValueChange={(value) => setValue("frequency", value)}>
//                             <SelectTrigger className="w-full border border-white rounded-lg px-3 py-5 text-white bg-transparent focus:outline-none focus:border-[#3CB371] transition-colors [&>span]:text-white">
//                                 <SelectValue placeholder="Select frequency" />
//                             </SelectTrigger>

//                             <SelectContent className="bg-[#282828] border-white text-white">
//                                 <SelectItem value="daily" className="bg-[#282828] text-white focus:bg-[#282828] focus:text-white">
//                                     Daily
//                                 </SelectItem>
//                                 <SelectItem value="weekly" className="bg-[#282828] text-white focus:bg-[#282828] focus:text-white">
//                                     Weekly
//                                 </SelectItem>
//                                 <SelectItem value="monthly" className="bg-[#282828] text-white focus:bg-[#282828] focus:text-white">
//                                     Monthly
//                                 </SelectItem>
//                             </SelectContent>
//                         </Select>
//                         {errors.frequency && <p className="text-red-400 text-xs mt-1">{errors.frequency.message}</p>}
//                     </div>
//                 </div>

//                 {/* Email & Date/Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Email Address</label>
//                         <input {...register("email")} type="email" placeholder="your.email@example.com" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Preferred Date & Time</label>
//                         <Popover>
//                             <PopoverTrigger asChild>
//                                 <button type="button" className={cn("w-full border border-white rounded-lg px-3 py-2 text-left font-normal text-white bg-transparent flex items-center justify-between", !selectedDate && "text-gray-300")}>
//                                     <span className="flex items-center gap-2">
//                                         <CalendarIcon className="h-4 w-4" />
//                                         {formatDateTime(selectedDate)}
//                                     </span>
//                                     <Clock className="h-4 w-4 opacity-50" />
//                                 </button>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-auto p-4 bg-[#282828] border-white space-y-4">
//                                 <div>
//                                     <h3 className="text-white font-medium mb-2">Select Date</h3>
//                                     <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} disabled={(date) => date < new Date()} initialFocus className="bg-[#282828] text-white rounded-md border" />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-white font-medium mb-2">Select Time</h3>
//                                     <select value={selectedTime} onChange={handleTimeChange} className="w-full border border-white rounded-lg px-3 py-2 text-white bg-[#282828] focus:outline-none focus:border-[#3CB371] transition-colors">
//                                         {timeOptions.map((option) => (
//                                             <option key={option.value} value={option.value} className="bg-[#282828] text-white">
//                                                 {option.label}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </PopoverContent>
//                         </Popover>
//                         {errors.dateTime && <p className="text-red-400 text-xs mt-1">{errors.dateTime.message}</p>}
//                     </div>
//                 </div>

//                 {/* Phone & Address */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Phone Number</label>
//                         <input {...register("phone")} type="tel" placeholder="(555) 123-4567" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Service Address</label>
//                         <input {...register("address")} type="text" placeholder="123 Business Ave, Suite 100" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
//                     </div>
//                 </div>

//                 {/* Business Name & Property Size */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Business Name</label>
//                         <input {...register("businessName")} type="text" placeholder="Your Business Inc." className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-white">Property Size (sq.ft)</label>
//                         <input {...register("propertySize")} type="number" placeholder="e.g., 1500" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
//                         {errors.propertySize && <p className="text-red-400 text-xs mt-1">{errors.propertySize.message}</p>}
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-white">Service Type</label>
//                     <Select onValueChange={(value) => setValue("serviceType", value)}>
//                         <SelectTrigger className="w-full border border-white rounded-lg px-3 py-5 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors [&>span]:text-white">
//                             <SelectValue placeholder={isServicesLoading ? "Loading services..." : "Select a service"}>{selectedService ? selectedService.title : null}</SelectValue>
//                         </SelectTrigger>
//                         <SelectContent className="bg-[#282828] border-white text-white max-h-60 overflow-y-auto">
//                             {isServicesLoading ? (
//                                 <SelectItem value="loading" disabled className="text-center text-gray-400">
//                                     Loading services...
//                                 </SelectItem>
//                             ) : services.length === 0 ? (
//                                 <SelectItem value="no-services" disabled className="text-center text-gray-400">
//                                     No services available
//                                 </SelectItem>
//                             ) : (
//                                 services.map((service: any) => (
//                                     <SelectItem key={service._id} value={service._id} className="focus:bg-[#3CB371]/20 focus:text-white cursor-pointer hover:bg-[#3CB371]/10">
//                                         {service.title}
//                                     </SelectItem>
//                                 ))
//                             )}
//                         </SelectContent>
//                     </Select>
//                     {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType.message}</p>}

//                     {/* Show service description if a service is selected */}
//                     {selectedService && <p className="text-gray-300 text-xs mt-1 italic">{selectedService.description}</p>}
//                 </div>

//                 {/* Additional Notes */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-white">Additional Notes</label>
//                     <textarea {...register("notes")} rows={2} placeholder="Any special requirements, access instructions, or additional information..." className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors resize-none" />
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" disabled={isLoading || isServicesLoading} className="w-full bg-[#3CB371] text-white py-2 rounded-lg font-semibold hover:bg-[#35a065] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
//                     {isLoading ? "Submitting..." : "Submit Quote Request"}
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
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCreateQuoteMutation } from "@/redux/features/quote/quoteApi";
import { useGetActiveServicesQuery } from "@/redux/features/services/servicesApi";

// Update Zod validation schema to match API requirements
const quoteFormSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    businessName: z.string().min(1, "Business name is required"),
    serviceType: z.string().min(1, "Please select a service type"),
    frequency: z.string().min(1, "Please select cleaning frequency"),
    dateTime: z.date().refine((date) => date !== undefined && date !== null, {
        message: "Preferred date and time is required",
    }),
    address: z.string().min(1, "Address is required"),
    propertySize: z.string().min(1, "Property size is required"),
    notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const QuoteForm = () => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState("9:00 AM");
    const [createQuote, { isLoading, isSuccess, error }] = useCreateQuoteMutation();

    // Fetch active services
    const { data: servicesData, isLoading: isServicesLoading } = useGetActiveServicesQuery(undefined);

    // Memoize services
    const services = useMemo(() => {
        return servicesData?.data || [];
    }, [servicesData]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        getValues,
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteFormSchema),
    });

    const onSubmit = async (data: QuoteFormData) => {
        try {
            // Format data according to API requirements
            const formattedData = {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                serviceType: data.serviceType,
                cleaningFrequency: data.frequency,
                preferredDateTime: data.dateTime.toISOString(),
                serviceAddress: data.address,
                propertySize: parseInt(data.propertySize),
                additionalNotes: data.notes || "",
                businessName: data.businessName,
            };

            console.log("Submitting quote:", formattedData);

            // Send the request
            await createQuote(formattedData).unwrap();

            // Reset form on success
            reset();
            setSelectedDate(undefined);
            setSelectedTime("9:00 AM");
        } catch (err) {
            console.error("Failed to submit quote:", err);
        }
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            // Combine date with selected time
            const [hours, minutes] = convertTimeStringTo24Hour(selectedTime);
            date.setHours(hours, minutes, 0, 0);
            setSelectedDate(date);
            setValue("dateTime", date, { shouldValidate: true });
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTime = e.target.value;
        setSelectedTime(newTime);

        if (selectedDate) {
            // Update the date with new time
            const [hours, minutes] = convertTimeStringTo24Hour(newTime);
            const updatedDate = new Date(selectedDate);
            updatedDate.setHours(hours, minutes, 0, 0);
            setValue("dateTime", updatedDate, { shouldValidate: true });
        }
    };

    const convertTimeStringTo24Hour = (timeStr: string): [number, number] => {
        const [timePart, modifier] = timeStr.split(" ");
        const [hoursStr, minutesStr] = timePart.split(":");
        let hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);

        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        return [hours, minutes];
    };

    const formatDateTime = (date: Date | undefined): string => {
        if (!date) return "Select date and time";

        const dateStr = format(date, "MMM dd, yyyy");
        const timeStr = format(date, "hh:mm a");
        return `${dateStr} at ${timeStr}`;
    };

    // Handle service selection
    const handleServiceSelect = (value: string) => {
        setValue("serviceType", value, { shouldValidate: true });
    };

    // Get selected service based on form value
    const getSelectedService = () => {
        const serviceTypeValue = getValues("serviceType");
        if (!serviceTypeValue) return null;
        return services.find((service: any) => service._id === serviceTypeValue);
    };

    const selectedService = getSelectedService();

    // Generate time options from 8 AM to 5 PM
    const timeOptions = useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => {
            const hour = 8 + i;
            const period = hour >= 12 ? "PM" : "AM";
            const displayHour = hour > 12 ? hour - 12 : hour;
            return {
                value: `${displayHour}:00 ${period}`,
                label: `${displayHour}:00 ${period}`,
            };
        });
    }, []);

    // Get current service type for Select value prop
    const currentServiceType = getValues("serviceType");

    return (
        <div className="bg-[#FFFFFF1A] backdrop-blur-sm rounded-2xl p-6 border border-[#FFFFFF] mt-4 md:mt-30">
            <h2 className="text-xl font-bold mb-4 text-center text-white">Request a Quote</h2>

            {isSuccess && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
                    <p className="text-green-300 text-center">Quote request submitted successfully!</p>
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                    <p className="text-red-300 text-center">Failed to submit quote. Please try again.</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Full Name & Cleaning Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Full Name</label>
                        <input {...register("fullName")} type="text" placeholder="Enter your full name" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Cleaning Frequency</label>
                        <Select onValueChange={(value) => setValue("frequency", value)}>
                            <SelectTrigger className="w-full border border-white rounded-lg px-3 py-5 text-white bg-transparent focus:outline-none focus:border-[#3CB371] transition-colors [&>span]:text-white">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>

                            <SelectContent className="bg-[#282828] border-white text-white">
                                <SelectItem value="daily" className="bg-[#282828] text-white focus:bg-[#282828] focus:text-white">
                                    Daily
                                </SelectItem>
                                <SelectItem value="weekly" className="bg-[#282828] text-white focus:bg-[#282828] focus:text-white">
                                    Weekly
                                </SelectItem>
                                <SelectItem value="monthly" className="bg-[#282828] text-white focus:bg-[#282828] focus:text-white">
                                    Monthly
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.frequency && <p className="text-red-400 text-xs mt-1">{errors.frequency.message}</p>}
                    </div>
                </div>

                {/* Email & Date/Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Email Address</label>
                        <input {...register("email")} type="email" placeholder="your.email@example.com" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Preferred Date & Time</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button type="button" className={cn("w-full border border-white rounded-lg px-3 py-2 text-left font-normal text-white bg-transparent flex items-center justify-between", !selectedDate && "text-gray-300")}>
                                    <span className="flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        {formatDateTime(selectedDate)}
                                    </span>
                                    <Clock className="h-4 w-4 opacity-50" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-4 bg-[#282828] border-white space-y-4">
                                <div>
                                    <h3 className="text-white font-medium mb-2">Select Date</h3>
                                    <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} disabled={(date) => date < new Date()} initialFocus className="bg-[#282828] text-white rounded-md border" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium mb-2">Select Time</h3>
                                    <select value={selectedTime} onChange={handleTimeChange} className="w-full border border-white rounded-lg px-3 py-2 text-white bg-[#282828] focus:outline-none focus:border-[#3CB371] transition-colors">
                                        {timeOptions.map((option) => (
                                            <option key={option.value} value={option.value} className="bg-[#282828] text-white">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </PopoverContent>
                        </Popover>
                        {errors.dateTime && <p className="text-red-400 text-xs mt-1">{errors.dateTime.message}</p>}
                    </div>
                </div>

                {/* Phone & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Phone Number</label>
                        <input {...register("phone")} type="tel" placeholder="(555) 123-4567" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Service Address</label>
                        <input {...register("address")} type="text" placeholder="123 Business Ave, Suite 100" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                </div>

                {/* Business Name & Property Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Business Name</label>
                        <input {...register("businessName")} type="text" placeholder="Your Business Inc." className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Property Size (sq.ft)</label>
                        <input {...register("propertySize")} type="number" placeholder="e.g., 1500" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.propertySize && <p className="text-red-400 text-xs mt-1">{errors.propertySize.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-white">Service Type</label>
                    <Select onValueChange={handleServiceSelect} value={currentServiceType || ""}>
                        <SelectTrigger className="w-full border border-white rounded-lg px-3 py-5 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors [&>span]:text-white">
                            <SelectValue placeholder={isServicesLoading ? "Loading services..." : "Select a service"}>{selectedService ? selectedService.title : ""}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-[#282828] border-white text-white max-h-60 overflow-y-auto">
                            {isServicesLoading ? (
                                <SelectItem value="loading" disabled className="text-center text-gray-400">
                                    Loading services...
                                </SelectItem>
                            ) : services.length === 0 ? (
                                <SelectItem value="no-services" disabled className="text-center text-gray-400">
                                    No services available
                                </SelectItem>
                            ) : (
                                services.map((service: any) => (
                                    <SelectItem key={service._id} value={service._id} className="focus:bg-[#3CB371]/20 focus:text-white cursor-pointer hover:bg-[#3CB371]/10">
                                        {service.title}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                    {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType.message}</p>}

                    {/* Show service description if a service is selected */}
                    {selectedService && <p className="text-gray-300 text-xs mt-1 italic">{selectedService.description}</p>}
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-white">Additional Notes</label>
                    <textarea {...register("notes")} rows={2} placeholder="Any special requirements, access instructions, or additional information..." className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors resize-none" />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading || isServicesLoading} className="w-full bg-[#3CB371] text-white py-2 rounded-lg font-semibold hover:bg-[#35a065] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? "Submitting..." : "Submit Quote Request"}
                </button>
            </form>
        </div>
    );
};

export default QuoteForm;

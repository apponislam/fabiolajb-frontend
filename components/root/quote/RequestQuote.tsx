"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BsSend } from "react-icons/bs";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useState } from "react";
import { useCreateQuoteMutation } from "@/redux/features/quote/quoteApi";
import { useGetActiveServicesQuery } from "@/redux/features/services/servicesApi";

const quoteSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    cleaningFrequency: z.string().min(1, "Cleaning frequency is required"),
    email: z.string().email("Invalid email address"),
    preferredDateTime: z.date().refine((date) => date !== undefined && date !== null, {
        message: "Preferred date and time is required",
    }),
    phoneNumber: z.string().min(1, "Phone number is required"),
    serviceAddress: z.string().min(1, "Service address is required"),
    businessName: z.string().optional(),
    propertySize: z.string().optional(),
    serviceType: z.string().min(1, "Service type is required"),
    additionalNotes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const RequestQuote = () => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState("9:00 AM");
    const [createQuote, { isLoading, isSuccess, error }] = useCreateQuoteMutation();

    // Fetch active services
    const { data: servicesData, isLoading: isServicesLoading } = useGetActiveServicesQuery(undefined);
    const services = servicesData?.data || [];

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteSchema),
    });

    const onSubmit = async (data: QuoteFormData) => {
        try {
            // Format data according to API requirements
            const formattedData = {
                fullName: data.fullName,
                email: data.email,
                phone: data.phoneNumber,
                serviceType: data.serviceType,
                cleaningFrequency: data.cleaningFrequency,
                preferredDateTime: data.preferredDateTime.toISOString(),
                serviceAddress: data.serviceAddress,
                propertySize: data.propertySize ? parseInt(data.propertySize) : 0,
                additionalNotes: data.additionalNotes || "",
                businessName: data.businessName || "",
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
            const [hours, minutes] = convertTimeStringTo24Hour(selectedTime);
            date.setHours(hours, minutes, 0, 0);
            setSelectedDate(date);
            setValue("preferredDateTime", date, { shouldValidate: true });
        }
    };

    const handleTimeChange = (time: string) => {
        setSelectedTime(time);
        if (selectedDate) {
            const [hours, minutes] = convertTimeStringTo24Hour(time);
            const updatedDate = new Date(selectedDate);
            updatedDate.setHours(hours, minutes, 0, 0);
            setValue("preferredDateTime", updatedDate, { shouldValidate: true });
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
        if (!date) return "When should we start?";
        return format(date, "MM/dd/yyyy hh:mm a");
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
    const timeOptions = Array.from({ length: 10 }, (_, i) => {
        const hour = 8 + i;
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour > 12 ? hour - 12 : hour;
        return {
            value: `${displayHour}:00 ${period}`,
            label: `${displayHour}:00 ${period}`,
        };
    });

    // Get current service type for Select value prop
    const currentServiceType = getValues("serviceType");

    return (
        <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-medium text-[#364153] mb-6">
                        <span className="text-[#3CB371]">Provide</span> your details and get a<br className="hidden xl:block" />
                        tailored quote
                        <span className="text-[#3CB371]"> instantly.</span>
                    </h1>
                    <p className="text-[14px] text-[#797979] mx-auto">
                        We&apos;re more than just a cleaning company – we&apos;re your partners in creating clean, <br className="hidden xl:block" /> healthy, and stress-free spaces where you can truly breathe easy.
                    </p>
                </div>

                {/* Success/Error Messages */}
                {isSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-center font-medium">Quote request submitted successfully!</p>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-center font-medium">Failed to submit quote. Please try again.</p>
                    </div>
                )}

                {/* Form Section */}
                <div className="container mx-auto">
                    <h2 className="text-2xl md:text-3xl font-medium text-[#5E5E5E] mb-8 text-center">Request a Quote</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {/* Full Name & Cleaning Frequency */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Full Name</label>
                                <input {...register("fullName")} type="text" placeholder="Enter your full name" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Cleaning Frequency</label>
                                <Select onValueChange={(value) => setValue("cleaningFrequency", value)}>
                                    <SelectTrigger className="w-full px-4 py-6 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent">
                                        <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-[#E5E7EB]">
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.cleaningFrequency && <p className="text-red-500 text-sm mt-1">{errors.cleaningFrequency.message}</p>}
                            </div>
                        </div>

                        {/* Email & Date/Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Email Address</label>
                                <input {...register("email")} type="email" placeholder="Enter your email address" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Preferred Date & Time</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button type="button" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-left bg-white focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent flex justify-between items-center">
                                            <span className="flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4" />
                                                {formatDateTime(selectedDate)}
                                            </span>
                                            <Clock className="h-4 w-4 opacity-50" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-4 bg-white border-[#E5E7EB] space-y-4">
                                        <div>
                                            <h3 className="text-[#364153] font-medium mb-2">Select Date</h3>
                                            <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} disabled={(date) => date < new Date()} initialFocus className="bg-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-[#364153] font-medium mb-2">Select Time</h3>
                                            <Select value={selectedTime} onValueChange={handleTimeChange}>
                                                <SelectTrigger className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent">
                                                    <SelectValue placeholder="Select time" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-[#E5E7EB]">
                                                    {timeOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                {errors.preferredDateTime && <p className="text-red-500 text-sm mt-1">{errors.preferredDateTime.message}</p>}
                            </div>
                        </div>

                        {/* Phone & Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Phone Number</label>
                                <input {...register("phoneNumber")} type="tel" placeholder="Enter your phone number" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Service Address</label>
                                <input {...register("serviceAddress")} type="text" placeholder="Enter your service address" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                                {errors.serviceAddress && <p className="text-red-500 text-sm mt-1">{errors.serviceAddress.message}</p>}
                            </div>
                        </div>

                        {/* Business Name & Property Size */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Business Name</label>
                                <input {...register("businessName")} type="text" placeholder="Enter your business name" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-[#364153] font-semibold mb-2">Property Size / Area (sq.ft)</label>
                                <input {...register("propertySize")} type="number" placeholder="1500" className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent" />
                            </div>
                        </div>

                        {/* Service Type - Updated to fetch from API */}
                        <div>
                            <label className="block text-[#364153] font-semibold mb-2">Service Type</label>
                            <Select onValueChange={handleServiceSelect} value={currentServiceType || ""}>
                                <SelectTrigger className="w-full px-4 py-6 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent">
                                    <SelectValue placeholder={isServicesLoading ? "Loading services..." : "What do you need cleaned?"}>{selectedService ? selectedService.title : ""}</SelectValue>
                                </SelectTrigger>
                                <SelectContent className="bg-white border-[#E5E7EB] max-h-60 overflow-y-auto">
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
                                            <SelectItem key={service._id} value={service._id}>
                                                {service.title}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>}

                            {/* Show service description if a service is selected */}
                            {selectedService && <p className="text-[#797979] text-sm mt-1 italic">{selectedService.description}</p>}
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-[#364153] font-semibold mb-2">Additional Notes</label>
                            <textarea {...register("additionalNotes")} placeholder="Anything we should know? (Access details, priorities, special requests)" rows={2} className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB371] focus:border-transparent resize-none" />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" disabled={isLoading || isServicesLoading} className="w-full bg-[#3CB371] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#2E8B57] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? "Submitting..." : "Submit Quote Request"} <BsSend />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestQuote;

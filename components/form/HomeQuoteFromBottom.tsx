"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateQuoteMutation } from "@/redux/features/quote/quoteApi";
import { useGetActiveServicesQuery } from "@/redux/features/services/servicesApi";

// Zod validation schema
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

const HomeQuoteFromBottom = () => {
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
            const [hours, minutes] = convertTimeStringTo24Hour(selectedTime);
            date.setHours(hours, minutes, 0, 0);
            setSelectedDate(date);
            setValue("dateTime", date, { shouldValidate: true });
        }
    };

    const handleTimeChange = (time: string) => {
        setSelectedTime(time);
        if (selectedDate) {
            const [hours, minutes] = convertTimeStringTo24Hour(time);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Success/Error Messages */}
            {isSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p className="text-green-700 text-center">Quote request submitted successfully!</p>
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-lg">
                    <p className="text-red-700 text-center">Failed to submit quote. Please try again.</p>
                </div>
            )}

            {/* Full Name & Cleaning Frequency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
                    <input {...register("fullName")} type="text" placeholder="Enter your full name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Cleaning Frequency</label>
                    <Select onValueChange={(value) => setValue("frequency", value)}>
                        <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-5 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors">
                            <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300">
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.frequency && <p className="text-red-600 text-xs mt-1">{errors.frequency.message}</p>}
                </div>
            </div>

            {/* Email & Date/Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
                    <input {...register("email")} type="email" placeholder="Enter your email address" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Preferred Date & Time</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button type="button" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-left text-gray-700 bg-white focus:outline-none focus:border-[#3CB371] transition-colors flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    {formatDateTime(selectedDate)}
                                </span>
                                <Clock className="h-4 w-4 opacity-50" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4 bg-white border-gray-300 space-y-4">
                            <div>
                                <h3 className="text-gray-700 font-medium mb-2">Select Date</h3>
                                <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} disabled={(date) => date < new Date()} initialFocus className="bg-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-700 font-medium mb-2">Select Time</h3>
                                <Select value={selectedTime} onValueChange={handleTimeChange}>
                                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-[#3CB371] transition-colors">
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-300">
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
                    {errors.dateTime && <p className="text-red-600 text-xs mt-1">{errors.dateTime.message}</p>}
                </div>
            </div>

            {/* Phone & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
                    <input {...register("phone")} type="tel" placeholder="Enter your phone number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Service Address</label>
                    <input {...register("address")} type="text" placeholder="Enter your service address" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>}
                </div>
            </div>

            {/* Business Name & Property Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Business Name</label>
                    <input {...register("businessName")} type="text" placeholder="Enter your business name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.businessName && <p className="text-red-600 text-xs mt-1">{errors.businessName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Property Size / Area (sq.ft)</label>
                    <input {...register("propertySize")} type="number" placeholder="e.g., 1500" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.propertySize && <p className="text-red-600 text-xs mt-1">{errors.propertySize.message}</p>}
                </div>
            </div>

            {/* Service Type - Updated to fetch from API */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Service Type</label>
                <Select onValueChange={handleServiceSelect} value={currentServiceType || ""}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-5 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors">
                        <SelectValue placeholder={isServicesLoading ? "Loading services..." : "What do you need cleaned?"}>{selectedService ? selectedService.title : ""}</SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 max-h-60 overflow-y-auto">
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
                {errors.serviceType && <p className="text-red-600 text-xs mt-1">{errors.serviceType.message}</p>}

                {/* Show service description if a service is selected */}
                {selectedService && <p className="text-gray-500 text-xs mt-1 italic">{selectedService.description}</p>}
            </div>

            {/* Additional Notes */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Additional Notes</label>
                <textarea {...register("notes")} rows={2} placeholder="Anything we should know? (Access details, priorities, special requests)" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors resize-none" />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading || isServicesLoading} className="w-full bg-[#3CB371] text-white py-2 rounded-lg font-semibold hover:bg-[#35a065] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? "Submitting..." : "Talk to a Cleaning Expert"}
            </button>
        </form>
    );
};

export default HomeQuoteFromBottom;

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteFormSchema),
    });

    const onSubmit = (data: QuoteFormData) => {
        console.log(data);
        // Handle form submission
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
        if (!date) return "mm/dd/yyyy --:-- --";
        return format(date, "MM/dd/yyyy hh:mm a");
    };

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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                    <input {...register("email")} type="email" placeholder="your.email@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
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
                    <input {...register("phone")} type="tel" placeholder="(555) 123-4567" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Service Address</label>
                    <input {...register("address")} type="text" placeholder="123 Business Ave, Suite 100" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>}
                </div>
            </div>

            {/* Business Name & Property Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Business Name</label>
                    <input {...register("businessName")} type="text" placeholder="Your Business Inc." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.businessName && <p className="text-red-600 text-xs mt-1">{errors.businessName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Property Size / Area (sq.ft)</label>
                    <input {...register("propertySize")} type="text" placeholder="e.g., 1500" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                    {errors.propertySize && <p className="text-red-600 text-xs mt-1">{errors.propertySize.message}</p>}
                </div>
            </div>

            {/* Service Type */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Service Type</label>
                <Select onValueChange={(value) => setValue("serviceType", value)}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-5 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors">
                        <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="house">House Cleaning</SelectItem>
                        <SelectItem value="office">Office Cleaning</SelectItem>
                        <SelectItem value="kitchen">Kitchen Cleaning</SelectItem>
                        <SelectItem value="washroom">Washroom Cleaning</SelectItem>
                    </SelectContent>
                </Select>
                {errors.serviceType && <p className="text-red-600 text-xs mt-1">{errors.serviceType.message}</p>}
            </div>

            {/* Additional Notes */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Additional Notes</label>
                <textarea {...register("notes")} rows={2} placeholder="Any special requirements or additional information..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors resize-none" />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-[#3CB371] text-white py-2 rounded-lg font-semibold hover:bg-[#35a065] transition-colors">
                Submit Quote Request
            </button>
        </form>
    );
};

export default HomeQuoteFromBottom;

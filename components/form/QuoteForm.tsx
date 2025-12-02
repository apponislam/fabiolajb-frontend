"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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

const QuoteForm = () => {
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
        <div className="bg-[#FFFFFF1A] backdrop-blur-sm rounded-2xl p-6 border border-[#FFFFFF] mt-4 md:mt-30">
            <h2 className="text-xl font-bold mb-4 text-center text-white">Request a Quote</h2>

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
                        <input {...register("propertySize")} type="text" placeholder="e.g., 1500" className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors" />
                        {errors.propertySize && <p className="text-red-400 text-xs mt-1">{errors.propertySize.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-white">Service Type</label>
                    <Select onValueChange={(value) => setValue("serviceType", value)}>
                        <SelectTrigger className="w-full border border-white rounded-lg px-3 py-5 text-white placeholder-white focus:outline-none focus:border-[#3CB371] transition-colors [&>span]:text-white">
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#282828] border-white text-white">
                            <SelectItem value="house" className="focus:bg-[#3CB371]/20 focus:text-white cursor-pointer">
                                House Cleaning
                            </SelectItem>
                            <SelectItem value="office" className="focus:bg-[#3CB371]/20 focus:text-white cursor-pointer">
                                Office Cleaning
                            </SelectItem>
                            <SelectItem value="kitchen" className="focus:bg-[#3CB371]/20 focus:text-white cursor-pointer">
                                Kitchen Cleaning
                            </SelectItem>
                            <SelectItem value="washroom" className="focus:bg-[#3CB371]/20 focus:text-white cursor-pointer">
                                Washroom Cleaning
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType.message}</p>}
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-white">Additional Notes</label>
                    <textarea {...register("notes")} rows={2} placeholder="Any special requirements, access instructions, or additional information..." className="w-full border border-white rounded-lg px-3 py-2 text-white bg-transparent placeholder-gray-300 focus:outline-none focus:border-[#3CB371] transition-colors resize-none" />
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

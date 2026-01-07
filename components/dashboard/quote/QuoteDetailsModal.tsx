"use client";

import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface QuoteData {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    serviceType: {
        _id: string;
        title: string;
        description: string;
        price: number;
        image: string;
    };
    cleaningFrequency: string;
    preferredDateTime: string;
    serviceAddress: string;
    propertySize: number;
    additionalNotes: string;
    cleaner: string[];
    status: string;
    createdAt: string;
    businessName?: string;
}

interface InvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    quoteData?: QuoteData | null;
}

export function InvoiceModal({ isOpen, onClose, quoteData }: InvoiceModalProps) {
    if (!quoteData) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md">
                    <div className="text-center py-8 text-gray-500">No quote data available</div>
                </DialogContent>
            </Dialog>
        );
    }

    // Format the data for display
    const formattedData = {
        amount: `$${quoteData.serviceType?.price || 0}`,
        date: new Date(quoteData.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }),
        fullName: quoteData.fullName,
        email: quoteData.email,
        phone: quoteData.phone,
        serviceAddress: quoteData.serviceAddress,
        serviceType: quoteData.serviceType?.title || "N/A",
        serviceDescription: quoteData.serviceType?.description || "No description",
        frequency: quoteData.cleaningFrequency,
        preferredDate: new Date(quoteData.preferredDateTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }),
        preferredTime: new Date(quoteData.preferredDateTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
        propertySize: `${quoteData.propertySize} sq ft`,
        notes: quoteData.additionalNotes || "No additional notes",
        status: quoteData.status === "paymentCompleted" ? "Payment Completed" : quoteData.status === "pending" ? "Pending" : quoteData.status.charAt(0).toUpperCase() + quoteData.status.slice(1),
        businessName: quoteData.businessName || "N/A",
    };

    const displayData = [
        { label: "Customer Name", value: formattedData.fullName },
        { label: "Email", value: formattedData.email },
        { label: "Phone", value: formattedData.phone },
        { label: "Business Name", value: formattedData.businessName },
        { label: "Service Address", value: formattedData.serviceAddress },
        { label: "Service Type", value: formattedData.serviceType },
        { label: "Service Description", value: formattedData.serviceDescription },
        { label: "Cleaning Frequency", value: formattedData.frequency },
        { label: "Preferred Date", value: formattedData.preferredDate },
        { label: "Preferred Time", value: formattedData.preferredTime },
        { label: "Property Size", value: formattedData.propertySize },
        { label: "Status", value: formattedData.status },
        { label: "Additional Notes", value: formattedData.notes },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <div className="space-y-4 relative">
                    {/* Amount and Date */}
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-1">{formattedData.amount}</h1>
                        <p className="text-muted-foreground text-sm">Created on {formattedData.date}</p>
                    </div>

                    {/* Payment Image - Absolute positioned */}
                    <Image src="/payment.svg" alt="Payment" height={132} width={200} className="absolute top-0 right-0 w-24" />

                    {/* Invoice Details - Reduced gap */}
                    <div className="space-y-1 pt-2">
                        {displayData.map((item) => (
                            <div key={item.label} className="flex py-1">
                                <span className="text-[#797979] font-medium capitalize min-w-44">{item.label}:</span>
                                <span className={`text-[#797979] font-medium flex-1 ${item.label === "Additional Notes" || item.label === "Service Description" ? "wrap-break-word leading-relaxed" : ""}`}>{item.value}</span>
                            </div>
                        ))}

                        {/* Cleaners as Badges */}
                        <div className="flex py-1">
                            <span className="text-[#797979] font-medium capitalize min-w-44">Cleaners:</span>
                            <div className="flex-1 flex flex-wrap gap-1">
                                {quoteData.cleaner && quoteData.cleaner.length > 0 ? (
                                    quoteData.cleaner.map((cleaner, index) => (
                                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                            {cleaner}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-[#797979] font-medium">No cleaner assigned</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

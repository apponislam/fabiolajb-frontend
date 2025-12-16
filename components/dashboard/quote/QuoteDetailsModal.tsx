// "use client";

// import Image from "next/image";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// interface InvoiceModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// export function InvoiceModal({ isOpen, onClose }: InvoiceModalProps) {
//     const invoiceData = {
//         amount: "$214.24",
//         date: "Nov 10, 2025",
//         to: "Ibrahim",
//         from: "Johan Doe",
//         phone: "+88 01847250851",
//         address: "Dhaka, Bangladesh",
//         businessName: "Spark Tech Agency",
//         frequency: "1 Day",
//         type: "Office",
//         area: "1020sq",
//         dateTime: "10-11-2025",
//         note: "I need a cleaner for cleaning my office space",
//     };

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="sm:max-w-md">
//                 <DialogTitle></DialogTitle>
//                 <div className="space-y-6 relative">
//                     <div>
//                         <h1 className="text-4xl font-bold text-foreground mb-2 ">{invoiceData.amount}</h1>
//                         <p className="text-muted-foreground text-sm">{invoiceData.date}</p>
//                     </div>

//                     <Image src="/payment.svg" alt="Payment" height={132} width={200} className="absolute top-0 right-0 w-28"></Image>

//                     <div className="space-y-2">
//                         {Object.entries(invoiceData).map(([key, value]) => {
//                             if (key === "amount" || key === "date") return null;
//                             return (
//                                 <div key={key} className="flex">
//                                     <span className=" text-[#797979] font-medium capitalize w-40">{key.replace(/([A-Z])/g, " $1")}:</span>
//                                     <span className={`text-[#797979] font-bold ${key === "note" ? "wrap-break-word" : ""}`}>{value}</span>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }

"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
    cleaner: any[];
    status: string;
    createdAt: string;
    updatedAt: string;
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
                    <DialogTitle>Quote Details</DialogTitle>
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
        cleaners: quoteData.cleaner?.length > 0 ? `${quoteData.cleaner.length} cleaner(s) assigned` : "No cleaner assigned",
        lastUpdated: new Date(quoteData.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }),
    };

    const displayData = [
        { label: "Customer Name", value: formattedData.fullName },
        { label: "Email", value: formattedData.email },
        { label: "Phone", value: formattedData.phone },
        { label: "Service Address", value: formattedData.serviceAddress },
        { label: "Service Type", value: formattedData.serviceType },
        { label: "Service Description", value: formattedData.serviceDescription },
        { label: "Cleaning Frequency", value: formattedData.frequency },
        { label: "Preferred Date", value: formattedData.preferredDate },
        { label: "Preferred Time", value: formattedData.preferredTime },
        { label: "Property Size", value: formattedData.propertySize },
        { label: "Status", value: formattedData.status },
        { label: "Cleaners Assigned", value: formattedData.cleaners },
        { label: "Last Updated", value: formattedData.lastUpdated },
        { label: "Additional Notes", value: formattedData.notes },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogTitle className="text-xl font-semibold">Quote Details</DialogTitle>
                <div className="space-y-6 relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">{formattedData.amount}</h1>
                            <p className="text-muted-foreground text-sm">Created on {formattedData.date}</p>
                        </div>
                        <Image src="/payment.svg" alt="Payment" height={132} width={200} className="w-24" />
                    </div>

                    <div className="space-y-4 pt-4">
                        {displayData.map((item) => (
                            <div key={item.label} className="flex flex-col sm:flex-row sm:items-start gap-1">
                                <span className="text-[#797979] font-medium capitalize min-w-48 mb-1 sm:mb-0">{item.label}:</span>
                                <span className={`text-[#797979] font-medium flex-1 ${item.label === "Additional Notes" || item.label === "Service Description" ? "wrap-break-word leading-relaxed" : ""}`}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

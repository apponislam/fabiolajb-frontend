"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface InvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function InvoiceModal({ isOpen, onClose }: InvoiceModalProps) {
    const invoiceData = {
        amount: "$214.24",
        date: "Nov 10, 2025",
        to: "Ibrahim",
        from: "Johan Doe",
        phone: "+88 01847250851",
        address: "Dhaka, Bangladesh",
        businessName: "Spark Tech Agency",
        frequency: "1 Day",
        type: "Office",
        area: "1020sq",
        dateTime: "10-11-2025",
        note: "I need a cleaner for cleaning my office space",
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogTitle></DialogTitle>
                <div className="space-y-6 relative">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2 ">{invoiceData.amount}</h1>
                        <p className="text-muted-foreground text-sm">{invoiceData.date}</p>
                    </div>

                    <Image src="/payment.svg" alt="Payment" height={132} width={200} className="absolute top-0 right-0 w-28"></Image>

                    <div className="space-y-2">
                        {Object.entries(invoiceData).map(([key, value]) => {
                            if (key === "amount" || key === "date") return null;
                            return (
                                <div key={key} className="flex">
                                    <span className=" text-[#797979] font-medium capitalize w-40">{key.replace(/([A-Z])/g, " $1")}:</span>
                                    <span className={`text-[#797979] font-bold ${key === "note" ? "wrap-break-word" : ""}`}>{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

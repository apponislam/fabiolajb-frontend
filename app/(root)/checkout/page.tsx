import { InvoicePreview } from "@/components/root/checkout/InVoicePreviw";
import { PaymentForm } from "@/components/root/checkout/PaymentForm";
import React from "react";

const page = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4 md:p-0 lg:p-12 container mx-auto">
            <InvoicePreview />
            <PaymentForm />
        </div>
    );
};

export default page;

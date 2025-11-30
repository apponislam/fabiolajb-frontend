import { TransactionTable } from "@/components/dashboard/payment/paymentTable";
import React from "react";

const page = () => {
    return (
        <div className="p-4 md:p-6">
            <TransactionTable></TransactionTable>
        </div>
    );
};

export default page;

// import Image from "next/image";

// export function InvoicePreview() {
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
//         <div className="flex flex-col justify-start">
//             <div className="space-y-6 relative">
//                 {/* Amount and Date */}
//                 <div>
//                     <h1 className="text-4xl font-bold text-foreground mb-2 ">{invoiceData.amount}</h1>
//                     <p className="text-muted-foreground text-sm">{invoiceData.date}</p>
//                 </div>

//                 <Image src="/payment.svg" alt="Payment" height={132} width={200} className="absolute top-0 right-0 w-28"></Image>

//                 {/* Invoice Details */}
//                 <div className="space-y-2">
//                     {Object.entries(invoiceData).map(([key, value]) => {
//                         if (key === "amount" || key === "date") return null; // skip amount/date
//                         return (
//                             <div key={key} className="flex">
//                                 <span className=" text-[#797979] font-medium capitalize w-40">{key.replace(/([A-Z])/g, " $1")}:</span>

//                                 <span className={`text-[#797979] font-bold ${key === "note" ? "whitespace-nowrap overflow-hidden overflow-ellipsis" : ""}`}>{value}</span>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useGetQuoteByIdQuery } from "@/redux/features/quote/quoteApi";
import { useCreateCheckoutSessionMutation } from "@/redux/features/payment/paymentApi";

export function InvoicePreview() {
    const searchParams = useSearchParams();
    const quoteId = searchParams.get("quoteId");

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    // Fetch quote data
    const {
        data: quoteData,
        isLoading,
        error,
    } = useGetQuoteByIdQuery(quoteId || "", {
        skip: !quoteId,
    });

    console.log(quoteData);

    // Create checkout session MUTATION
    const [createCheckoutSession, { isLoading: isCreatingSession }] = useCreateCheckoutSessionMutation();

    const handlePayNow = async () => {
        if (!quoteId) {
            setPaymentError("Invalid quote ID. Please check your payment link.");
            return;
        }

        // Reset previous errors
        setPaymentError(null);
        setIsProcessingPayment(true);

        try {
            // Create checkout session using mutation
            const result = await createCheckoutSession(quoteId).unwrap();

            // Check if we got a URL to redirect to
            if (result?.url) {
                window.location.href = result.url;
            } else {
                setPaymentError("No payment URL received. Please try again.");
                setIsProcessingPayment(false);
            }
        } catch (err: any) {
            console.error("Payment error:", err);

            // Extract error message from the error object
            let errorMessage = "Payment processing failed. Please try again.";

            if (err && typeof err === "object") {
                // Check if it's the Stripe webhook secret error
                if ("data" in err && err.data) {
                    const errorData = err.data as any;
                    if (errorData.message?.includes("Invalid API Key provided")) {
                        errorMessage = "Payment service is currently unavailable. Please contact support.";
                    } else if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                } else if ("message" in err && err.message) {
                    errorMessage = err.message;
                }
            }

            setPaymentError(errorMessage);
            setIsProcessingPayment(false);
        }
    };

    // If no quoteId in URL
    if (!quoteId) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">No quote ID provided in URL.</p>
                <p className="text-gray-600 mt-2">Please check your payment link.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3CB371]"></div>
                <span className="ml-3 text-gray-600 mt-4">Loading invoice...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Failed to load invoice. Please try again.</p>
                <p className="text-gray-600 mt-2">Quote ID: {quoteId}</p>
            </div>
        );
    }

    const quote = quoteData?.data;
    if (!quote) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Invoice not found for Quote ID: {quoteId}</p>
            </div>
        );
    }

    // Format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Format the date time
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    // Prepare invoice data from quote
    const invoiceData = {
        amount: `$${quote.serviceType?.price || 0}`,
        date: formatDate(quote.createdAt),
        to: quote.fullName,
        from: "FabiolaJB Cleaning",
        phone: quote.phone,
        address: quote.serviceAddress,
        businessName: quote.businessName,
        frequency: quote.cleaningFrequency,
        type: quote.serviceType?.title || "N/A",
        area: `${quote.propertySize} sq.ft`,
        dateTime: formatDateTime(quote.preferredDateTime),
        note: quote.additionalNotes || "No additional notes",
        status: quote.status,
        service: quote.serviceType?.title || "N/A",
        serviceDescription: quote.serviceType?.description || "",
        email: quote.email,
    };

    const displayFields = [
        { key: "to", label: "Client Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "address", label: "Address" },
        { key: "businessName", label: "Business Name" },
        { key: "frequency", label: "Frequency" },
        { key: "type", label: "Service Type" },
        { key: "area", label: "Property Size" },
        { key: "dateTime", label: "Preferred Date & Time" },
        { key: "note", label: "Additional Notes" },
        { key: "status", label: "Status" },
    ];

    // Check if payment is already completed
    const isAlreadyPaid = invoiceData.status === "paymentCompleted";
    const canMakePayment = !isAlreadyPaid && invoiceData.status === "paymentMailSended";

    return (
        <div className="flex flex-col justify-start">
            <div className="space-y-6 relative">
                {/* Amount and Date */}
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{invoiceData.amount}</h1>
                    <p className="text-muted-foreground text-sm">Invoice Date: {invoiceData.date}</p>
                    <p className="text-muted-foreground text-sm">Quote ID: {quoteId}</p>
                </div>

                <Image src="/payment.svg" alt="Payment" height={132} width={200} className="absolute top-0 right-0 w-28" />

                {/* Invoice Details */}
                <div className="space-y-4 pt-4">
                    {/* Service Information */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Information</h3>
                        <div className="flex">
                            <span className="text-[#797979] font-medium w-40">Service:</span>
                            <span className="text-[#797979] font-bold">{invoiceData.service}</span>
                        </div>
                        <div className="flex">
                            <span className="text-[#797979] font-medium w-40">Description:</span>
                            <span className="text-[#797979]">{invoiceData.serviceDescription}</span>
                        </div>
                    </div>

                    {/* Client Information */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Client Information</h3>
                        {displayFields.map((field) => (
                            <div key={field.key} className="flex py-1">
                                <span className="text-[#797979] font-medium capitalize w-40">{field.label}:</span>
                                <span className={`text-[#797979] ${field.key === "note" ? "whitespace-normal overflow-hidden overflow-ellipsis" : ""}`}>{invoiceData[field.key as keyof typeof invoiceData]}</span>
                            </div>
                        ))}
                    </div>

                    {/* Total Amount */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Total Amount</p>
                                <p className="text-sm text-gray-600">Including all applicable taxes</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-[#3CB371]">{invoiceData.amount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pay Now Button */}
            <div className="mt-8 pt-6 border-t">
                {/* Payment Error Message */}
                {paymentError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-center font-medium">{paymentError}</p>
                        <p className="text-red-600 text-sm text-center mt-1">Please contact support if the issue persists.</p>
                    </div>
                )}

                <button onClick={handlePayNow} disabled={isProcessingPayment || isCreatingSession || isAlreadyPaid || !canMakePayment} className="w-full bg-[#3CB371] hover:bg-[#35a065] text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isProcessingPayment || isCreatingSession ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Processing payment...
                        </>
                    ) : isAlreadyPaid ? (
                        "Already Paid"
                    ) : !canMakePayment ? (
                        "Awaiting Payment Setup"
                    ) : (
                        "Pay Now"
                    )}
                </button>

                {/* Status message */}
                {invoiceData.status && (
                    <div className={`mt-4 p-3 rounded-lg text-center ${invoiceData.status === "paid" ? "bg-green-50 text-green-700 border border-green-200" : invoiceData.status === "paymentMailSended" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`}>
                        <p className="font-medium">Status: {invoiceData.status.replace(/([A-Z])/g, " $1").toLowerCase()}</p>
                        {invoiceData.status === "paymentMailSended" && <p className="text-sm mt-1">Payment link has been sent. You can also pay here.</p>}
                        {invoiceData.status !== "paymentMailSended" && invoiceData.status !== "paid" && <p className="text-sm mt-1">Please contact support to complete your payment.</p>}
                    </div>
                )}

                {/* Contact support information */}
                {/* {(paymentError || invoiceData.status !== "paymentMailSended") && (
                    <div className="mt-4 text-center">
                        <p className="text-gray-600 mb-2">Need help with payment?</p>
                        <a href="mailto:support@fabiolajb.com" className="text-[#3CB371] font-medium hover:underline">
                            Contact Support
                        </a>
                    </div>
                )} */}

                {/* Payment security note */}
                {/* <div className="mt-4 text-center text-sm text-gray-500">
                    <p>🔒 Secure payment powered by Stripe</p>
                    <p className="mt-1">You will be redirected to a secure checkout page</p>
                </div> */}
            </div>
        </div>
    );
}

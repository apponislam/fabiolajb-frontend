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

import Image from "next/image";

//     return (
//         <div className="flex flex-col justify-start">
//             <div className="space-y-6">
//                 {/* Amount and Date */}
//                 <div>
//                     <h1 className="text-4xl font-bold text-foreground mb-2">{invoiceData.amount}</h1>
//                     <p className="text-muted-foreground text-sm">{invoiceData.date}</p>
//                 </div>

//                 {/* Invoice Details */}
//                 <div className="space-y-4">
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">To</span>
//                         <span className="text-foreground font-medium">{invoiceData.to}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">From</span>
//                         <span className="text-foreground font-medium">{invoiceData.from}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">Phone</span>
//                         <span className="text-foreground font-medium">{invoiceData.phone}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">Address</span>
//                         <span className="text-foreground font-medium">{invoiceData.address}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">Business.N</span>
//                         <span className="text-foreground font-medium">{invoiceData.businessName}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">Frequency</span>
//                         <span className="text-foreground font-medium">{invoiceData.frequency}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">Type</span>
//                         <span className="text-foreground font-medium">{invoiceData.type}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">Size/Area (Sq.Ft)</span>
//                         <span className="text-foreground font-medium">{invoiceData.area}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">Date & Time</span>
//                         <span className="text-foreground font-medium">{invoiceData.dateTime}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-muted-foreground font-medium">Note</span>
//                         <span className="text-foreground font-medium text-right max-w-xs">{invoiceData.note}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export function InvoicePreview() {
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
        <div className="flex flex-col justify-start">
            <div className="space-y-6 relative">
                {/* Amount and Date */}
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2 ">{invoiceData.amount}</h1>
                    <p className="text-muted-foreground text-sm">{invoiceData.date}</p>
                </div>

                <Image src="/payment.png" alt="Payment" height={132} width={200} className="absolute top-0 right-0 w-28"></Image>

                {/* Invoice Details */}
                <div className="space-y-2">
                    {Object.entries(invoiceData).map(([key, value]) => {
                        if (key === "amount" || key === "date") return null; // skip amount/date
                        return (
                            <div key={key} className="flex">
                                <span className=" text-[#797979] font-medium capitalize w-40">{key.replace(/([A-Z])/g, " $1")}:</span>

                                <span className={`text-[#797979] font-bold ${key === "note" ? "whitespace-nowrap overflow-hidden overflow-ellipsis" : ""}`}>{value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

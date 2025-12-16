// import React from "react";
// import { BsChatQuote } from "react-icons/bs";
// import { RiServiceLine } from "react-icons/ri";
// import { SlWallet } from "react-icons/sl";

// const QuoteCard = () => {
//     const cardData = [
//         {
//             title: "Quote Request",
//             value: "7265",
//             icon: <BsChatQuote className="w-6 h-6 text-blue-600" />,
//             bgColor: "bg-blue-100",
//         },
//         {
//             title: "Approve Quote",
//             value: "361",
//             icon: <BsChatQuote className="w-6 h-6 text-green-600" />,
//             bgColor: "bg-green-100",
//         },
//         {
//             title: "Complete Service",
//             value: "25",
//             icon: <RiServiceLine className="w-6 h-6 text-purple-600" />,
//             bgColor: "bg-purple-100",
//         },
//         {
//             title: "Total Payment",
//             value: "$00",
//             icon: <SlWallet className="w-6 h-6 text-orange-600" />,
//             bgColor: "bg-orange-100",
//         },
//     ];

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//             {cardData.map((card, index) => (
//                 <div key={index} className="bg-white rounded-lg border border-[#EFEFEF] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm">{card.title}</p>
//                             <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
//                         </div>
//                         <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>{card.icon}</div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default QuoteCard;

"use client";

import React from "react";
import { BsChatQuote } from "react-icons/bs";
import { RiServiceLine } from "react-icons/ri";
import { SlWallet } from "react-icons/sl";
import { useGetDashboardStatisticsQuery } from "@/redux/features/dashboard/dashboardApi";

const QuoteCard = () => {
    const { data, isLoading, error } = useGetDashboardStatisticsQuery(undefined);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg border border-[#EFEFEF] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] animate-pulse">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-16 mt-2"></div>
                            </div>
                            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error || !data?.data) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg border border-[#EFEFEF] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <p className="text-red-500">Error loading data</p>
                </div>
            </div>
        );
    }

    const stats = data.data;

    const cardData = [
        {
            title: "Quote Request",
            value: stats.totalQuotes?.toString() || "0",
            icon: <BsChatQuote className="w-6 h-6 text-blue-600" />,
            bgColor: "bg-blue-100",
        },
        {
            title: "Approve Quote",
            value: stats.totalApprovedQuotes?.toString() || "0",
            icon: <BsChatQuote className="w-6 h-6 text-green-600" />,
            bgColor: "bg-green-100",
        },
        {
            title: "Complete Service",
            value: stats.totalCompletedServices?.toString() || "0",
            icon: <RiServiceLine className="w-6 h-6 text-purple-600" />,
            bgColor: "bg-purple-100",
        },
        {
            title: "Total Payment",
            value: `$${stats.totalPayment || "0"}`,
            icon: <SlWallet className="w-6 h-6 text-orange-600" />,
            bgColor: "bg-orange-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {cardData.map((card, index) => (
                <div key={index} className="bg-white rounded-lg border border-[#EFEFEF] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm">{card.title}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                        </div>
                        <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>{card.icon}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuoteCard;

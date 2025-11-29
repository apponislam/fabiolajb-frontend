import React from "react";
import { BsChatQuote } from "react-icons/bs";
import { RiServiceLine } from "react-icons/ri";
import { SlWallet } from "react-icons/sl";

const QuoteCard = () => {
    const cardData = [
        {
            title: "Quote Request",
            value: "7265",
            icon: <BsChatQuote className="w-6 h-6 text-blue-600" />,
            bgColor: "bg-blue-100",
        },
        {
            title: "Approve Quote",
            value: "361",
            icon: <BsChatQuote className="w-6 h-6 text-green-600" />,
            bgColor: "bg-green-100",
        },
        {
            title: "Complete Service",
            value: "25",
            icon: <RiServiceLine className="w-6 h-6 text-purple-600" />,
            bgColor: "bg-purple-100",
        },
        {
            title: "Total Payment",
            value: "$00",
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

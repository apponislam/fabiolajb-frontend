// // "use client";

// // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // interface QuoteData {
// //     month: string;
// //     quotes: number;
// // }

// // const data: QuoteData[] = [
// //     { month: "Jan", quotes: 16000 },
// //     { month: "Feb", quotes: 28000 },
// //     { month: "Mar", quotes: 20000 },
// //     { month: "Apr", quotes: 30000 },
// //     { month: "May", quotes: 12000 },
// //     { month: "Jun", quotes: 25000 },
// //     { month: "Jul", quotes: 18000 },
// //     { month: "Aug", quotes: 32000 },
// //     { month: "Sep", quotes: 22000 },
// //     { month: "Oct", quotes: 35000 },
// //     { month: "Nov", quotes: 28000 },
// //     { month: "Dec", quotes: 40000 },
// // ];

// // export function MonthlyQuoteChart() {
// //     // Function to determine bar color based on value
// //     const getBarColor = (quotes: number) => {
// //         const average = data.reduce((sum, item) => sum + item.quotes, 0) / data.length;
// //         return quotes >= average ? "#71C797" : "#9EA9B8"; // Green for above average, grey for below
// //     };

// //     return (
// //         <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] pb-0!">
// //             <CardHeader className="pb-4">
// //                 <CardTitle className="text-lg font-semibold">Quote Overview</CardTitle>
// //             </CardHeader>
// //             <CardContent className="pl-0">
// //                 <ResponsiveContainer width="100%" height={300}>
// //                     <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
// //                         <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
// //                         <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
// //                         <Tooltip
// //                             contentStyle={{
// //                                 backgroundColor: "#FFFFFF",
// //                                 border: "1px solid #E5E7EB",
// //                                 borderRadius: "6px",
// //                                 boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
// //                             }}
// //                             formatter={(value) => [`${value.toLocaleString()} quotes`, "Quotes"]}
// //                             labelFormatter={(label) => `Month: ${label}`}
// //                         />
// //                         <Bar dataKey="quotes" radius={[8, 8, 0, 0]} barSize={28}>
// //                             {data.map((entry, index) => (
// //                                 <Cell key={`cell-${index}`} fill={getBarColor(entry.quotes)} />
// //                             ))}
// //                         </Bar>
// //                     </BarChart>
// //                 </ResponsiveContainer>
// //             </CardContent>
// //         </Card>
// //     );
// // }

// "use client";

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface QuoteData {
//     month: string;
//     quotes: number;
// }

// const data: QuoteData[] = [
//     { month: "Jan", quotes: 16000 },
//     { month: "Feb", quotes: 28000 },
//     { month: "Mar", quotes: 20000 },
//     { month: "Apr", quotes: 30000 },
//     { month: "May", quotes: 12000 },
//     { month: "Jun", quotes: 25000 },
//     { month: "Jul", quotes: 18000 },
//     { month: "Aug", quotes: 32000 },
//     { month: "Sep", quotes: 22000 },
//     { month: "Oct", quotes: 35000 },
//     { month: "Nov", quotes: 28000 },
//     { month: "Dec", quotes: 40000 },
// ];

// export function MonthlyQuoteChart() {
//     // Function to determine bar color based on value
//     const getBarColor = (quotes: number) => {
//         const average = data.reduce((sum, item) => sum + item.quotes, 0) / data.length;
//         return quotes >= average ? "#71C797" : "#9EA9B8"; // Green for above average, grey for below
//     };

//     return (
//         <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] justify-between!">
//             <CardHeader className="pb-4">
//                 <CardTitle className="text-lg font-semibold">Quote Overview</CardTitle>
//             </CardHeader>
//             <CardContent className="pl-0 pb-0">
//                 <ResponsiveContainer width="100%" height={250}>
//                     <BarChart
//                         data={data}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }} // Reduced bottom margin
//                     >
//                         <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
//                         <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: "#FFFFFF",
//                                 border: "1px solid #E5E7EB",
//                                 borderRadius: "6px",
//                                 boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
//                             }}
//                             formatter={(value) => [`${value.toLocaleString()} quotes`, "Quotes"]}
//                             labelFormatter={(label) => `Month: ${label}`}
//                         />
//                         <Bar dataKey="quotes" radius={[8, 8, 0, 0]} barSize={28}>
//                             {data.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={getBarColor(entry.quotes)} />
//                             ))}
//                         </Bar>
//                     </BarChart>
//                 </ResponsiveContainer>
//             </CardContent>
//         </Card>
//     );
// }

"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardStatisticsQuery } from "@/redux/features/dashboard/dashboardApi";

interface QuoteData {
    month: string;
    quotes: number;
}

export function MonthlyQuoteChart() {
    const { data, isLoading, error } = useGetDashboardStatisticsQuery(undefined);

    if (isLoading) {
        return (
            <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Quote Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-0 h-[250px] flex items-center justify-center">
                    <div className="text-gray-500">Loading quote data...</div>
                </CardContent>
            </Card>
        );
    }

    if (error || !data?.data?.monthlyQuotesData) {
        return (
            <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Quote Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-0 h-[250px] flex items-center justify-center">
                    <div className="text-red-500">Error loading quote data</div>
                </CardContent>
            </Card>
        );
    }

    const monthlyQuotesData = data.data.monthlyQuotesData;

    // Transform API data to chart format
    const chartData: QuoteData[] = monthlyQuotesData.map((item: any) => ({
        month: item.monthName,
        quotes: item.count,
    }));

    // Function to determine bar color based on value
    const getBarColor = (quotes: number) => {
        const average = chartData.reduce((sum, item) => sum + item.quotes, 0) / chartData.length;
        return quotes >= average ? "#71C797" : "#9EA9B8";
    };

    return (
        <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] justify-between">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Quote Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-0 pb-0">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #E5E7EB",
                                borderRadius: "6px",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                            }}
                            formatter={(value) => [`${value} quotes`, "Quotes"]}
                            labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Bar dataKey="quotes" radius={[8, 8, 0, 0]} barSize={28}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.quotes)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

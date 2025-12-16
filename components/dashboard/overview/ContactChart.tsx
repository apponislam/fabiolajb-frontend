// "use client";

// import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface ChartData {
//     month: string;
//     contacts: number;
//     highlight: boolean;
// }

// interface TooltipProps {
//     active?: boolean;
//     payload?: Array<{
//         value: number;
//         payload: ChartData;
//     }>;
// }

// interface DotProps {
//     cx?: number;
//     cy?: number;
//     payload?: ChartData;
// }

// // Generate data for all months of the year
// const generateYearData = (): ChartData[] => {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     const data: ChartData[] = months.map((month, index) => {
//         // Generate realistic contact data with some seasonal variation
//         const baseValue = 50 + Math.sin(index / 2) * 15 + Math.random() * 20;
//         const currentMonth = new Date().getMonth();
//         const isHighlighted = index === currentMonth; // Highlight current month

//         return {
//             month,
//             contacts: Math.max(20, Math.min(100, baseValue)),
//             highlight: isHighlighted,
//         };
//     });

//     return data;
// };

// const CustomTooltip = ({ active, payload }: TooltipProps) => {
//     if (active && payload && payload.length) {
//         const data = payload[0].payload;
//         return (
//             <div className="bg-[#1E90FF] text-white px-3 py-2 rounded text-sm font-semibold shadow-lg">
//                 <div>
//                     {data.month}: {data.contacts.toFixed(0)}%
//                 </div>
//             </div>
//         );
//     }
//     return null;
// };

// const CustomDot = (props: DotProps) => {
//     const { cx, cy, payload } = props;
//     if (!cx || !cy || !payload) return null;

//     return <circle key={`dot-${payload.month}`} cx={cx} cy={cy} r={payload.highlight ? 6 : 4} fill="#1E90FF" stroke={payload.highlight ? "white" : "none"} strokeWidth={payload.highlight ? 2 : 0} />;
// };

// export function ContactChart() {
//     const data = generateYearData();

//     // Calculate statistics
//     const totalContacts = data.reduce((sum, item) => sum + item.contacts, 0);
//     const averageContacts = totalContacts / data.length;
//     const currentMonth = new Date().getMonth();
//     const currentMonthValue = data[currentMonth]?.contacts || 0;
//     const previousMonthValue = data[currentMonth - 1]?.contacts || averageContacts;
//     const growthRate = ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;

//     return (
//         <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] ">
//             <CardHeader className="pb-4">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                     <div>
//                         <CardTitle className="text-lg font-semibold">Total Contacts</CardTitle>
//                     </div>
//                     <div className="text-right">
//                         <div className="text-2xl font-bold text-gray-900">{averageContacts.toFixed(0)}%</div>
//                         <div className={`text-sm font-medium ${growthRate >= 0 ? "text-[#1E90FF]" : "text-red-600"}`}>
//                             {growthRate >= 0 ? "+" : ""}
//                             {growthRate.toFixed(1)}%
//                         </div>
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardContent className="pl-0">
//                 <ResponsiveContainer width="100%" height={300}>
//                     <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                         <CartesianGrid strokeDasharray="0" vertical={false} stroke="#DDDDDD" strokeWidth={0.5} />
//                         <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
//                         <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(value) => `${value}%`} />
//                         <Tooltip content={<CustomTooltip />} cursor={false} />
//                         <Area type="monotone" dataKey="contacts" stroke="#1E90FF" fill="transparent" strokeWidth={2} strokeDasharray="5 5" dot={<CustomDot />} activeDot={{ r: 8 }} isAnimationActive={true} animationDuration={1500} />
//                     </AreaChart>
//                 </ResponsiveContainer>
//             </CardContent>
//         </Card>
//     );
// }

"use client";

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardStatisticsQuery } from "@/redux/features/dashboard/dashboardApi";

interface ChartData {
    month: string;
    contacts: number;
    highlight: boolean;
}

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: ChartData;
    }>;
}

interface DotProps {
    cx?: number;
    cy?: number;
    payload?: ChartData;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#1E90FF] text-white px-3 py-2 rounded text-sm font-semibold shadow-lg">
                <div>
                    {data.month}: {data.contacts} contacts
                </div>
            </div>
        );
    }
    return null;
};

const CustomDot = (props: DotProps) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy || !payload) return null;

    return <circle key={`dot-${payload.month}`} cx={cx} cy={cy} r={payload.highlight ? 6 : 4} fill="#1E90FF" stroke={payload.highlight ? "white" : "none"} strokeWidth={payload.highlight ? 2 : 0} />;
};

export function ContactChart() {
    const { data, isLoading, error } = useGetDashboardStatisticsQuery(undefined);

    if (isLoading) {
        return (
            <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Total Contacts</CardTitle>
                </CardHeader>
                <CardContent className="pl-0 h-[300px] flex items-center justify-center">
                    <div className="text-gray-500">Loading contact data...</div>
                </CardContent>
            </Card>
        );
    }

    if (error || !data?.data?.monthlyContactsData) {
        return (
            <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Total Contacts</CardTitle>
                </CardHeader>
                <CardContent className="pl-0 h-[300px] flex items-center justify-center">
                    <div className="text-red-500">Error loading contact data</div>
                </CardContent>
            </Card>
        );
    }

    const monthlyContactsData = data.data.monthlyContactsData;
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed, API is 1-indexed

    // Transform API data to chart format
    const chartData: ChartData[] = monthlyContactsData.map((item: any) => ({
        month: item.monthName,
        contacts: item.count,
        highlight: item.month === currentMonth,
    }));

    // Calculate statistics
    const totalContacts = chartData.reduce((sum, item) => sum + item.contacts, 0);
    const averageContacts = totalContacts / chartData.length;

    // Find current and previous month values
    const currentMonthData = chartData.find((item) => item.highlight);
    const previousMonthData = chartData.find((item) => {
        const monthIndex = monthlyContactsData.findIndex((m: any) => m.monthName === item.month);
        return monthIndex === currentMonth - 2; // Previous month
    });

    const currentMonthValue = currentMonthData?.contacts || 0;
    const previousMonthValue = previousMonthData?.contacts || averageContacts;
    const growthRate = previousMonthValue > 0 ? ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100 : 0;

    return (
        <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg font-semibold">Total Contacts</CardTitle>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{averageContacts.toFixed(0)}</div>
                        <div className={`text-sm font-medium ${growthRate >= 0 ? "text-[#1E90FF]" : "text-red-600"}`}>
                            {growthRate >= 0 ? "+" : ""}
                            {growthRate.toFixed(1)}%
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-0">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#DDDDDD" strokeWidth={0.5} />
                        <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, "dataMax + 1"]} tickFormatter={(value) => `${value}`} />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Area type="monotone" dataKey="contacts" stroke="#1E90FF" fill="transparent" strokeWidth={2} strokeDasharray="5 5" dot={<CustomDot />} activeDot={{ r: 8 }} isAnimationActive={true} animationDuration={1500} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

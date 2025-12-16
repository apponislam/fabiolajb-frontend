// "use client";

// import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface ChartData {
//     month: string;
//     revenue: number;
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
//         // Generate realistic revenue data with some seasonal variation
//         const baseValue = 50000 + Math.sin(index / 2) * 15000 + Math.random() * 20000;
//         const currentMonth = new Date().getMonth();
//         const isHighlighted = index === currentMonth; // Highlight current month

//         return {
//             month,
//             revenue: Math.max(20000, Math.min(100000, baseValue)),
//             highlight: isHighlighted,
//         };
//     });

//     return data;
// };

// const CustomTooltip = ({ active, payload }: TooltipProps) => {
//     if (active && payload && payload.length) {
//         const data = payload[0].payload;
//         return (
//             <div className="bg-[#3CB371] text-white px-3 py-2 rounded text-sm font-semibold shadow-lg">
//                 <div>
//                     {data.month}: ${data.revenue.toLocaleString()}
//                 </div>
//             </div>
//         );
//     }
//     return null;
// };

// const CustomDot = (props: DotProps) => {
//     const { cx, cy, payload } = props;
//     if (!cx || !cy || !payload) return null;

//     return <circle key={`dot-${payload.month}`} cx={cx} cy={cy} r={payload.highlight ? 6 : 4} fill="#3CB371" stroke={payload.highlight ? "white" : "none"} strokeWidth={payload.highlight ? 2 : 0} />;
// };

// export function RevenueOverviewChart() {
//     const data = generateYearData();

//     // Calculate statistics
//     const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
//     const averageRevenue = totalRevenue / data.length;
//     const currentMonth = new Date().getMonth();
//     const currentMonthValue = data[currentMonth]?.revenue || 0;
//     const previousMonthValue = data[currentMonth - 1]?.revenue || averageRevenue;
//     const growthRate = ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;

//     return (
//         <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
//             <CardHeader className="pb-4">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                     <div>
//                         <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
//                     </div>
//                     <div className="text-right">
//                         <div className="text-2xl font-bold text-gray-900">${averageRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
//                         <div className={`text-sm font-medium ${growthRate >= 0 ? "text-green-600" : "text-red-600"}`}>
//                             {growthRate >= 0 ? "+" : ""}
//                             {growthRate.toFixed(1)}%
//                         </div>
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardContent className="pl-0">
//                 <ResponsiveContainer width="100%" height={300}>
//                     <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                         <defs>
//                             <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                                 <stop offset="5%" stopColor="#3CB371" stopOpacity={0.3} />
//                                 <stop offset="95%" stopColor="#3CB371" stopOpacity={0} />
//                             </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="0" vertical={false} stroke="#DDDDDD" strokeWidth={0.5} />
//                         <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
//                         <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100000]} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
//                         <Tooltip content={<CustomTooltip />} cursor={false} />
//                         <Area type="monotone" dataKey="revenue" stroke="#3CB371" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} dot={<CustomDot />} isAnimationActive={true} animationDuration={1500} />
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
    revenue: number;
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
            <div className="bg-[#3CB371] text-white px-3 py-2 rounded text-sm font-semibold shadow-lg">
                <div>
                    {data.month}: ${data.revenue.toLocaleString()}
                </div>
            </div>
        );
    }
    return null;
};

const CustomDot = (props: DotProps) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy || !payload) return null;

    return <circle key={`dot-${payload.month}`} cx={cx} cy={cy} r={payload.highlight ? 6 : 4} fill="#3CB371" stroke={payload.highlight ? "white" : "none"} strokeWidth={payload.highlight ? 2 : 0} />;
};

export function RevenueOverviewChart() {
    const { data, isLoading, error } = useGetDashboardStatisticsQuery(undefined);

    if (isLoading) {
        return (
            <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-0 h-[300px] flex items-center justify-center">
                    <div className="text-gray-500">Loading revenue data...</div>
                </CardContent>
            </Card>
        );
    }

    if (error || !data?.data?.monthlyRevenueData) {
        return (
            <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-0 h-[300px] flex items-center justify-center">
                    <div className="text-red-500">Error loading revenue data</div>
                </CardContent>
            </Card>
        );
    }

    const monthlyRevenueData = data.data.monthlyRevenueData;
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed, API is 1-indexed

    // Transform API data to chart format
    const chartData: ChartData[] = monthlyRevenueData.map((item: any) => ({
        month: item.monthName,
        revenue: item.revenue,
        highlight: item.month === currentMonth,
    }));

    // Calculate statistics
    const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
    const averageRevenue = totalRevenue / chartData.length;

    // Find current and previous month values
    const currentMonthData = chartData.find((item) => item.highlight);
    const previousMonthData = chartData.find((item) => {
        const monthIndex = monthlyRevenueData.findIndex((m: any) => m.monthName === item.month);
        return monthIndex === currentMonth - 2; // Previous month
    });

    const currentMonthValue = currentMonthData?.revenue || 0;
    const previousMonthValue = previousMonthData?.revenue || averageRevenue;
    const growthRate = previousMonthValue > 0 ? ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100 : 0;

    return (
        <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${averageRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className={`text-sm font-medium ${growthRate >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {growthRate >= 0 ? "+" : ""}
                            {growthRate.toFixed(1)}%
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-0">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3CB371" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3CB371" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#DDDDDD" strokeWidth={0.5} />
                        <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, "dataMax + 100"]} tickFormatter={(value) => `$${value}`} />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Area type="monotone" dataKey="revenue" stroke="#3CB371" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} dot={<CustomDot />} isAnimationActive={true} animationDuration={1500} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

// "use client";
// import { useState } from "react";
// import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // Generate data for different months
// const monthlyData = {
//     January: Array.from({ length: 31 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     February: Array.from({ length: 28 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     March: Array.from({ length: 31 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     April: Array.from({ length: 30 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     May: Array.from({ length: 31 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     June: Array.from({ length: 30 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     July: Array.from({ length: 31 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     August: Array.from({ length: 31 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     September: Array.from({ length: 30 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     October: Array.from({ length: 31 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     November: Array.from({ length: 30 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
//     December: Array.from({ length: 31 }, (_, i) => ({ date: (i + 1).toString(), quotes: Math.floor(Math.random() * 61) + 40 })),
// };

// const months = Object.keys(monthlyData);

// export function QuoteChart() {
//     const [selectedMonth, setSelectedMonth] = useState("October");
//     const chartData = monthlyData[selectedMonth as keyof typeof monthlyData];
//     const totalQuotes = chartData.reduce((sum, day) => sum + day.quotes, 0);
//     const formattedTotal = totalQuotes.toLocaleString();

//     // Calculate max value for Y-axis (fixed to 100 for proper percentages)
//     const maxQuotes = 100;

//     return (
//         <Card className="border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full">
//             <CardHeader className="pb-3">
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <CardTitle className="text-lg font-semibold">Total quote request</CardTitle>
//                         <div className="flex items-center gap-2 mt-1">
//                             <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 bg-white">
//                                 {months.map((month) => (
//                                     <option key={month} value={month}>
//                                         {month}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                     <div className="text-right">
//                         <div className="text-2xl font-bold text-gray-900">{formattedTotal}</div>
//                         <div className="text-sm text-green-600 font-medium">+4.7%</div>
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardContent className="pb-4 pl-0">
//                 {/* Full width chart with all dates */}
//                 <div style={{ height: "200px" }} className="w-full">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
//                             <CartesianGrid vertical={false} stroke="#f0f0f0" />
//                             <XAxis
//                                 dataKey="date"
//                                 tickLine={false}
//                                 axisLine={false}
//                                 tickMargin={5}
//                                 fontSize={10}
//                                 interval={0} // Show ALL dates
//                                 angle={-45}
//                                 textAnchor="end"
//                                 height={50}
//                             />
//                             <YAxis axisLine={false} tickLine={false} tickMargin={10} fontSize={10} domain={[0, maxQuotes]} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(value) => `${value}%`} />
//                             <Line dataKey="quotes" type="natural" stroke="#3CB371" strokeWidth={2} dot={{ fill: "#3CB371", r: 2 }} activeDot={{ r: 4, fill: "#3CB371" }} />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

"use client";

import { useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChartData {
    date: number;
    value: number;
    highlight: boolean;
    id: string;
}

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
    }>;
}

interface DotProps {
    cx?: number;
    cy?: number;
    payload?: ChartData;
}

const generateMonthData = (month: string): ChartData[] => {
    const daysInMonth: { [key: string]: number } = {
        january: 31,
        february: 28,
        march: 31,
        april: 30,
        may: 31,
        june: 30,
        july: 31,
        august: 31,
        september: 30,
        october: 31,
        november: 30,
        december: 31,
    };

    const days = daysInMonth[month] || 31;
    const data: ChartData[] = [];

    for (let i = 1; i <= days; i++) {
        const baseValue = 40 + Math.sin(i / 3) * 20 + Math.random() * 15;
        data.push({
            date: i,
            value: Math.max(20, Math.min(100, baseValue)),
            highlight: i === 9,
            id: `${month}-${i}`,
        });
    }

    return data;
};

const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
        return <div className="bg-[#3CB371] text-white px-3 py-1 rounded text-sm font-semibold">{payload[0].value.toFixed(1)}%</div>;
    }
    return null;
};

const CustomDot = (props: DotProps) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy || !payload) return null;

    return <circle key={`dot-${payload.id}`} cx={cx} cy={cy} r={payload.highlight ? 6 : 4} fill="#3CB371" />;
};

export function QuoteRequestChart() {
    const [month, setMonth] = useState("october");
    const data = generateMonthData(month);

    return (
        <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                    <CardTitle className="text-lg font-semibold">Total quote request</CardTitle>
                </div>
                <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="february">February</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="may">May</SelectItem>
                        <SelectItem value="june">June</SelectItem>
                        <SelectItem value="july">July</SelectItem>
                        <SelectItem value="august">August</SelectItem>
                        <SelectItem value="september">September</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                        <SelectItem value="november">November</SelectItem>
                        <SelectItem value="december">December</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3CB371" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3CB371" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#DDDDDD" strokeWidth={0.5} />
                        <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(value) => `${value}%`} />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Area type="monotone" dataKey="value" stroke="#3CB371" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} dot={<CustomDot />} isAnimationActive={false} key={`area-${month}`} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

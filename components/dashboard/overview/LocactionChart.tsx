// "use client";

// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// interface LocationData {
//     name: string;
//     value: number;
//     color: string;
// }

// const data: LocationData[] = [
//     { name: "United States", value: 52.1, color: "#000000" },
//     { name: "Canada", value: 22.8, color: "#6BA3FF" },
//     { name: "Mexico", value: 13.9, color: "#4ADE80" },
//     { name: "Other", value: 11.2, color: "#D8B4FE" },
// ];

// export function TrafficByLocationChart() {
//     return (
//         <div className="w-full bg-background p-8 rounded-lg">
//             <h2 className="text-lg font-semibold mb-6 text-foreground">Traffic by Location</h2>

//             <div className="flex items-center justify-between">
//                 {/* Donut Chart */}
//                 <div className="w-48 h-48">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                             <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
//                                 {data.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={entry.color} />
//                                 ))}
//                             </Pie>
//                             <Tooltip formatter={(value) => `${value}%`} />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>

//                 {/* Legend */}
//                 <div className="flex flex-col gap-4 ml-8">
//                     {data.map((item, index) => (
//                         <div key={index} className="flex items-center gap-3">
//                             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
//                             <span className="text-sm text-foreground">{item.name}</span>
//                             <span className="text-sm font-semibold text-foreground ml-auto w-12 text-right">{item.value}%</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LocationData {
    name: string;
    value: number;
    color: string;
}

const data: LocationData[] = [
    { name: "United States", value: 52.1, color: "#000000" },
    { name: "Canada", value: 22.8, color: "#6BA3FF" },
    { name: "Mexico", value: 13.9, color: "#4ADE80" },
    { name: "Other", value: 11.2, color: "#D8B4FE" },
];

export function TrafficByLocationChart() {
    return (
        <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Traffic by Location</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between flex-col md:flex-row gap-3">
                    {/* Donut Chart */}
                    <div className="w-48 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-col gap-4 md:ml-8">
                        {data.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm text-foreground">{item.name}</span>
                                <span className="text-sm font-semibold text-foreground ml-auto w-12 text-right">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceData {
    device: string;
    traffic: number;
    color: string;
}

const data: DeviceData[] = [
    { device: "Linux", traffic: 16000, color: "#9CA3AF" },
    { device: "Mac", traffic: 28000, color: "#4ADE80" },
    { device: "iOS", traffic: 20000, color: "#4B5563" },
    { device: "Windows", traffic: 30000, color: "#22C55E" },
    { device: "Android", traffic: 12000, color: "#9CA3AF" },
    { device: "Other", traffic: 25000, color: "#4ADE80" },
];

export function TrafficByDeviceChart() {
    return (
        <Card className="w-full border-[#EFEFEF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Traffic by Device</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <XAxis dataKey="device" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #E5E7EB",
                                borderRadius: "6px",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                            }}
                            formatter={(value) => `${value.toLocaleString()}`}
                        />
                        <Bar dataKey="traffic" radius={[8, 8, 0, 0]} barSize={28}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

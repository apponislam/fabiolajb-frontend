"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { inquiryData } from "./contactDemoData";

const ITEMS_PER_PAGE = 10;

export function InquiryTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
        return inquiryData.filter((item) => item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase()) || item.phone.includes(searchTerm) || item.message.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleExport = () => {
        const csv = [["Full Name", "Phone", "Email", "Message"], ...filteredData.map((item) => [item.fullName, item.phone, item.email, item.message])].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "inquiries.csv";
        a.click();
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between gap-4">
                <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="max-w-xs"
                />
                <Button onClick={handleExport} className="bg-[#3CB371] hover:bg-[#3CB371] text-white gap-2 rounded-[20px]">
                    <Download size={16} />
                    Export
                </Button>
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#3CB371] text-white">
                            <th className="px-4 py-3 text-left font-semibold">Full Name</th>
                            <th className="px-4 py-3 text-left font-semibold">Phone</th>
                            <th className="px-4 py-3 text-left font-semibold">Email</th>
                            <th className="px-4 py-3 text-left font-semibold">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">{item.fullName}</td>
                                <td className="px-4 py-3">{item.phone}</td>
                                <td className="px-4 py-3">{item.email}</td>
                                <td className="px-4 py-3 text-gray-600 truncate">{item.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="border border-[#909090] text-[#909090]">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className={`h-9 w-9 p-0 ${currentPage === page ? "bg-[#3CB371] hover:bg-[#3CB371] text-white" : "border border-[#909090] text-[#909090]"}`}>
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="border border-[#909090] text-[#909090]">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

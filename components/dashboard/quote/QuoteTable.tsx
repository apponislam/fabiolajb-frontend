"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { customerData } from "./demoData";
import { InvoiceModal } from "./QuoteDetailsModal";

const ITEMS_PER_PAGE = 10;

export function CustomerTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredData = useMemo(() => {
        return customerData.filter((customer) => customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.includes(searchTerm) || customer.address.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    // const handleExport = () => {
    //     const headers = ["Full Name", "Email", "Phone", "Address", "Status"];
    //     const csvContent = [headers.join(","), ...filteredData.map((customer) => [customer.fullName, customer.email, customer.phone, customer.address, customer.status].join(","))].join("\n");

    //     const element = document.createElement("a");
    //     element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    //     element.setAttribute("download", "customers.csv");
    //     element.style.display = "none";
    //     document.body.appendChild(element);
    //     element.click();
    //     document.body.removeChild(element);
    // };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Paid":
                return "text-[#3CB371] bg-green-50";
            case "Unpaid":
                return "text-orange-600 bg-orange-50";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Search and Export */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
                </div>
                {/* <Button onClick={handleExport} className="gap-2 bg-[#3CB371] hover:bg-green-700 rounded-[20px]">
                    <Download className="h-4 w-4" />
                    Export
                </Button> */}
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#3CB371] hover:bg-[#3CB371]">
                            <TableHead className="text-white font-semibold">Full Name</TableHead>
                            <TableHead className="text-white font-semibold">Email</TableHead>
                            <TableHead className="text-white font-semibold">Phone</TableHead>
                            <TableHead className="text-white font-semibold">Address</TableHead>
                            <TableHead className="text-white font-semibold">Status</TableHead>
                            <TableHead className="text-white font-semibold text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell className="font-medium">{customer.fullName}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 rounded ${getStatusColor(customer.status)}`}>{customer.status}</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setIsModalOpen(true)}>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Send Payment Mail</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <InvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 flex-col-reverse md:flex-row gap-4">
                <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="border border-[#909090] text-[#909090]">
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

                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="border border-[#909090] text-[#909090]">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

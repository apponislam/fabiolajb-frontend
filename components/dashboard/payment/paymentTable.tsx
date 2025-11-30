"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { transactionsData } from "./paymentDemoData";

const ITEMS_PER_PAGE = 10;

export function TransactionTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTransactions = useMemo(() => {
        return transactionsData.filter((transaction) => transaction.email.toLowerCase().includes(searchQuery.toLowerCase()) || transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="pl-10 max-w-sm w-full"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#3CB371] text-white">
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Date & Time</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-muted/50">
                                <td className="px-6 py-4 text-sm">{transaction.email}</td>
                                <td className="px-6 py-4 text-sm">{transaction.dateTime}</td>
                                <td className="px-6 py-4 text-sm">{transaction.type}</td>
                                <td className="px-6 py-4 text-sm font-medium">${transaction.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm">{transaction.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} results
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1} className="border border-[#909090] text-[#909090]">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                        {pageNumbers.map((page) => (
                            <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => handlePageClick(page)} className={`h-9 w-9 p-0 ${currentPage === page ? "bg-[#3CB371] hover:bg-[#3CB371] text-white" : "border border-[#909090] text-[#909090]"}`}>
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages} className="border border-[#909090] text-[#909090]">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

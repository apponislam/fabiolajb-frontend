// "use client";

// import { useState, useMemo } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import { transactionsData } from "./paymentDemoData";

// const ITEMS_PER_PAGE = 10;

// export function TransactionTable() {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchQuery, setSearchQuery] = useState("");

//     const filteredTransactions = useMemo(() => {
//         return transactionsData.filter((transaction) => transaction.email.toLowerCase().includes(searchQuery.toLowerCase()) || transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()));
//     }, [searchQuery]);

//     const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

//     const handlePreviousPage = () => {
//         setCurrentPage((prev) => Math.max(1, prev - 1));
//     };

//     const handleNextPage = () => {
//         setCurrentPage((prev) => Math.min(totalPages, prev + 1));
//     };

//     const handlePageClick = (page: number) => {
//         setCurrentPage(page);
//     };

//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//     return (
//         <div className="space-y-4">
//             {/* Search Bar */}
//             <div className="relative">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                     placeholder="Search"
//                     value={searchQuery}
//                     onChange={(e) => {
//                         setSearchQuery(e.target.value);
//                         setCurrentPage(1);
//                     }}
//                     className="pl-10 max-w-sm w-full"
//                 />
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto rounded-lg border">
//                 <table className="w-full">
//                     <thead>
//                         <tr className="bg-[#3CB371] text-white">
//                             <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold">Date & Time</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold">Transaction ID</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentTransactions.map((transaction) => (
//                             <tr key={transaction.id} className="border-b hover:bg-muted/50">
//                                 <td className="px-6 py-4 text-sm">{transaction.email}</td>
//                                 <td className="px-6 py-4 text-sm">{transaction.dateTime}</td>
//                                 <td className="px-6 py-4 text-sm">{transaction.type}</td>
//                                 <td className="px-6 py-4 text-sm font-medium">${transaction.amount.toFixed(2)}</td>
//                                 <td className="px-6 py-4 text-sm">{transaction.transactionId}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-between pt-4 flex-col-reverse md:flex-row gap-4">
//                 <div className="text-sm text-muted-foreground">
//                     Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} results
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1} className="border border-[#909090] text-[#909090]">
//                         <ChevronLeft className="h-4 w-4" />
//                         Previous
//                     </Button>

//                     {/* Page Numbers */}
//                     <div className="flex gap-1">
//                         {pageNumbers.map((page) => (
//                             <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => handlePageClick(page)} className={`h-9 w-9 p-0 ${currentPage === page ? "bg-[#3CB371] hover:bg-[#3CB371] text-white" : "border border-[#909090] text-[#909090]"}`}>
//                                 {page}
//                             </Button>
//                         ))}
//                     </div>

//                     <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages} className="border border-[#909090] text-[#909090]">
//                         Next
//                         <ChevronRight className="h-4 w-4" />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, MoreHorizontal } from "lucide-react";
import { useGetAllPaymentsQuery } from "@/redux/features/payment/paymentApi";

const ITEMS_PER_PAGE = 10;

export function TransactionTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Use useEffect for debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(searchQuery);
            setCurrentPage(1); // Reset to first page when searching
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isLoading, error } = useGetAllPaymentsQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        searchTerm: searchTerm || undefined,
    });

    const transactions = data?.data || [];
    const meta = data?.meta || { total: 0, page: 1, totalPage: 1, limit: ITEMS_PER_PAGE };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(meta.totalPage, prev + 1));
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    // Function to generate pagination buttons with ellipsis
    const getPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;

        if (meta.totalPage <= maxVisibleButtons) {
            for (let i = 1; i <= meta.totalPage; i++) {
                buttons.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    buttons.push(i);
                }
                buttons.push("ellipsis");
                buttons.push(meta.totalPage);
            } else if (currentPage >= meta.totalPage - 2) {
                buttons.push(1);
                buttons.push("ellipsis");
                for (let i = meta.totalPage - 3; i <= meta.totalPage; i++) {
                    buttons.push(i);
                }
            } else {
                buttons.push(1);
                buttons.push("ellipsis");
                buttons.push(currentPage - 1);
                buttons.push(currentPage);
                buttons.push(currentPage + 1);
                buttons.push("ellipsis");
                buttons.push(meta.totalPage);
            }
        }
        return buttons;
    };

    if (isLoading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error loading transactions</div>;

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by email or transaction ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 max-w-sm w-full" />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#3CB371] text-white">
                            <th className="px-6 py-3 text-left text-sm font-semibold">Customer Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Date & Time</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            transactions.map((transaction: any) => (
                                <tr key={transaction._id} className="border-b hover:bg-muted/50">
                                    <td className="px-6 py-4 text-sm">{transaction.customerName}</td>
                                    <td className="px-6 py-4 text-sm">{transaction.email}</td>
                                    <td className="px-6 py-4 text-sm">{new Date(transaction.dateTime).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm">{transaction.service}</td>
                                    <td className="px-6 py-4 text-sm font-medium">${transaction.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 md:text-sm font-mono text-xs">{transaction.transactionId}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination - Only show if there are pages */}
            {meta.totalPage > 0 && (
                <div className="flex items-center justify-between pt-4 flex-col-reverse md:flex-row gap-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * meta.limit + 1} to {Math.min(currentPage * meta.limit, meta.total)} of {meta.total} results
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1} className="border border-[#909090] text-[#909090]">
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>

                        {/* Page Numbers */}
                        <div className="flex gap-1">
                            {getPaginationButtons().map((button, index) => {
                                if (button === "ellipsis") {
                                    return (
                                        <span key={`ellipsis-${index}`} className="flex items-center justify-center h-9 w-9 text-[#909090]">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </span>
                                    );
                                }

                                const pageNumber = button as number;
                                return (
                                    <Button key={pageNumber} variant={currentPage === pageNumber ? "default" : "outline"} size="sm" onClick={() => handlePageClick(pageNumber)} className={`h-9 w-9 p-0 ${currentPage === pageNumber ? "bg-[#3CB371] hover:bg-[#3CB371] text-white" : "border border-[#909090] text-[#909090]"}`}>
                                        {pageNumber}
                                    </Button>
                                );
                            })}
                        </div>

                        <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === meta.totalPage} className="border border-[#909090] text-[#909090]">
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

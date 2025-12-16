// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useGetAllContactsQuery } from "@/redux/features/contact/contactApi";

// const ITEMS_PER_PAGE = 10;

// export function InquiryTable() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);

//     const { data, isLoading, error, refetch } = useGetAllContactsQuery({
//         page: currentPage,
//         limit: ITEMS_PER_PAGE,
//         searchTerm: searchTerm || undefined,
//     });

//     const contacts = data?.data?.result || [];
//     const meta = data?.data?.meta || { total: 0, page: 1, totalPage: 1 };

//     // Refetch when search term changes
//     useEffect(() => {
//         refetch();
//     }, [searchTerm, refetch]);

//     const totalPages = meta.totalPage || Math.ceil(meta.total / ITEMS_PER_PAGE);

//     if (isLoading) return <div className="text-center py-8">Loading...</div>;
//     if (error) return <div className="text-center py-8 text-red-500">Error loading contacts</div>;

//     return (
//         <div className="w-full space-y-4">
//             <div className="flex items-center justify-between gap-4 ">
//                 <Input
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={(e) => {
//                         setSearchTerm(e.target.value);
//                         setCurrentPage(1);
//                     }}
//                     className="max-w-xs"
//                 />
//             </div>

//             <div className="overflow-x-auto border rounded-lg">
//                 <table className="w-full">
//                     <thead>
//                         <tr className="bg-[#3CB371] text-white">
//                             <th className="px-4 py-3 text-left font-semibold">Full Name</th>
//                             <th className="px-4 py-3 text-left font-semibold">Phone</th>
//                             <th className="px-4 py-3 text-left font-semibold">Email</th>
//                             <th className="px-4 py-3 text-left font-semibold">Message</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {contacts.map((item: any) => (
//                             <tr key={item._id} className="border-t hover:bg-gray-50">
//                                 <td className="px-4 py-3">{item.name}</td>
//                                 <td className="px-4 py-3">{item.phone}</td>
//                                 <td className="px-4 py-3">{item.email}</td>
//                                 <td className="px-4 py-3 text-gray-600 truncate max-w-xs">{item.message}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-between pt-4 flex-col-reverse md:flex-row gap-4">
//                 <div className="text-sm text-muted-foreground">
//                     Showing {(meta.page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(meta.page * ITEMS_PER_PAGE, meta.total)} of {meta.total} results
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="border border-[#909090] text-[#909090]">
//                         <ChevronLeft className="h-4 w-4" />
//                         Previous
//                     </Button>

//                     {/* Page Numbers */}
//                     <div className="flex gap-1">
//                         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                             <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className={`h-9 w-9 p-0 ${currentPage === page ? "bg-[#3CB371] hover:bg-[#3CB371] text-white" : "border border-[#909090] text-[#909090]"}`}>
//                                 {page}
//                             </Button>
//                         ))}
//                     </div>

//                     <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="border border-[#909090] text-[#909090]">
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useGetAllContactsQuery } from "@/redux/features/contact/contactApi";

const ITEMS_PER_PAGE = 10;

export function InquiryTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error, refetch } = useGetAllContactsQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        searchTerm: searchTerm || undefined,
    });

    const contacts = data?.data?.result || [];
    const meta = data?.data?.meta || { total: 0, page: 1, totalPage: 1 };

    // Refetch when search term changes
    useEffect(() => {
        refetch();
    }, [searchTerm, refetch]);

    const totalPages = meta.totalPage || Math.ceil(meta.total / ITEMS_PER_PAGE);

    // Function to generate pagination buttons with ellipsis
    const getPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5; // Show max 5 buttons including ellipsis

        if (totalPages <= maxVisibleButtons) {
            // Show all pages if total pages is small
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        } else {
            // Show first page, current page, and last page with ellipsis
            if (currentPage <= 3) {
                // Near the start
                for (let i = 1; i <= 4; i++) {
                    buttons.push(i);
                }
                buttons.push("ellipsis");
                buttons.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                buttons.push(1);
                buttons.push("ellipsis");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    buttons.push(i);
                }
            } else {
                // In the middle
                buttons.push(1);
                buttons.push("ellipsis");
                buttons.push(currentPage - 1);
                buttons.push(currentPage);
                buttons.push(currentPage + 1);
                buttons.push("ellipsis");
                buttons.push(totalPages);
            }
        }
        return buttons;
    };

    if (isLoading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error loading contacts</div>;

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between gap-4 ">
                <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="max-w-xs"
                />
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
                        {contacts.map((item: any) => (
                            <tr key={item._id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">{item.name}</td>
                                <td className="px-4 py-3">{item.phone}</td>
                                <td className="px-4 py-3">{item.email}</td>
                                <td className="px-4 py-3 text-gray-600 truncate max-w-xs">{item.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 flex-col-reverse md:flex-row gap-4">
                <div className="text-sm text-muted-foreground">
                    Showing {(meta.page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(meta.page * ITEMS_PER_PAGE, meta.total)} of {meta.total} results
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="border border-[#909090] text-[#909090]">
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
                                <Button key={pageNumber} variant={currentPage === pageNumber ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(pageNumber)} className={`h-9 w-9 p-0 ${currentPage === pageNumber ? "bg-[#3CB371] hover:bg-[#3CB371] text-white" : "border border-[#909090] text-[#909090]"}`}>
                                    {pageNumber}
                                </Button>
                            );
                        })}
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

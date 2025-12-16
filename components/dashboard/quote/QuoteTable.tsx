"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, ChevronLeft, ChevronRight, MoreHorizontal, UserPlus, X } from "lucide-react";
import { InvoiceModal } from "./QuoteDetailsModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllQuotesQuery, useSendPaymentLinkMutation, useDeleteQuoteMutation, useUpdateQuoteMutation } from "@/redux/features/quote/quoteApi";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 10;

export function CustomerTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCleanerModalOpen, setIsCleanerModalOpen] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState<any>(null);
    const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);
    const [cleaners, setCleaners] = useState<string[]>([""]); // Start with one empty cleaner
    const [quoteToAssignCleaner, setQuoteToAssignCleaner] = useState<string | null>(null);

    // Use the query hook with search parameters
    const { data, isLoading, error, refetch } = useGetAllQuotesQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        searchTerm: searchTerm,
    });

    const [sendPaymentLink, { isLoading: isSendingPayment }] = useSendPaymentLinkMutation();
    const [deleteQuote, { isLoading: isDeleting }] = useDeleteQuoteMutation();
    const [updateQuote, { isLoading: isUpdating }] = useUpdateQuoteMutation();

    const quotes = data?.data || [];
    const meta = data?.meta || {
        total: 0,
        page: 1,
        totalPage: 1,
        limit: ITEMS_PER_PAGE,
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paymentCompleted":
                return "text-[#3CB371] bg-green-50";
            case "cleanerAssigned":
                return "text-blue-600 bg-blue-50";
            case "paymentMailSended":
                return "text-yellow-600 bg-yellow-50";
            case "pending":
                return "text-orange-600 bg-orange-50";
            default:
                return "text-gray-500 bg-gray-50";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "paymentCompleted":
                return "Paid";
            case "cleanerAssigned":
                return "Cleaner Assigned";
            case "paymentMailSended":
                return "Payment Link Sent";
            case "pending":
                return "Pending";
            default:
                return status;
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(meta.totalPage, prev + 1));
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleSendPaymentLink = async (quoteId: string) => {
        try {
            const result = await sendPaymentLink(quoteId).unwrap();
            if (result.success) {
                toast.success(result.message || "Payment link sent successfully");
                refetch();
            } else {
                toast.error(result.message || "Failed to send payment link");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to send payment link");
        }
    };

    const handleSendPing = async (quoteId: string) => {
        try {
            const result = await sendPaymentLink(quoteId).unwrap();
            if (result.success) {
                toast.success("Ping sent successfully");
                refetch();
            } else {
                toast.error("Failed to send ping");
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to send ping");
        }
    };

    const handleAssignCleanerClick = (quoteId: string, currentCleaners: string[] = []) => {
        setQuoteToAssignCleaner(quoteId);
        // Pre-populate with existing cleaners or start with one empty field
        setCleaners(currentCleaners.length > 0 ? [...currentCleaners] : [""]);
        setIsCleanerModalOpen(true);
    };

    const handleAddCleanerField = () => {
        setCleaners([...cleaners, ""]);
    };

    const handleRemoveCleanerField = (index: number) => {
        if (cleaners.length > 1) {
            const newCleaners = cleaners.filter((_, i) => i !== index);
            setCleaners(newCleaners);
        }
    };

    const handleCleanerChange = (index: number, value: string) => {
        const newCleaners = [...cleaners];
        newCleaners[index] = value;
        setCleaners(newCleaners);
    };

    const handleAssignCleaners = async () => {
        if (!quoteToAssignCleaner) return;

        // Filter out empty cleaner names
        const validCleaners = cleaners.filter((cleaner) => cleaner.trim() !== "");

        if (validCleaners.length === 0) {
            toast.error("Please add at least one cleaner");
            return;
        }

        try {
            const result = await updateQuote({
                id: quoteToAssignCleaner,
                cleaner: validCleaners,
                status: "cleanerAssigned",
            }).unwrap();

            if (result.success) {
                toast.success(result.message || "Cleaners assigned successfully");
                refetch();
                setIsCleanerModalOpen(false);
                setCleaners([""]);
                setQuoteToAssignCleaner(null);
            } else {
                toast.error(result.message || "Failed to assign cleaners");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to assign cleaners");
        }
    };

    const handleDeleteClick = (quoteId: string) => {
        setQuoteToDelete(quoteId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!quoteToDelete) return;

        try {
            const result = await deleteQuote(quoteToDelete).unwrap();
            if (result.success) {
                toast.success(result.message || "Quote deleted successfully");
                refetch();
            } else {
                toast.error(result.message || "Failed to delete quote");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete quote");
        } finally {
            setIsDeleteDialogOpen(false);
            setQuoteToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setQuoteToDelete(null);
    };

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

    if (isLoading) {
        return (
            <div className="w-full space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                    <div className="space-y-3 p-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="w-full text-center py-8 text-red-500">Error loading quotes: {(error as any)?.data?.message || "Unknown error"}</div>;
    }

    return (
        <div className="w-full space-y-4">
            {/* Search and Export */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by email or name" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
                </div>
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
                            {/* <TableHead className="text-white font-semibold">Cleaners</TableHead> */}
                            <TableHead className="text-white font-semibold text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {quotes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    No quotes found
                                </TableCell>
                            </TableRow>
                        ) : (
                            quotes.map((quote: any) => (
                                <TableRow key={quote._id}>
                                    <TableCell className="font-medium">{quote.fullName}</TableCell>
                                    <TableCell>{quote.email}</TableCell>
                                    <TableCell>{quote.phone}</TableCell>
                                    <TableCell className="max-w-xs truncate">{quote.serviceAddress}</TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 uppercase rounded ${getStatusColor(quote.status)}`}>{getStatusText(quote.status)}</span>
                                    </TableCell>
                                    {/* <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {quote.cleaner && quote.cleaner.length > 0 ? (
                                                quote.cleaner.map((cleaner: string, index: number) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {cleaner}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-sm">None</span>
                                            )}
                                        </div>
                                    </TableCell> */}
                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {/* Always show View Details */}
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSelectedQuote(quote);
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    View Details
                                                </DropdownMenuItem>

                                                {/* Status-based actions */}
                                                {quote.status === "pending" && (
                                                    <>
                                                        <DropdownMenuItem onClick={() => handleSendPaymentLink(quote._id)} disabled={isSendingPayment}>
                                                            {isSendingPayment ? "Sending..." : "Send Payment Mail"}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(quote._id)} disabled={isDeleting}>
                                                            {isDeleting ? "Deleting..." : "Delete"}
                                                        </DropdownMenuItem>
                                                    </>
                                                )}

                                                {quote.status === "paymentMailSended" && (
                                                    <DropdownMenuItem onClick={() => handleSendPing(quote._id)} disabled={isSendingPayment}>
                                                        {isSendingPayment ? "Sending..." : "Send Ping"}
                                                    </DropdownMenuItem>
                                                )}

                                                {(quote.status === "paymentCompleted" || quote.status === "cleanerAssigned") && (
                                                    <DropdownMenuItem onClick={() => handleAssignCleanerClick(quote._id, quote.cleaner || [])} disabled={isUpdating}>
                                                        <UserPlus className="h-4 w-4 mr-2" />
                                                        {isUpdating ? "Assigning..." : "Assign Cleaner"}
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* View Details Modal */}
            <InvoiceModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedQuote(null);
                }}
                quoteData={selectedQuote}
            />

            {/* Assign Cleaner Modal */}
            <Dialog open={isCleanerModalOpen} onOpenChange={setIsCleanerModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Assign Cleaners</DialogTitle>
                        <DialogDescription>Add cleaners for this quote. Click + to add more cleaners.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {cleaners.map((cleaner, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input placeholder={`Cleaner ${index + 1} name`} value={cleaner} onChange={(e) => handleCleanerChange(index, e.target.value)} className="flex-1" />
                                {cleaners.length > 1 && (
                                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveCleanerField(index)} className="h-10 w-10 text-red-500 hover:text-red-700 hover:bg-red-50">
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}

                        <Button type="button" variant="outline" onClick={handleAddCleanerField} className="w-full">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Another Cleaner
                        </Button>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsCleanerModalOpen(false);
                                setCleaners([""]);
                                setQuoteToAssignCleaner(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAssignCleaners} disabled={isUpdating}>
                            {isUpdating ? "Assigning..." : "Assign Cleaners"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the quote and remove all associated data.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDelete} disabled={isDeleting}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Pagination */}
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

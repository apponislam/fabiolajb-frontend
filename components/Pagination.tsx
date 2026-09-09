"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
    totalPage?: number;
}

interface PaginationProps {
    meta?: PaginationMeta;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ meta, currentPage, onPageChange }: PaginationProps) {
    if (!meta) return null;

    const total = meta.total || 0;
    const limit = meta.limit || 10;
    const totalPages = meta.totalPages || meta.totalPage || Math.ceil(total / limit) || 1;

    if (totalPages <= 1 && total <= limit) {
        return null;
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const getPaginationButtons = () => {
        const buttons: (number | "ellipsis")[] = [];
        const maxVisibleButtons = 5;

        if (totalPages <= maxVisibleButtons) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    buttons.push(i);
                }
                buttons.push("ellipsis");
                buttons.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                buttons.push(1);
                buttons.push("ellipsis");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    buttons.push(i);
                }
            } else {
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

    const fromItem = (currentPage - 1) * limit + 1;
    const toItem = Math.min(currentPage * limit, total);

    return (
        <div className="flex items-center justify-between pt-4 flex-col-reverse md:flex-row gap-4 w-full">
            {/* Info text */}
            <div className="text-sm text-muted-foreground">
                Showing {total > 0 ? fromItem : 0} to {toItem} of {total} results
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevious}
                    disabled={currentPage <= 1}
                    className="h-9 w-9 border border-[#909090] text-[#909090]"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex gap-1">
                    {getPaginationButtons().map((button, index) => {
                        if (button === "ellipsis") {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="flex items-center justify-center h-9 w-9 text-[#909090]"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </span>
                            );
                        }

                        const pageNumber = button as number;
                        const isActive = currentPage === pageNumber;

                        return (
                            <Button
                                key={pageNumber}
                                variant={isActive ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(pageNumber)}
                                className={`h-9 w-9 p-0 ${
                                    isActive
                                        ? "bg-[#3CB371] hover:bg-[#3CB371] text-white"
                                        : "border border-[#909090] text-[#909090]"
                                }`}
                            >
                                {pageNumber}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    disabled={currentPage >= totalPages}
                    className="h-9 w-9 border border-[#909090] text-[#909090]"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default Pagination;

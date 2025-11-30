"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, ChevronLeft, ChevronRight, CirclePlus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Service } from "./demoServiceData";
import Image from "next/image";
import { EditServiceModal } from "./EditService";
import { AddServiceModal } from "./AddService";

interface ServiceListProps {
    services: Service[];
    itemsPerPage?: number;
}

export function ServiceList({ services = [], itemsPerPage = 5 }: ServiceListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [serviceList, setServiceList] = useState<Service[]>(services);

    const totalPages = Math.ceil(serviceList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentServices = serviceList.slice(startIndex, endIndex);

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updatedService: Service) => {
        setServiceList((prev) => prev.map((service) => (service.id === updatedService.id ? updatedService : service)));
        setIsEditModalOpen(false);
        setEditingService(null);
    };

    const handleAddService = (newService: Omit<Service, "id">) => {
        const newServiceWithId: Service = {
            ...newService,
            id: Math.max(...serviceList.map((s) => s.id), 0) + 1, // Generate new ID
        };
        setServiceList((prev) => [...prev, newServiceWithId]);
        setIsAddModalOpen(false);
    };

    const handleDelete = (serviceId: number) => {
        setServiceList((prev) => prev.filter((service) => service.id !== serviceId));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Running Service</h1>
                <Button className="bg-[#3CB371] hover:bg-[#3CB371] text-white rounded-[20px]" onClick={() => setIsAddModalOpen(true)}>
                    <CirclePlus className="w-6 h-6" />
                    Add
                </Button>
            </div>

            <div className="space-y-4">
                {currentServices.map((service) => (
                    <div key={service.id} className="flex gap-4">
                        <Image src={service.image || "/placeholder.svg"} alt={service.name} width={96} height={96} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                                <span className="text-lg font-bold text-[#3CB371]">${service.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{service.description}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="shrink-0">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(service)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(service.id)}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </div>

            {/* Edit Service Modal */}
            <EditServiceModal service={editingService} open={isEditModalOpen} onOpenChange={setIsEditModalOpen} onSave={handleSaveEdit} />

            {/* Add Service Modal */}
            <AddServiceModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSave={handleAddService} />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 flex-col-reverse md:flex-row gap-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, serviceList.length)} of {serviceList.length} results
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
            )}
        </div>
    );
}

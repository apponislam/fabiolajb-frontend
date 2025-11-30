"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Service } from "./demoServiceData";

interface AddServiceModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (newService: Omit<Service, "id">) => void;
}

export function AddServiceModal({ open, onOpenChange, onSave }: AddServiceModalProps) {
    const [formData, setFormData] = useState<Omit<Service, "id">>({
        name: "",
        description: "",
        image: "",
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
        }));
    };

    const handleSave = () => {
        if (formData.name && formData.description) {
            onSave(formData);
            setFormData({ name: "", description: "", image: "", price: 0 });
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-[95vw] p-0 sm:max-w-md sm:p-6 rounded-xl">
                <div className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="px-4 sm:px-0 pt-4 sm:pt-0">
                        <DialogTitle className="text-lg sm:text-xl font-semibold">Add New Service</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4 px-4 sm:px-0">
                        {/* Service Title */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Service Title</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Home services" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base" />
                        </div>

                        {/* Service Description */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Service Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter service description" rows={4} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-base" />
                        </div>

                        {/* Service Price */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Service Price</label>
                            <input type="number" name="price" value={formData.price || ""} onChange={handleChange} placeholder="$00.00" step="0.01" min="0" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base" />
                        </div>

                        {/* Upload Picture Button */}
                        <button className="w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 text-base transition-colors">
                            <Upload className="w-4 h-4" />
                            Upload picture
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 p-4  sm:bg-transparent border-t border-gray-200 sm:border-t-0">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 py-2.5 text-base order-2 sm:order-1">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 text-base order-1 sm:order-2">
                            Add Service
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

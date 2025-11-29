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
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add New Service</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Service Title */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Service Title</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Home services" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    {/* Service Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Service Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter service description" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
                    </div>

                    {/* Service Price */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Service Price</label>
                        <input type="number" name="price" value={formData.price || ""} onChange={handleChange} placeholder="$00.00" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    {/* Upload Picture Button */}
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload picture
                    </button>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                        Add Service
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

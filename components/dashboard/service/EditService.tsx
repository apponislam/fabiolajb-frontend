"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Service } from "./demoServiceData";

interface EditServiceModalProps {
    service: Service | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updatedService: Service) => void;
}

export function EditServiceModal({ service, open, onOpenChange, onSave }: EditServiceModalProps) {
    const [formData, setFormData] = useState<Partial<Service>>(service || { name: "", description: "", image: "", price: 0 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
        }));
    };

    const handleSave = () => {
        if (service) {
            onSave({ ...service, ...formData } as Service);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-xl font-semibold">Edit Service</DialogTitle>
                    {/* <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button> */}
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Edit Title */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Edit Title</label>
                        <input type="text" name="name" value={formData.name || ""} onChange={handleChange} placeholder="Home services" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    {/* Edit Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Edit Description</label>
                        <textarea name="description" value={formData.description || ""} onChange={handleChange} placeholder="Eg" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
                    </div>

                    {/* Edit Price */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Edit Price</label>
                        <input type="number" name="price" value={formData.price || ""} onChange={handleChange} placeholder="$00.00" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    {/* Change Picture Button */}
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        Change picture
                    </button>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

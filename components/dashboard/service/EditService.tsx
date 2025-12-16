// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Service } from "./demoServiceData";

// interface EditServiceModalProps {
//     service: Service | null;
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     onSave: (updatedService: Service) => void;
// }

// export function EditServiceModal({ service, open, onOpenChange, onSave }: EditServiceModalProps) {
//     const [formData, setFormData] = useState<Partial<Service>>(service || { name: "", description: "", image: "", price: 0 });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
//         }));
//     };

//     const handleSave = () => {
//         if (service) {
//             onSave({ ...service, ...formData } as Service);
//             onOpenChange(false);
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="w-[95vw] max-w-[95vw] p-4 sm:max-w-md sm:p-6 rounded-xl">
//                 <DialogHeader className="flex flex-row items-center justify-between">
//                     <DialogTitle className="text-xl font-semibold">Edit Service</DialogTitle>
//                     {/* <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
//                         <X className="w-5 h-5" />
//                     </button> */}
//                 </DialogHeader>

//                 <div className="space-y-4 py-4">
//                     {/* Edit Title */}
//                     <div>
//                         <label className="text-sm font-medium text-gray-700 mb-2 block">Edit Title</label>
//                         <input type="text" name="name" value={formData.name || ""} onChange={handleChange} placeholder="Home services" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
//                     </div>

//                     {/* Edit Description */}
//                     <div>
//                         <label className="text-sm font-medium text-gray-700 mb-2 block">Edit Description</label>
//                         <textarea name="description" value={formData.description || ""} onChange={handleChange} placeholder="Eg" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
//                     </div>

//                     {/* Edit Price */}
//                     <div>
//                         <label className="text-sm font-medium text-gray-700 mb-2 block">Edit Price</label>
//                         <input type="number" name="price" value={formData.price || ""} onChange={handleChange} placeholder="$00.00" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
//                     </div>

//                     {/* Change Picture Button */}
//                     <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
//                         <Upload className="w-4 h-4" />
//                         Change picture
//                     </button>
//                 </div>

//                 <div className="flex gap-3">
//                     <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
//                         Save
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateServiceMutation } from "@/redux/features/services/servicesApi";
import { toast } from "sonner";
import Image from "next/image";

interface EditServiceModalProps {
    service: any | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: () => void;
}

export function EditServiceModal({ service, open, onOpenChange, onSave }: EditServiceModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        status: true,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [updateService] = useUpdateServiceMutation();

    /* ================= INIT FORM ================= */
    useEffect(() => {
        if (!open || !service) return;

        setFormData({
            title: service.title || "",
            description: service.description || "",
            price: Number(service.price) || 0,
            status: Boolean(service.status),
        });

        if (service.image) {
            const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "http://10.10.7.26:5003";
            setImagePreview(`${baseUrl}${service.image}`);
        } else {
            setImagePreview("");
        }

        setImageFile(null);
    }, [open, service]);

    /* ================= CLEANUP BLOB URL ================= */
    useEffect(() => {
        return () => {
            if (imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    /* ================= INPUT CHANGE ================= */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? Number(value) : value,
        }));
    };

    /* ================= IMAGE CHANGE ================= */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    /* ================= SAVE ================= */
    const handleSave = async () => {
        if (!service) return;

        setIsLoading(true);
        try {
            // Create FormData
            const formDataToSend = new FormData();

            // Create the data object
            const dataObject = {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                status: formData.status, // true/false boolean
            };

            // Append data as JSON string
            formDataToSend.append("data", JSON.stringify(dataObject));

            // Append image if exists
            if (imageFile) {
                formDataToSend.append("image", imageFile);
            }

            console.log("FormData contents:");
            for (const pair of formDataToSend.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            // Send the FormData
            const result = await updateService({
                id: service._id,
                body: formDataToSend,
            }).unwrap();

            if (result.success) {
                toast.success(result.message || "Service updated successfully");

                if (imagePreview.startsWith("blob:")) {
                    URL.revokeObjectURL(imagePreview);
                }

                if (onSave) {
                    onSave();
                }

                onOpenChange(false);
            } else {
                toast.error(result.message || "Failed to update service");
            }
        } catch (error: any) {
            console.error("Full error:", error);
            toast.error(error?.data?.message || error?.message || "Failed to update service");
        } finally {
            setIsLoading(false);
        }
    };

    /* ================= CLOSE ================= */
    const handleClose = () => {
        if (imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }
        onOpenChange(false);
    };

    /* ================= RENDER ================= */
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[95vw] max-w-[95vw] p-4 sm:max-w-md sm:p-6 rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Edit Service</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Service Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Home services" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Service Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description of the service..." rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Service Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="$00.00" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="status" id="status" checked={formData.status} onChange={handleChange} className="w-4 h-4 text-green-500 rounded focus:ring-green-500" />
                        <label htmlFor="status" className="text-sm text-gray-700">
                            Active Service
                        </label>
                    </div>

                    {imagePreview && (
                        <div className="w-full aspect-video border rounded-lg overflow-hidden">
                            <Image src={imagePreview} alt="Service Preview" width={400} height={225} className="w-full h-full object-cover" unoptimized={imagePreview.startsWith("blob:")} />
                        </div>
                    )}

                    <label className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        {imagePreview ? "Change picture" : "Upload picture"}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleClose} className="flex-1" disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

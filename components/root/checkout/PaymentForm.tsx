"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

export function PaymentForm() {
    const [formData, setFormData] = useState({
        emailOrPhone: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        cardholderName: "",
        country: "United States",
        zip: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCountryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, country: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Payment submitted:", formData);
    };

    return (
        <div className="flex justify-center items-start">
            <div className="w-[400px]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email or Phone */}
                    <div>
                        <label htmlFor="emailOrPhone" className="block text-sm font-medium text-foreground mb-2">
                            Email or Phone
                        </label>
                        <Input id="emailOrPhone" name="emailOrPhone" type="text" placeholder="your@email.com or +1 234 567 8900" value={formData.emailOrPhone} onChange={handleInputChange} className="w-full" />
                    </div>

                    {/* Card Information */}
                    {/* <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Card Information</label>
                        <Input name="cardNumber" type="text" placeholder="1234 1234 1234 1234" value={formData.cardNumber} onChange={handleInputChange} className="w-full mb-3" maxLength={19} />

                        <div className="grid grid-cols-2 gap-3">
                            <Input name="expiry" type="text" placeholder="MM / YY" value={formData.expiry} onChange={handleInputChange} maxLength={5} />
                            <Input name="cvc" type="text" placeholder="CVC" value={formData.cvc} onChange={handleInputChange} maxLength={4} />
                        </div>
                    </div> */}
                    {/* <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Card Information</label>
                        <Input name="cardNumber" type="text" placeholder="1234 1234 1234 1234" value={formData.cardNumber} onChange={handleInputChange} className="w-full rounded-none rounded-tl-sm rounded-tr-sm" maxLength={19} />

                        <div className="grid grid-cols-2 ">
                            <Input name="expiry" type="text" className="rounded-none rounded-bl-sm" placeholder="MM / YY" value={formData.expiry} onChange={handleInputChange} maxLength={5} />
                            <Input name="cvc" type="text" className="rounded-none rounded-br-sm" placeholder="CVC" value={formData.cvc} onChange={handleInputChange} maxLength={4} />
                        </div>
                    </div> */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Card Information</label>

                        {/* Card Number + Cards SVG */}
                        <div className="relative">
                            <Input name="cardNumber" type="text" placeholder="1234 1234 1234 1234" value={formData.cardNumber} onChange={handleInputChange} maxLength={19} className="w-full rounded-none rounded-tl-sm rounded-tr-sm pr-16" />

                            {/* Single cards image */}
                            <Image src="/cards.svg" alt="Card Brands" width={50} height={24} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80" />
                        </div>

                        {/* Expiry + CVC */}
                        <div className="grid grid-cols-2">
                            {/* Expiry */}
                            <Input name="expiry" type="text" placeholder="MM / YY" value={formData.expiry} onChange={handleInputChange} maxLength={5} className="rounded-none rounded-bl-sm" />

                            {/* CVC + icon */}
                            <div className="relative">
                                <Input name="cvc" type="text" placeholder="CVC" value={formData.cvc} onChange={handleInputChange} maxLength={4} className="rounded-none rounded-br-sm pr-12" />

                                <Image src="/cvc.svg" alt="CVC" width={20} height={20} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70" />
                            </div>
                        </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                        <label htmlFor="cardholderName" className="block text-sm font-medium text-foreground mb-2">
                            Cardholder name
                        </label>
                        <Input id="cardholderName" name="cardholderName" type="text" placeholder="Full name on card" value={formData.cardholderName} onChange={handleInputChange} className="w-full" />
                    </div>

                    {/* Country or Region + ZIP (no gap, ZIP without label) */}
                    <div className="space-y-0">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-foreground mb-2">
                                Country or region
                            </label>
                            <Select value={formData.country} onValueChange={handleCountryChange}>
                                <SelectTrigger id="country" className="w-full rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Input id="zip" name="zip" type="text" placeholder="12345" value={formData.zip} onChange={handleInputChange} className="w-full mt-0 rounded-t-none rounded-b-sm" />
                    </div>

                    {/* Pay Button */}
                    <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 h-auto">
                        Pay
                    </Button>

                    {/* Terms and Privacy */}
                    <p className="text-xs text-muted-foreground text-center">By clicking Pay, you agree to the Link Terms and Privacy Policy.</p>
                </form>
            </div>
        </div>
    );
}

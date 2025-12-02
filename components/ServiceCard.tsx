"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

export function CleaningServiceModal() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(true)} className="cursor-pointer flex items-center gap-2 border border-[#3CB371] text-[#3CB371] px-6 py-3 rounded-lg font-semibold hover:bg-[#3CB371] hover:text-white transition-colors">
                Learn More
                <GoArrowUpRight />
            </button>

            {/* Modal Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[95vw] max-w-[95vw] p-0 sm:max-w-md  rounded-3xl">
                    {/* IMAGE */}
                    <div className="relative w-full h-60 sm:h-80 rounded-t-3xl overflow-hidden">
                        <Image src="/modalphoto.png" alt="House Cleaning Service" fill className="object-cover" />
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#3CB371] rounded-full p-1.5 sm:p-2 text-white">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 sm:p-6 pt-0! flex flex-col gap-4">
                        <div>
                            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">House Cleaning Service</DialogTitle>

                            <DialogDescription className="text-gray-600 text-sm leading-relaxed">
                                Cozy cabin nestled in Iceland&apos;s breathtaking landscape, offering stunning views of mountains and Northern Lights. For the routine weekly refresh, bring in a deeper layer: mop the floors properly, scrub the bathroom tiles and toilet, dust furniture and fans, change bed sheets, and clean the microwave so the kitchen doesn&apos;t build up grime. A monthly reset
                                helps you stay ahead of the chaos: deep-clean kitchen cabinets and oily corners, wash curtains or cushion covers, clean windows, polish furniture, and tackle those &quot;hidden zone&quot; like under the bed or behind sofas.
                            </DialogDescription>
                        </div>

                        <div className="flex items-center justify-end">
                            <Link href="/checkout">
                                <Button className="bg-[#3CB371] hover:bg-[#3CB371] text-white font-semibold py-2 md:py-4 h-auto rounded-lg text-base px-8 md:px-14 cursor-pointer">Book</Button>
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

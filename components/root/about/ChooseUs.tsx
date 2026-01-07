import Image from "next/image";
import { FaRegCircleCheck } from "react-icons/fa6";

const ChooseUs = () => {
    return (
        <div>
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        {/* <h2 className="text-4xl font-bold text-[#5E5E5E] mb-4">Our Values</h2>
                        <p className="text-xl text-[#7A8A9E]  mx-auto">See the reasons for that.</p> */}
                        <h2 className="text-4xl font-bold text-[#5E5E5E] mb-4">BENEFITS</h2>
                        <p className="text-xl text-[#7A8A9E]  mx-auto">What This Means for You</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                        {/* First Box - Original Layout */}
                        <div className="relative md:min-h-[400px]">
                            <Image src="/home/about/choseus1.svg" alt="Why cline choose us" width={445} height={300} className="w-4/5 hidden md:block h-[300px] object-cover rounded-[18px]"></Image>
                            <div className="rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-4 bg-white flex flex-col gap-3 ml-auto md:absolute top-1/2 right-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>

                                    <p className="text-[#7A8A9E]">Fully insured and bonded for peace of mind</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Transparent pricing with no surprises</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Background-checked, trained cleaning teams</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Consistent results with detailed cleaning checklists</p>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Fully insured and bonded for your peace of mind</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Transparent pricing with no hidden fees</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Background-checked and vetted team members</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Consistent quality with detailed cleaning checklists</p>
                                </div> */}
                            </div>
                        </div>

                        {/* Second Box - Modified Layout */}
                        <div className="relative md:min-h-[400px]">
                            {/* Image at bottom right */}
                            <Image src="/home/about/choseus2.svg" alt="Why cline choose us" width={445} height={300} className="w-4/5 md:absolute bottom-0 right-0 hidden md:block h-[300px] rounded-[18px] object-cover" />
                            {/* Absolute content at left top */}
                            <div className="rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-4 bg-white flex flex-col gap-3 md:absolute top-0 left-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>

                                    <p className="text-[#7A8A9E]">Fully insured and bonded for peace of mind</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Transparent pricing with no surprises</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Background-checked, trained cleaning teams</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Consistent results with detailed cleaning checklists</p>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Fully insured and bonded for your peace of mind</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Transparent pricing with no hidden fees</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Background-checked and vetted team members</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <FaRegCircleCheck className="text-[#3CB371] text-xl w-5 h-5" />
                                    </div>
                                    <p className="text-[#7A8A9E]">Consistent quality with detailed cleaning checklists</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-20 border border-[#3CB371] rounded-2xl p-6 shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)]">
                        <div className="flex items-center justify-center flex-col">
                            <h2 className="font-bold text-center text-3xl md:text-5xl text-[#5E5E5E] mb-2">1.5</h2>
                            <p className="font-medium text-2xl md:text-3xl text-[#5e5e5e]">Years Experience</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h2 className="font-bold text-center text-3xl md:text-5xl text-[#5E5E5E] mb-2">500+</h2>
                            <p className="font-medium text-2xl md:text-3xl text-[#5e5e5e]">Happy Clients</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h2 className="font-bold text-center text-3xl md:text-5xl text-[#5E5E5E] mb-2">1500+</h2>
                            <p className="font-medium text-2xl md:text-3xl text-[#5e5e5e]">Spaces Cleaned</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h2 className="font-bold text-center text-3xl md:text-5xl text-[#5E5E5E] mb-2">97%</h2>
                            <p className="font-medium text-2xl md:text-3xl text-[#5e5e5e]">Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;

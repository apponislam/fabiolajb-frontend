import Image from "next/image";

const HomeQuoteSection = () => {
    return (
        <section className="text-black py-16 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <button className="text-[#5E5E5E] px-6 py-3 bg-white border-b border-[#3CB371] rounded-xl mb-5">Quote</button>
                    <h2 className="text-[34px] md:text-[34px] font-medium">
                        Fill in your details to get a <span className="text-[#3CB371]">quote instantly.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left Side - Image with Text Overlay */}
                    <div className="relative h-full">
                        <Image src="/home/picture1.svg" alt="Quote" width={600} height={500} className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute bottom-4 right-4 text-[#797979] p-4 rounded-lg max-w-60 md:max-w-xs">
                            <p className="text-sm md:text-[16px]">Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white rounded-2xl p-6">
                        <form className="space-y-3">
                            {/* Full Name & Cleaning Frequency */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
                                    <input type="text" defaultValue="John Doe" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Cleaning Frequency</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors">
                                        <option value="">Select frequency</option>
                                        <option value="once">One Time</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="biweekly">Bi-Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                            </div>

                            {/* Email & Date/Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
                                    <input type="email" defaultValue="john.doe@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Preferred Date & Time</label>
                                    <input type="text" defaultValue="mm/dd/yyyy --:-- --" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                                </div>
                            </div>

                            {/* Phone & Address */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
                                    <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Service Address</label>
                                    <input type="text" defaultValue="123 Main Street, Suite 100, City, State, ZIP" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                                </div>
                            </div>

                            {/* Business Name & Property Size */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Business Name</label>
                                    <input type="text" defaultValue="ABC Corporation" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Property Size / Area (sq.ft)</label>
                                    <input type="text" defaultValue="1500" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors" />
                                </div>
                            </div>

                            {/* Service Type */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Service Type</label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors">
                                    <option value="">Select a service</option>
                                    <option value="residential">Residential Cleaning</option>
                                    <option value="commercial">Commercial Cleaning</option>
                                    <option value="deep">Deep Cleaning</option>
                                    <option value="move">Move In/Out Cleaning</option>
                                </select>
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Additional Notes</label>
                                <textarea rows={2} defaultValue="Any special requirements or additional information..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#3CB371] transition-colors resize-none" />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="w-full bg-[#3CB371] text-white py-2 rounded-lg font-semibold hover:bg-[#35a065] transition-colors">
                                Submit Quote Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeQuoteSection;

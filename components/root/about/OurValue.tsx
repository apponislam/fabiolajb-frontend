import Image from "next/image";

const OurValue = () => {
    return (
        <div className="bg-white py-8 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#5E5E5E] mb-2 md:mb-4">Our Values</h2>
                    <p className="md:text-xl text-[#7A8A9E]  mx-auto">The principles that guide everything we do</p>
                </div>

                <div className="flex items-stretch gap-7 mb-4">
                    <div className="w-28 hidden md:block">
                        <Image src="/home/about/picture1.svg" alt="Picture" width={112} height={226} className="w-28 h-full object-cover rounded-2xl "></Image>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-6">
                            <Image src="/home/about/icon1.svg" alt="Value 1" width={64} height={64} className="mb-4 rounded-2xl"></Image>
                            <p className="text-center mb-4">Care & Compassion</p>
                            <p className="text-center text-[#7A8A9E]">We treat every space as if it were our own, with genuine care and attention.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-6">
                            <Image src="/home/about/icon2.svg" alt="Value 1" width={64} height={64} className="mb-4 rounded-2xl"></Image>
                            <p className="text-center mb-4">Customer First</p>
                            <p className="text-center text-[#7A8A9E]">Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.</p>
                        </div>
                        <div className="hidden md:block">
                            <Image src="/home/about/picture2.svg" alt="Value 1" width={358} height={216} className="w-full rounded-2xl"></Image>
                        </div>
                    </div>
                </div>

                <div className="flex items-stretch gap-7">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="hidden md:block">
                            <Image src="/home/about/picture3.svg" alt="Value 1" width={358} height={216} className="w-full"></Image>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-6">
                            <Image src="/home/about/icon3.svg" alt="Value 1" width={64} height={64} className="mb-4 rounded-2xl"></Image>
                            <p className="text-center mb-4">Excellence</p>
                            <p className="text-center text-[#7A8A9E]">We maintain the highest standards in every job, big or small.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-[0px_6px_30px_-6px_rgba(88,92,95,0.102)] p-6">
                            <Image src="/home/about/icon4.svg" alt="Value 1" width={64} height={64} className="mb-4 rounded-2xl"></Image>
                            <p className="text-center mb-4">Reliability</p>
                            <p className="text-center text-[#7A8A9E]">Count on us to be there when you need us, every single time.</p>
                        </div>
                    </div>
                    <div className="w-28 hidden md:block">
                        <Image src="/home/about/picture4.svg" alt="Picture" width={112} height={226} className="w-28 h-full object-cover rounded-2xl"></Image>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurValue;

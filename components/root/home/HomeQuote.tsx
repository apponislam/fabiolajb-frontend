import HomeQuoteFromBottom from "@/components/form/HomeQuoteFromBottom";
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
                    <div className="relative w-full  mx-auto rounded-[40px]">
                        <div className=" overflow-hidden rounded-[40px] h-full ">
                            <Image src="/home/image2.jpg" alt="Cleaning" width={1000} height={600} className="w-full h-full object-cover" />
                        </div>

                        <div className="absolute bottom-0 right-0">
                            <div className="relative bg-white p-4 md:p-8 w-64 md:w-auto md:max-w-sm text-[#797979] rounded-[40px] rounded-tr-none rounded-bl-none">
                                <p className="text-[12px] md:text-sm leading-relaxed">Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white rounded-2xl md:p-6">
                        <HomeQuoteFromBottom></HomeQuoteFromBottom>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeQuoteSection;

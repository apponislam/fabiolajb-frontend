import Image from "next/image";

const HomeAboutUs = () => {
    return (
        <section className="text-black py-16 px-4">
            <div className="container mx-auto">
                {/* About Us Heading */}

                <div className="text-center mb-8">
                    <button className="text-[#5E5E5E] px-6 py-3 bg-white border-b border-[#3CB371] rounded-xl mb-5">About Us</button>
                    <h2 className="text-[24px] md:text-[34px] font-medium ">
                        We Don’t Just Clean —{" "}
                        <span className="text-[#3CB371]">
                            {" "}
                            We Care for <br /> Every Corner of Your
                        </span>{" "}
                        Business.
                    </h2>
                </div>

                <div className="space-y-8 mb-16">
                    {/* First Row - Two images side by side with absolute text */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* First Image with absolute text bottom right */}
                        {/* <div className="relative">
                            <Image src="/home/picture1.svg" alt="About Us 1" width={600} height={400} className="w-full h-auto rounded-lg" />
                            <div className="absolute bottom-4 right-4 text-[#797979] p-4 rounded-lg max-w-60 md:max-w-xs">
                                <p className="text-sm md:text-[16px]">Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                            </div>
                        </div> */}

                        <div className="relative w-full max-w-5xl mx-auto rounded-[40px]">
                            <div className=" overflow-hidden rounded-[40px] h-full">
                                <Image src="/home/image2.jpg" alt="Cleaning" width={1000} height={600} className="w-full h-full object-cover" />
                            </div>

                            <div className="absolute bottom-0 right-0">
                                <div className="relative bg-white p-4 md:p-8 w-64 md:w-auto md:max-w-sm text-[#797979] rounded-[40px]">
                                    <p className="text-[12px] md:text-sm leading-relaxed">Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                                </div>
                            </div>
                        </div>

                        {/* Second Image with absolute text top left */}
                        {/* <div className="relative">
                            <Image src="/home/picture2.svg" alt="About Us 2" width={600} height={400} className="w-full h-auto rounded-lg" />
                            <div className="absolute top-4 left-4 text-[#797979] p-4 rounded-lg max-w-60 md:max-w-xs">
                                <p className="text-sm md:text-[16px]">Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                            </div>
                        </div> */}

                        <div className="relative w-full max-w-5xl mx-auto rounded-[40px]">
                            <div className=" overflow-hidden rounded-[40px]">
                                <Image src="/home/image1.jpg" alt="Cleaning" width={1000} height={600} className="w-full h-auto object-cover" />
                            </div>

                            <div className="absolute top-0 left-0">
                                <div className="relative bg-white p-4 md:p-8 w-64 md:w-auto md:max-w-sm text-[#797979] rounded-[40px]">
                                    <p className="text-[12px] md:text-sm leading-relaxed">Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Third Image with text below */}
                    <div>
                        <Image src="/home/picture3.svg" alt="About Us 3" width={1200} height={400} className="w-full h-auto rounded-lg mb-4" />
                        <p className="text-[#797979] text-sm text-center">
                            Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet. as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for
                            &apos;lorem ipsum&apos; will uncover many web sites still in their infancy.
                        </p>
                    </div>
                </div>
                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-[34px] font-medium text-[#3CB371] ">120+</div>
                        <div className="text-[#5E5E5E]">Home Cleaned</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[34px] font-medium text-[#3CB371] ">97%</div>
                        <div className="text-[#5E5E5E]">Customer Satisfaction</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[34px] font-medium text-[#3CB371] ">1.5</div>
                        <div className="text-[#5E5E5E]">Years Of Experience</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAboutUs;

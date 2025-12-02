import Image from "next/image";

const OurStory = () => {
    return (
        <div className="min-h-screen bg-white py-12 px-6">
            <div className="container mx-auto">
                {/* Main Heading */}
                <h1 className="text-2xl md:text-4xl font-medium text-[#5E5E5E] mb-6 text-center">
                    We Don&apos;t Just Clean —{" "}
                    <span className="text-[#3CB371]">
                        We Care for
                        <br className="hidden xl:block" />
                        Every Corner of Your
                    </span>{" "}
                    Business.
                </h1>

                {/* Subheading */}
                <p className="md:text-xl text-[#797979] text-center mb-16 leading-relaxed">
                    We&apos;re more than just a cleaning company – we&apos;re your partners in creating clean, <br /> healthy, and stress-free spaces where you can truly breathe easy.
                </p>

                {/* Story Section with Image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Story Text */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-[#5E5E5E]">Our Story</h2>
                        <div className="space-y-4 text-[#7A8A9E] leading-relaxed">
                            <p>Just Breathe Cleaning Services was founded with a simple mission: to help people reclaim their time and enjoy cleaner, healthier living and working spaces. We understand that life gets busy, and maintaining a clean environment shouldn&apos;t add to your stress.</p>
                            <p>What started as a small team with a passion for excellence has grown into a trusted name in professional cleaning services. Our commitment to quality, attention to detail, and customer satisfaction has earned us the trust of hundreds of homes and businesses.</p>
                            <p>Every member of our team shares the same dedication to making your space shine while providing a service experience that&apos;s reliable, professional, and genuinely caring.</p>
                            <p>Every member of our team shares the same dedication to making your space shine while providing a service experience that&apos;s reliable, professional, and genuinely caring.</p>
                            <p>Every member of our team shares the same dedication to making your space shine while providing a service experience that&apos;s reliable, professional, and genuinely caring.</p>
                            <p>Every member of our team shares the same dedication to making your space shine while providing a service experience that&apos;s reliable, professional, and genuinely caring.</p>
                        </div>
                    </div>

                    {/* Picture */}
                    <div className="relative bg-gray-200 rounded-lg h-96 lg:h-full min-h-[400px] flex items-center justify-center">
                        <Image src="/home/about/ourstory.svg" alt="Our Story" fill className="object-cover rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStory;

import Image from "next/image";

const OurStory = () => {
    return (
        <div className=" bg-white py-12 px-6">
            <div className="container mx-auto">
                {/* Main Heading */}
                <h1 className="text-2xl md:text-4xl font-medium text-[#5E5E5E] mb-6 text-center">
                    We Clean So You Can <span className="text-[#3CB371]">Just Breathe.</span>
                    {/* We Don&apos;t Just Clean —{" "}
                    <span className="text-[#3CB371]">
                        We Care for
                        <br className="hidden xl:block" />
                        Every Corner of Your
                    </span>{" "}
                    Business. */}
                </h1>

                {/* Subheading */}
                <p className="md:text-xl text-[#797979] text-center mb-16 leading-relaxed">
                    Reliable commercial cleaning designed to be simple, stress-free, and dependable <br />
                    <span className="text-[16px]">Serving offices, retail spaces, and commercial properties.</span>
                    {/* We&apos;re more than just a cleaning company – we&apos;re your partners in creating clean, <br /> healthy, and stress-free spaces where you can truly breathe easy. */}
                </p>

                {/* Story Section with Image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Story Text */}
                    <div className="space-y-6">
                        {/* <h2 className="text-2xl font-bold text-[#5E5E5E]">Our Story</h2> */}
                        <h2 className="text-2xl font-bold text-[#5E5E5E]">Built for Businesses That Value Simplicity</h2>
                        <div className="space-y-4 text-[#7A8A9E] leading-relaxed">
                            <p>Just Breathe was created with one clear goal:</p>
                            <p>to make commercial cleaning easy, reliable, and worry-free.</p>
                            <p>We know managing a business comes with enough moving parts. Cleaning shouldn’t be one of them. That’s why we focus on clear communication, flexible scheduling, and consistent results—every time.</p>
                            <p>No complications. No guesswork. Just clean spaces you can count on.</p>
                            {/* <p>Just Breathe Cleaning Services was founded with a simple mission: to help people reclaim their time and enjoy cleaner, healthier living and working spaces. We understand that life gets busy, and maintaining a clean environment shouldn&apos;t add to your stress.</p>
                            <p>What started as a small team with a passion for excellence has grown into a trusted name in professional cleaning services. Our commitment to quality, attention to detail, and customer satisfaction has earned us the trust of hundreds of homes and businesses.</p>
                            <p>Every member of our team shares the same dedication to making your space shine while providing a service experience that&apos;s reliable, professional, and genuinely caring.</p>
                            <p>Every member of our team shares the same dedication to making your space shine while providing a service experience that&apos;s reliable, professional, and genuinely caring.</p>
                            <p>Every member of our team shares the same dedication to making your space shine while providing a service experience that&apos;s reliable, professional, and genuinely caring.</p>
                            <p>Every member of our team shares the same dedication to making your space shine while providing a service experience that&apos;s reliable, professional, and genuinely caring.</p> */}
                        </div>
                    </div>

                    {/* Picture */}
                    <div className="relative bg-gray-200 rounded-lg h-96 lg:h-full min-h-[300px] flex items-center justify-center">
                        <Image src="/home/about/ourstory.svg" alt="Our Story" fill className="object-cover rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStory;

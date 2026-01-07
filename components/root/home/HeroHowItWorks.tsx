const HeroHowItWorks = () => {
    return (
        <section className="text-black py-16 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <button className="text-[#5E5E5E] px-6 py-3 bg-white border-b border-[#3CB371] rounded-xl mb-5">How It Work</button>
                    <h2 className="text-[24px] md:text-[34px] font-medium ">
                        Clean Spaces in <span className="text-[#3CB371]">3 Easy Steps</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex items-center justify-center flex-col gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#3CB371] flex items-center justify-center text-xl text-white"> 1</div>
                        <h3 className="text-center font-medium text-[#5e5e5e]">Request a Quote</h3>
                        <p className="text-center text-[#797979]">Tell us a few details about your space—it <br /> takes less than 2 minutes. </p>
                    </div>
                    <div className="flex items-center justify-center flex-col gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#3CB371] flex items-center justify-center text-xl text-white">2</div>
                        <h3 className="text-center font-medium text-[#5e5e5e]">Choose Your Schedule</h3>
                        <p className="text-center text-[#797979]">We work around your business hours <br /> with flexible cleaning options. </p>
                    </div>
                    <div className="flex items-center justify-center flex-col gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#3CB371] flex items-center justify-center text-xl text-white">3</div>
                        <h3 className="text-center font-medium text-[#5e5e5e]">Breathe Easy </h3>
                        <p className="text-center text-[#797979]">Our professional team handles the rest. <br /> Reliable. Consistent. Done right. </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroHowItWorks;

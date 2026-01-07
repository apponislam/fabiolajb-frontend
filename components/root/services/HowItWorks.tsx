const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Request a Quote",
            description: "Tell us a few details about your space—it takes less than 2 minutes.",
        },
        {
            number: "2",
            title: "Choose Your Schedule",
            description: "We work around your business hours with flexible cleaning options.",
        },
        {
            number: "3",
            title: "Breathe Easy",
            description: "Our professional team handles the rest. Reliable. Consistent. Done right. ",
        },
        // {
        //     number: "4",
        //     title: "Enjoy & Relax",
        //     description: "Breathe easy in your fresh, clean environment",
        // },
    ];

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium text-[#797979] mb-4">How It Work</h2>
                    <p className="text-xl text-[#797979] max-w-2xl mx-auto">Clean Spaces in 3 Easy Steps</p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 bg-[#3CB371] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">{step.number}</div>
                            <h3 className="text-[#000000] mb-3">{step.title}</h3>
                            <p className="text-[#7A8A9E] text-[14px] ">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;

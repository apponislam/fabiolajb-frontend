const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Get a Quote",
            description: "Fill out our quick form to receive an instant quote",
        },
        {
            number: "2",
            title: "Schedule Service",
            description: "Choose a date and time that works best for you",
        },
        {
            number: "3",
            title: "We Clean",
            description: "Our professional team arrives and cleans your space",
        },
        {
            number: "4",
            title: "Enjoy & Relax",
            description: "Breathe easy in your fresh, clean environment",
        },
    ];

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium text-[#797979] mb-4">How It Works</h2>
                    <p className="text-xl text-[#797979] max-w-2xl mx-auto">Getting started is easy</p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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

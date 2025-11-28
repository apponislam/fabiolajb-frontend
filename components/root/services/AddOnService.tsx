import { FaRegCircleCheck } from "react-icons/fa6";

const AddOnService = () => {
    const services = ["Interior refrigerator cleaning", "Oven deep cleaning", "Laundry wash & fold", "Interior window cleaning", "Plant watering", "Mail collection"];

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium text-[#797979] mb-4">Add-On Services</h2>
                    <p className="text-xl text-[#797979] max-w-2xl mx-auto">Customize your cleaning package with these convenient extras.</p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <div key={index} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors border border-[#F3F4F6] bg-[#F9FAFB]">
                            <FaRegCircleCheck className="text-[#3CB371] text-xl shrink-0" />
                            <p className="text-[#364153] text-lg">{service}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddOnService;

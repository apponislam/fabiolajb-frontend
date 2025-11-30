import { CleaningServiceModal } from "@/components/ServiceCard";
import Image from "next/image";
// import { GoArrowUpRight } from "react-icons/go";

const HomeServices = () => {
    const services = [
        {
            id: 1,
            title: "Office Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
        {
            id: 2,
            title: "Spring Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
        {
            id: 3,
            title: "House Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
    ];

    return (
        <section className="text-black py-16 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button className="text-[#5E5E5E] px-6 py-3 bg-white border-b border-[#3CB371] rounded-xl mb-5">Services</button>
                    <h2 className="text-[34px] md:text-[34px] font-medium">
                        We always <span className="text-[#3CB371]">provide the best service</span>
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="w-full">
                            <Image src={service.image} alt={service.title} width={400} height={300} className="w-full h-64 object-cover rounded-[30px] mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                            <p className="text-gray-600 mb-6">{service.description}</p>
                            {/* <button className="flex items-center gap-2 border border-[#3CB371] text-[#3CB371] px-6 py-3 rounded-lg font-semibold hover:bg-[#3CB371] hover:text-white transition-colors">
                                Learn More
                                <GoArrowUpRight />
                            </button> */}
                            <CleaningServiceModal></CleaningServiceModal>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeServices;

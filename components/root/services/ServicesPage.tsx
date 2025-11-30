import { CleaningServiceModal } from "@/components/ServiceCard";
import Image from "next/image";
// import { GoArrowUpRight } from "react-icons/go";

const ServicesPage = () => {
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
        {
            id: 4,
            title: "Office Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
        {
            id: 5,
            title: "Spring Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
        {
            id: 6,
            title: "House Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
        {
            id: 7,
            title: "Office Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
        {
            id: 8,
            title: "Spring Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
        {
            id: 9,
            title: "House Cleaning",
            description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
            image: "/home/Image.svg",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 max-w-4xl mx-auto leading-tight">
                        We Don&apos;t Just Clean —
                        <span className="text-[#3CB371]">
                            {" "}
                            We Care for <br /> Every Corner of Your{" "}
                        </span>
                        Business.
                    </h1>
                    <p className="text-[14px] text-[#797979] text-center">
                        We&apos;re more than just a cleaning company – we&apos;re your partners in creating clean, <br /> healthy, and stress-free spaces where you can truly breathe easy.
                    </p>
                </div>
            </section>

            {/* Services Grid - Directly after hero without extra header */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
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
        </div>
    );
};

export default ServicesPage;

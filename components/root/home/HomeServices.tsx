// import { CleaningServiceModal } from "@/components/ServiceCard";
// import Image from "next/image";

// const HomeServices = () => {
//     const services = [
//         {
//             id: 1,
//             title: "Office Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//         {
//             id: 2,
//             title: "Spring Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//         {
//             id: 3,
//             title: "House Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//     ];

//     return (
//         <section className="text-black py-16 px-4">
//             <div className="container mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <button className="text-[#5E5E5E] px-6 py-3 bg-white border-b border-[#3CB371] rounded-xl mb-5">Services</button>
//                     <h2 className="text-[34px] md:text-[34px] font-medium">
//                         We always <span className="text-[#3CB371]">provide the best service</span>
//                     </h2>
//                 </div>

//                 {/* Services Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {services.map((service) => (
//                         <div key={service.id} className="w-full">
//                             <Image src={service.image} alt={service.title} width={400} height={300} className="w-full h-64 object-cover rounded-[30px] mb-4" />
//                             <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
//                             <p className="text-gray-600 mb-6">{service.description}</p>
//                             <CleaningServiceModal></CleaningServiceModal>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HomeServices;

"use client";
import { CleaningServiceModal } from "@/components/ServiceCard";
import Image from "next/image";
import { useGetActiveServicesQuery } from "@/redux/features/services/servicesApi";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const HomeServices = () => {
    // Fetch active services from API
    const { data: servicesData, isLoading, error } = useGetActiveServicesQuery(undefined);

    // Get only first 3 services or empty array if loading/error
    const services = servicesData?.data?.slice(0, 3) || [];

    // Get base URL from environment variable
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "";

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

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#3CB371]"></div>
                        <p className="text-gray-600 mt-4">Loading services...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="text-center py-12">
                        <p className="text-red-500">Failed to load services. Please try again.</p>
                    </div>
                )}

                {/* Services Grid */}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service: any) => {
                            // Construct full image URL
                            const imageUrl = service.image ? `${baseUrl}${service.image}` : "/home/Image.svg"; // Fallback image

                            return (
                                <div key={service._id} className="w-full flex flex-col justify-between">
                                    {/* Service Image */}
                                    <div>
                                        <div className="relative w-full h-64 mb-4 rounded-[30px] overflow-hidden">
                                            <Image
                                                src={imageUrl}
                                                alt={service.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                onError={(e) => {
                                                    // Fallback to default image if fails to load
                                                    (e.target as HTMLImageElement).src = "/home/Image.svg";
                                                }}
                                            />
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                                        <p className="text-gray-600 mb-6">{service.description}</p>
                                    </div>

                                    {/* Service Modal */}
                                    <div>
                                        <CleaningServiceModal serviceId={service._id} serviceTitle={service.title} serviceDescription={service.description} servicePrice={service.price} serviceImage={service.image} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Show message if no services */}
                {!isLoading && !error && services.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No services available at the moment.</p>
                    </div>
                )}
                {/* Bottom Right Button - View All Services */}
                <div className="flex justify-end mt-6">
                    <Link href="/services" className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#3CB371] text-white hover:bg-[#35a065] transition-colors duration-200 shadow-lg hover:shadow-xl" aria-label="View all services">
                        <FiArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeServices;

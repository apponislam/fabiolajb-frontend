// import { CleaningServiceModal } from "@/components/ServiceCard";
// import Image from "next/image";
// // import { GoArrowUpRight } from "react-icons/go";

// const ServicesPage = () => {
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
//         {
//             id: 4,
//             title: "Office Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//         {
//             id: 5,
//             title: "Spring Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//         {
//             id: 6,
//             title: "House Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//         {
//             id: 7,
//             title: "Office Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//         {
//             id: 8,
//             title: "Spring Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//         {
//             id: 9,
//             title: "House Cleaning",
//             description: "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services.",
//             image: "/home/Image.svg",
//         },
//     ];

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Hero Section */}
//             <section className="px-4">
//                 <div className="container mx-auto text-center">
//                     <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 max-w-4xl mx-auto leading-tight">
//                         We Don&apos;t Just Clean —
//                         <span className="text-[#3CB371]">
//                             {" "}
//                             We Care for <br className="hidden xl:block" /> Every Corner of Your{" "}
//                         </span>
//                         Business.
//                     </h1>
//                     <p className="text-[14px] text-[#797979] text-center">
//                         We&apos;re more than just a cleaning company – we&apos;re your partners in creating clean, <br /> healthy, and stress-free spaces where you can truly breathe easy.
//                     </p>
//                 </div>
//             </section>

//             {/* Services Grid - Directly after hero without extra header */}
//             <section className="py-16 px-4">
//                 <div className="container mx-auto">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {services.map((service) => (
//                             <div key={service.id} className="w-full">
//                                 <Image src={service.image} alt={service.title} width={400} height={300} className="w-full h-64 object-cover rounded-[30px] mb-4" />
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
//                                 <p className="text-gray-600 mb-6">{service.description}</p>

//                                 <CleaningServiceModal></CleaningServiceModal>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default ServicesPage;

"use client";
import { CleaningServiceModal } from "@/components/ServiceCard";
import Image from "next/image";
import { useGetActiveServicesQuery } from "@/redux/features/services/servicesApi";

const ServicesPage = () => {
    // Fetch all active services from API
    const { data: servicesData, isLoading, error } = useGetActiveServicesQuery(undefined);

    // Get all services or empty array if loading/error
    const services = servicesData?.data || [];

    // Get base URL from environment variable
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "";

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="px-4 py-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 max-w-4xl mx-auto leading-tight">
                        We Don&apos;t Just Clean —
                        <span className="text-[#3CB371]">
                            {" "}
                            We Care for <br className="hidden xl:block" /> Every Corner of Your{" "}
                        </span>
                        Business.
                    </h1>
                    <p className="text-[14px] text-[#797979] text-center">
                        We&apos;re more than just a cleaning company – we&apos;re your partners in creating clean, <br /> healthy, and stress-free spaces where you can truly breathe easy.
                    </p>
                </div>
            </section>

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

            {/* Services Grid - Directly after hero without extra header */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    {!isLoading && !error && services.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {services.map((service: any) => {
                                // Construct full image URL
                                const imageUrl = service.image ? `${baseUrl}${service.image}` : "/home/Image.svg";

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
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;

import { servicesData } from "@/components/dashboard/service/demoServiceData";
import { ServiceList } from "@/components/dashboard/service/ServiceList";
import React from "react";

const page = () => {
    return (
        <div className="p-4 md:p-6">
            <ServiceList services={servicesData} itemsPerPage={5} />
        </div>
    );
};

export default page;

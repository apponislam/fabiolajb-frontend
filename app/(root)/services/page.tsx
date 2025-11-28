import AddOnService from "@/components/root/services/AddOnService";
import HowItWorks from "@/components/root/services/HowItWorks";
import ServicesPage from "@/components/root/services/ServicesPage";
import React from "react";

const page = () => {
    return (
        <>
            <ServicesPage></ServicesPage>
            <AddOnService></AddOnService>
            <HowItWorks></HowItWorks>
        </>
    );
};

export default page;

import QuoteCard from "@/components/dashboard/overview/QuoteCard";
import { RevenueOverviewChart } from "@/components/dashboard/overview/RevenueOverviewChart";
import { MonthlyQuoteChart } from "@/components/dashboard/overview/QuoteChart";
import { ContactChart } from "@/components/dashboard/overview/ContactChart";
// import { TrafficByDeviceChart } from "@/components/dashboard/overview/TraficChart";

const page = () => {
    return (
        <div className="p-4 md:p-6">
            <QuoteCard></QuoteCard>
            <RevenueOverviewChart></RevenueOverviewChart>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* <TrafficByLocationChart></TrafficByLocationChart> */}
                {/* <TrafficByDeviceChart></TrafficByDeviceChart> */}
                <MonthlyQuoteChart></MonthlyQuoteChart>
                <ContactChart></ContactChart>
            </div>
        </div>
    );
};

export default page;

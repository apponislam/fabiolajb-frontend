import { TrafficByLocationChart } from "@/components/dashboard/overview/LocactionChart";
import QuoteCard from "@/components/dashboard/overview/QuoteCard";
import { QuoteRequestChart } from "@/components/dashboard/overview/QuoteChart";
import { TrafficByDeviceChart } from "@/components/dashboard/overview/TraficChart";

const page = () => {
    return (
        <div className="p-4 md:p-6">
            <QuoteCard></QuoteCard>
            {/* <QuoteChart></QuoteChart> */}
            <QuoteRequestChart></QuoteRequestChart>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrafficByLocationChart></TrafficByLocationChart>
                <TrafficByDeviceChart></TrafficByDeviceChart>
            </div>
        </div>
    );
};

export default page;

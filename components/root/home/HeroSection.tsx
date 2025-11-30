import QuoteForm from "@/components/form/QuoteForm";
import { MdAddCall } from "react-icons/md";

const HeroSection = () => {
    return (
        <section className="min-h-screen bg-[url('/home/herohome.png')] bg-cover bg-center bg-no-repeat py-24 md:py-12 px-4 relative">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-12 items-center">
                {/* Left Side - Content */}
                <div className="space-y-6 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Breathe Easy.
                        <br />
                        <span className="text-[#3CB371]">We&apos;ll Handle</span> the Mess.
                    </h1>
                    <p className="text-white/70 text-lg leading-relaxed">Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                    <button className="flex items-center gap-3 bg-[#3CB371] text-white px-8 py-4 rounded-[30px] font-semibold hover:bg-[#35a065] transition-colors">
                        <MdAddCall className="text-white" />
                        Call Now
                    </button>
                </div>

                <QuoteForm />
            </div>
        </section>
    );
};

export default HeroSection;

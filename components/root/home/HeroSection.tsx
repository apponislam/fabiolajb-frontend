// import QuoteForm from "@/components/form/QuoteForm";
// import { MdAddCall } from "react-icons/md";

// const HeroSection = () => {
//     return (
//         <section className="min-h-screen bg-[url('/home/herohome.png')] bg-cover bg-center bg-no-repeat py-24 md:py-12 px-4 relative">
//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-black/60"></div>

//             {/* Content */}
//             <div className="relative z-10 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-12 items-center">
//                 {/* Left Side - Content */}
//                 <div className="space-y-6 text-white">
//                     <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//                         Breathe Easy.
//                         <br />
//                         <span className="text-[#3CB371]">We&apos;ll Handle</span> the Mess.
//                     </h1>
//                     <p className="text-white/70 text-lg leading-relaxed">Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
//                     <button className="flex items-center gap-3 bg-[#3CB371] text-white px-8 py-4 rounded-[30px] font-semibold hover:bg-[#35a065] transition-colors cursor-pointer">
//                         <MdAddCall className="text-white text-2xl" />
//                         Call Now
//                     </button>
//                 </div>

//                 <QuoteForm />
//             </div>
//         </section>
//     );
// };

// export default HeroSection;

import QuoteForm from "@/components/form/QuoteForm";
import Link from "next/link";
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
                        Commercial Cleaning,
                        <br />
                        <span className="text-[#3CB371]">Without the Hassle.</span>
                    </h1>

                    <p className="text-white/70 text-lg leading-relaxed">
                        Fast quotes. Flexible scheduling. Reliable cleaning—so <br className="hidden md:blockWe Don't Just Clean" /> you can just breathe.
                    </p>

                    {/* Supporting Bullets */}
                    <ul className="space-y-2 text-white/70">
                        <li className="flex items-start gap-2">
                            <span className="text-[#3CB371]">●</span>
                            <span>Simple booking in minutes</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#3CB371]">●</span>
                            <span>Cleaning plans that fit your business</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#3CB371]">●</span>
                            <span>Professional, dependable service</span>
                        </li>
                    </ul>
                    <Link href="/quote" className="inline-block">
                        <button className="flex items-center gap-3 bg-[#3CB371] text-white px-8 py-4 rounded-[30px] font-semibold hover:bg-[#35a065] transition-colors cursor-pointer">
                            <MdAddCall className="text-white text-2xl" />
                            Get a Fast Quote
                        </button>
                    </Link>
                </div>
                <QuoteForm />
            </div>
        </section>
    );
};

export default HeroSection;

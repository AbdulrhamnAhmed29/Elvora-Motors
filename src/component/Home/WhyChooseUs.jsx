import React from "react";
import { FaShieldAlt, FaCarSide, FaMoneyBillWave } from "react-icons/fa";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaShieldAlt />,
            title: "5 Years Warranty",
            desc: "Drive with total peace of mind knowing your car is protected for the long road ahead.",
        },
        {
            icon: <FaCarSide />,
            title: "150-Point Inspection",
            desc: "Every car goes through a detailed 150-point check to ensure top quality and performance.",
        },
        {
            icon: <FaMoneyBillWave />,
            title: "Zero Down Payment",
            desc: "Own your dream car today with flexible installment plans and no upfront payment.",
        },
    ];

    return (
        <section className="py-24 bg-stone-950 relative overflow-hidden">
            {/* لمسة إضاءة خفيفة في الخلفية عشان تكسر السواد */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                
                {/* Header */}
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-4">
                        Why <span className="text-gray-500">Choose Us</span>
                    </h2>
                    <div className="w-20 h-[2px] bg-white mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
                        We provide more than just cars — we deliver trust, quality, and value
                        in every vehicle we offer.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/[0.02] border border-white/10 p-10 rounded-2xl transition-all duration-500 hover:bg-white/[0.05] hover:-translate-y-2 hover:border-white/20"
                        >
                            {/* Icon Wrapper */}
                            <div className="text-white text-5xl mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-black uppercase tracking-widest text-white mb-4 italic">
                                {item.title}
                            </h3>

                            <p className="text-gray-400 font-light leading-relaxed">
                                {item.desc}
                            </p>

                            {/* Decorative Line on Hover */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
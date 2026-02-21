import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
        name: "Omar Khaled",
        role: "BMW 520i Owner", 
        text: "I had an amazing experience with Elvora Motors. What really impressed me was their after-sales service. The team followed up with me even after the purchase.",
        image: "/image/test1.png",
    },
    {
        name: "Reem Adel",
        role: "Mercedes C200 Owner",
        text: "Buying my car through Elvora Motors was incredibly smooth. The installment process was simple, clear, and stress-free. They helped me choose the best plan.",
        image: "/image/test2.png",
    },
    {
        name: "Youssef Tarek",
        role: "Audi A6 Owner",
        text: "The quality of the car exceeded my expectations. It feels brand new, runs perfectly, and you can tell it was thoroughly inspected. Premium trusted quality.",
        image: "/image/test3.png",
    },
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-4">
                        users <span className="text-gray-500"> Reviews</span>
                    </h2>
                    <div className="w-20 h-[2px] bg-white mx-auto mb-6"></div>
                    <p className="text-gray-400 font-light tracking-widest uppercase text-xs">
                        Real experiences from our distinguished members
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-stone-900/30 border border-white/5 p-8 rounded-sm transition-all duration-500 hover:bg-stone-900/60 hover:border-white/20"
                        >
                            {/* Quote Icon */}
                            <FaQuoteLeft className="absolute top-6 right-8 text-white/5 text-4xl group-hover:text-white/10 transition-colors" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-white text-black rounded-full p-1">
                                        <FaStar size={8} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white uppercase tracking-tight italic">{item.name}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 text-white/20 mb-4 group-hover:text-yellow-500 transition-colors duration-700">
                                {[...Array(5)].map((_, i) => <FaStar key={i} size={12} />)}
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed font-light italic">
                                "{item.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </section>
    );
};

export default TestimonialsSection;
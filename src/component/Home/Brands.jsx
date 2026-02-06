import React from 'react';
import {
    SiMercedes, SiBmw, SiToyota, SiAudi,
    SiPorsche, SiTesla, SiLandrover, SiVolkswagen
} from 'react-icons/si';

const BrandsSection = () => {
    const brands = [
        { icon: <SiMercedes size={45} />, name: "Mercedes" },
        { icon: <SiBmw size={45} />, name: "BMW" },
        { icon: <SiToyota size={45} />, name: "Toyota" },
        { icon: <SiAudi size={45} />, name: "Audi" },
        { icon: <SiPorsche size={45} />, name: "Porsche" },
        { icon: <SiTesla size={45} />, name: "Tesla" },
        { icon: <SiLandrover size={45} />, name: "Land Rover" },
        { icon: <SiVolkswagen size={45} />, name: "VW" },
    ];

    return (
        <section className="py-12 bg-stone-950 border-b border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-8">
                <p className="text-center text-xs uppercase tracking-[0.5em] text-gray-500 font-bold">
                    Authorised Dealer & Partner
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative flex overflow-x-hidden">
            
                <div className="flex animate-marquee whitespace-nowrap items-center gap-20 py-4">
                    {brands.concat(brands).map((brand, index) => (
                        <div
                            key={index}
                            className="text-gray-600 hover:text-white transition-colors duration-500 flex items-center gap-4 cursor-pointer grayscale hover:grayscale-0"
                        >
                            {brand.icon}
                            <span className="text-sm font-bold tracking-widest uppercase">{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default BrandsSection;
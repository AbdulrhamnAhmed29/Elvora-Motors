import React from 'react';
import { FiAward, FiTarget, FiUsers, FiCpu, FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Footer from '../../component/Layout/Footer';

function About() {
    const stats = [
        { icon: <FiAward />, count: "25+", label: "Years Excellence" },
        { icon: <FiUsers />, count: "10k+", label: "Elite Clients" },
        { icon: <FiCpu />, count: "100%", label: "Next-Gen Tech" },
    ];

    return (
        <>
            <div className="bg-black text-white min-h-screen pt-24 overflow-hidden">

                {/* 1. Hero Section */}
                <div className="container mx-auto px-6 py-20 relative">
                    <div className="max-w-4xl relative z-10">
                        <p className="text-stone-600 font-black text-[10px] uppercase tracking-[0.8em] mb-4">Established 2001</p>
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                            We don't build cars, <br />
                            <span className="text-stone-700">We build legacies.</span>
                        </h1>
                        <p className="text-stone-400 text-sm md:text-lg max-w-2xl font-medium leading-relaxed uppercase tracking-wide">
                            Founded in the heart of the industry, Elvora Motors has redefined the standards of luxury and innovation. We cater to those who don't just drive, but command the road.
                        </p>
                    </div>
                    <div className="absolute top-10 right-0 opacity-[0.02] pointer-events-none">
                        <span className="text-[250px] font-black italic leading-none">ELVORA</span>
                    </div>
                </div>

                {/* 2. Stats Section */}
                <div className="border-y border-white/5 bg-stone-900/10 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {stats.map((item, index) => (
                            <div key={index} className="space-y-4 group cursor-default">
                                <div className="text-stone-600 text-3xl flex justify-center group-hover:text-white transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-4xl font-black italic">{item.count}</h3>
                                <p className="text-[10px] font-black text-stone-700 uppercase tracking-[0.3em]">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. The Vision Section */}
                <div className="container mx-auto px-6 py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group overflow-hidden">
                            <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-all duration-700 z-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983"
                                alt="Engineering"
                                className="relative z-10 w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                            />
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <FiTarget className="text-stone-500" />
                                <span className="text-[10px] font-black text-stone-500 uppercase tracking-[0.4em]">Our Mission</span>
                            </div>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Precision in Every <span className="text-stone-700">Millimeter.</span></h2>
                            <p className="text-stone-400 text-sm leading-loose uppercase tracking-tighter">
                                A car is an extension of its owner's personality. That's why we obsess over every detail, from hand-stitched natural leathers to intelligent driving systems that are ahead of their time. Our engineering team doesn't follow trends—they set them.
                            </p>
                            <button className="flex items-center gap-4 px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-stone-200 transition-all">
                                Explore Our Craft <FiArrowRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. CTA Section */}
                <div className="container mx-auto px-6 pb-32">
                    <div className="p-16 border border-white/5 bg-stone-900/10 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-all"></div>
                        <h2 className="text-3xl font-black uppercase italic mb-8 relative z-10">
                            Ready to Join the Elite?
                        </h2>
                        <button className="relative z-10 px-12 py-4 border border-white text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
                            <Link to={'/contact'}>Talk to a Consultant</Link>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default About;
import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
    return (
        <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Fixed Effect (Parallax) */}
            <div
                className="absolute inset-0 bg-fixed bg-center bg-cover transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')" }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black"></div>

            <div className="relative z-10 text-center px-6">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 italic">
                    Ready to take <span className="text-gray-400">the wheel?</span>
                </h2>

                <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light tracking-wide">
                    Your dream car is just one click away. Book a private viewing or consult with our experts today.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    {/* Primary Button */}
                    <button className="w-full md:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-stone-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <Link to={"/contact"} > Book a Test Drive</Link>
                    </button>
                    {/* Secondary Button */}
                    <button className="w-full md:w-auto px-10 py-4 bg-transparent border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                        <Link to={"/contact"} >Contact Our Experts</Link>
                    </button>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </section>
    );
};

export default FinalCTA;
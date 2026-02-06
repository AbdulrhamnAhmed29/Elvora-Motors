import React from 'react';



function TopHeader() {
    return (
        <div className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4">
            <div className="container mx-auto flex  px-2 md:px-0 items-center justify-between">

                {/* Brand Logo / Section Title */}
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                    <span className=" md:text-4xl text-2xl  italic font-black uppercase tracking-tighter text-white">
                        ELVORA <span className="text-stone-600">MOTORS</span>
                        <span className="ms-2 text-[10px] normal-case font-light tracking-normal text-stone-500 italic">Admin Terminal</span>
                    </span>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden  md:hidden lg:block text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
                        System Status: <span className="text-green-500">Operational</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHeader;
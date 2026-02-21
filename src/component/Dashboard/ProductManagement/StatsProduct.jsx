import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductStats } from '../../../APi/ProductsRequests';
import { FaCheckCircle, FaCar } from "react-icons/fa";

function StatsProduct() {
    const { data: stats, isLoading, isError } = useQuery({
        queryKey: ['productStats'],
        queryFn: getProductStats,
    });

    const skeletons = Array.from({ length: 3 });

    if (isLoading) return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skeletons.map((_, index) => (
                <div key={index} className="h-40 bg-stone-900/20 border border-stone-800/50 rounded-sm animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-800/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                </div>
            ))}
        </div>
    );

    if (isError) return null;

    const statCards = [
        { 
            label: "Total Products", 
            value: stats?.total_cars ?? 0, 
            icon: <FaCar />, 
            desc: "Full vehicle inventory" 
        },
        { 
            label: "Available Products", 
            value: stats?.available_cars ?? 0, 
            icon: <FaCheckCircle />, 
            desc: "Ready for protocol" 
        },
  
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statCards.map((card, index) => (
                <div
                    key={index}
                    className="group relative bg-[#0c0a09] border border-white/5 p-8 rounded-sm hover:border-white/20 transition-all duration-500 overflow-hidden"
                >
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-4 -bottom-4 text-7xl text-white/[0.02] group-hover:text-white/[0.05] transition-all duration-700 rotate-12">
                        {card.icon}
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/5 rounded-sm text-stone-400 group-hover:text-white group-hover:bg-white/10 transition-all duration-500">
                                {card.icon}
                            </div>
                            <span className="text-[9px] font-black tracking-[0.3em] text-stone-500 uppercase">
                                {card.label}
                            </span>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <h3 className="text-4xl font-light text-white tracking-tighter italic">
                                {card.value.toLocaleString()}
                            </h3>
                            <span className="text-[10px] text-stone-700 font-bold uppercase tracking-widest">Units</span>
                        </div>
                        
                        <p className="text-[8px] text-stone-600 mt-4 uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {card.desc}
                        </p>
                    </div>

                    {/* Hover Bottom Line */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
            ))}
        </div>
    );
}

export default StatsProduct;
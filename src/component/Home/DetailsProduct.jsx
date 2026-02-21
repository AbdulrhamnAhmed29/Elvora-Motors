import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { getProductDetails } from '../../APi/PuplicRequests';

function DetailsProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product-client", id],
        queryFn: () => getProductDetails(id),
    });

    useEffect(() => {
        if (product?.title) {
            document.title = `Elvora | ${product.title}`;
        }
    }, [product]);

    if (isLoading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="text-white font-black italic text-2xl animate-pulse tracking-tighter">ELVORA LOADING...</div>
        </div>
    );

    if (isError) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="text-center">
                <p className="uppercase tracking-[0.5em] text-[10px] mb-4 text-stone-500">Asset Not Found // 404</p>
                <button onClick={() => navigate('/')} className="text-xs underline font-bold">Return to Hangar</button>
            </div>
        </div>
    );

    const handleWhatsApp = () => {
        const message = `Greetings Elvora, I'm interested in the ${product?.title}. Could you provide more details regarding the specs and acquisition?`;
        const url = `https://wa.me/201116045357?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // فورمايت السعر بشكل احترافي
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(product?.price || 0);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 relative overflow-hidden">
            
            {/* Header / Back */}
            <div className="max-w-7xl mx-auto p-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="group flex items-center gap-3 text-stone-500 hover:text-white transition-all uppercase text-[9px] font-black tracking-[0.4em]"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform"/> Back to Collection
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">

                {/* Left Side: Visuals */}
                <div className="relative">
                    <div className="aspect-[4/5] bg-stone-900 overflow-hidden rounded-sm border border-white/5 relative group shadow-2xl">
                        {product?.image ? (
                            <img
                                src={product.image}
                                alt={product?.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-stone-900">
                                <span className="text-stone-800 font-black italic">NO IMAGE</span>
                            </div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-8 left-8">
                            <span className={`px-5 py-2 text-[8px] font-black uppercase tracking-[0.3em] backdrop-blur-md border ${
                                product?.is_available === 1 || product?.is_available === "yes"
                                ? "bg-white/10 border-white/20 text-white"
                                : "bg-red-950/40 border-red-500/50 text-red-500"
                            }`}>
                                {product?.is_available === 1 || product?.is_available === "yes" ? "● In Stock" : "Reserved"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Data */}
                <div className="flex flex-col justify-center">
                    <header className="mb-12">
                        <span className="text-stone-600 text-[9px] font-black uppercase tracking-[0.8em] mb-4 block">Product Reference: {id?.slice(-5)}</span>
                        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
                            {product?.title}
                        </h1>
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl font-extralight tracking-tighter">{formattedPrice}</span>
                            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-widest">Excl. Taxes</span>
                        </div>
                    </header>

                    <div className="space-y-12 mb-16">
                        <div className="max-w-md">
                            <h3 className="text-stone-500 text-[8px] font-black uppercase tracking-widest mb-4 border-b border-white/10 pb-2 w-fit">Philosophy</h3>
                            <p className="text-stone-400 leading-relaxed font-light text-lg italic">
                                "{product?.description || "A masterpiece of modern engineering, designed for those who demand excellence without compromise."}"
                            </p>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
                            <div className="bg-black p-6">
                                <span className="block text-stone-600 text-[8px] uppercase font-black mb-1 tracking-widest">Transmission</span>
                                <span className="text-xs uppercase font-bold italic">Dual-Clutch Auto</span>
                            </div>
                            <div className="bg-black p-6">
                                <span className="block text-stone-600 text-[8px] uppercase font-black mb-1 tracking-widest">Year Model</span>
                                <span className="text-xs uppercase font-bold italic">2026 Edition</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleWhatsApp}
                            className="flex-1 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] py-6 flex items-center justify-center gap-3 hover:bg-stone-200 transition-all"
                        >
                            <FaWhatsapp size={16} />WhatsApp
                        </button>
                        <a
                            href="tel:+201116045357" 
                            className="flex-1 border border-white/10 hover:border-white/40 text-white font-black uppercase text-[10px] tracking-[0.3em] py-6 transition-all flex items-center justify-center gap-3"
                        >
                            <FaPhoneAlt size={12} /> Contact by Phone
                        </a>
                    </div>
                </div>
            </div>

            {/* Huge Background Text */}
            <div className="absolute -bottom-20 -left-20 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none z-0">
                <h2 className="text-[400px] font-black italic leading-none whitespace-nowrap">
                    {product?.title || "ELVORA"}
                </h2>
            </div>
        </div>
    );
}

export default DetailsProduct;
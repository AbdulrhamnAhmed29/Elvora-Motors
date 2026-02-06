import { useQuery } from "@tanstack/react-query";
import { getStats } from "../../../APi/UsersRequests";
import { FaUsers, FaUserShield, FaUserPlus, FaCalendarAlt } from "react-icons/fa";
import StatsProduct from "../ProductManagement/StatsProduct"; 

function DashboardHome() {
    const { data: stats, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: getStats,
    });

    const skeletons = Array.from({ length: 4 });

    if (isError) return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="bg-red-900/10 border border-red-900/50 p-6 rounded-sm text-center">
                <p className="text-red-500 font-mono tracking-tighter uppercase mb-2">
                    Critical Error: {error?.response?.status || "500"} 
                </p>
                <p className="text-red-800 text-[10px] uppercase tracking-widest">Protocol Breach or Connection Failed</p>
            </div>
        </div>
    );

    const statCards = [
        { label: "Total Users", value: stats?.totalUsers ?? 0, icon: <FaUsers />, desc: "Total registered personnel" },
        { label: "Daily Activity", value: stats?.todayNewUsers ?? 0, icon: <FaUserPlus />, desc: "New registrations today" },
        { label: "Monthly Activity", value: stats?.lastMonthUsers ?? 0, icon: <FaCalendarAlt />, desc: "Growth last 30 days" },
        { label: "Admins", value: stats?.adminsCount ?? 0, icon: <FaUserShield />, desc: "Authorized access levels" },
    ];

    return (
        <div className="p-6 lg:p-12 bg-black min-h-screen">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-black text-white italic tracking-[-0.05em] uppercase leading-none">
                    SYSTEM <span className="text-stone-800 font-light">OVERVIEW</span>
                </h1>
                <div className="h-1 w-24 bg-white mt-4"></div>
                <p className="text-[10px] text-stone-600 mt-4 tracking-[0.4em] uppercase font-bold">
                    Elvora Motors // Management Control Unit
                </p>
            </div>

{/* stats Product */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] bg-white text-black px-2 py-0.5 font-black uppercase tracking-tighter">Products </span>
                    <div className="h-[1px] flex-grow bg-white/5"></div>
                </div>
                <StatsProduct /> 
            </div>

{/* Stats Users  */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-0.5 font-black uppercase tracking-tighter">Personnel</span>
                    <div className="h-[1px] flex-grow bg-white/5"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading ? (
                        skeletons.map((_, index) => (
                            <div key={index} className="h-40 bg-stone-900/20 border border-stone-800/50 rounded-sm animate-pulse"></div>
                        ))
                    ) : (
                        statCards.map((card, index) => (
                            <div
                                key={index}
                                className="group relative bg-[#0c0a09] border border-white/5 p-8 rounded-sm hover:border-white/20 transition-all duration-500 overflow-hidden"
                            >
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
                                        <span className="text-[10px] text-stone-700 font-bold uppercase tracking-widest">Operators</span>
                                    </div>
                                    
                                    <p className="text-[8px] text-stone-600 mt-4 uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {card.desc}
                                    </p>
                                </div>
                                <div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-700"></div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* System Status Footer */}
            <div className="mt-20 flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full"></div>
                </div>
                <span className="text-[9px] text-stone-600 font-bold tracking-[0.4em] uppercase italic">
                    All Systems Operational // Data Encrypted // Elvora v2.0.1
                </span>
            </div>
        </div>
    );
}

export default DashboardHome;
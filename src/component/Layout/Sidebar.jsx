import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenuSharp, IoCloseSharp, IoLogOutOutline } from "react-icons/io5";
import { FaUsers, FaCarAlt } from "react-icons/fa";
import { MdPersonAdd, MdAddCircle, MdDashboard } from "react-icons/md";
import Swal from "sweetalert2";

function Sidebar() {
    const menuItems = [
        {
            name: "Overview ", icon: <MdDashboard size={20} />, path: "/dashboard"
        },
        { name: "User Management", icon: <FaUsers size={20} />, path: "/dashboard/users" },
        { name: "Create New User", icon: <MdPersonAdd size={20} />, path: "/dashboard/user/add" },
        { name: "Product Management", icon: <FaCarAlt size={20} />, path: "/dashboard/products" },
        { name: "Create New Product ", icon: <MdAddCircle size={20} />, path: "/dashboard/create" },
    ];
    const [open, setIsOpen] = useState(false);
    const location = useLocation();
    const Navref = useRef();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const toggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e) => {
            if (Navref.current && !Navref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);


    const adminName = localStorage.getItem("adminName") || "Admin";
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be leave the dashboard!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ffffff",
            cancelButtonColor: "#1c1917",
            confirmButtonText: "Yes, Leave",
            cancelButtonText: "Stay here",
            background: "#0c0a09",
            color: "#ffffff",
            customClass: {
                popup: 'rounded-none border border-white/10',
                confirmButton: 'text-black font-black uppercase tracking-widest text-xs py-3 px-6 rounded-none',
                cancelButton: 'text-white font-black uppercase tracking-widest text-xs py-3 px-6 rounded-none'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("adminName");
                window.location.href = "/home";
            }
        });
    };

    return (
        <>
            {/* btn toggle to mobile screen */}
            {!open && (
                <button
                    onClick={toggle}
                    className="md:hidden fixed bottom-8 left-6 z-[60] bg-white text-black p-4 rounded-full shadow-2xl active:scale-90 transition-all"
                >
                    <IoMenuSharp size={24} />
                </button>
            )}

            {open && (
                <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]" onClick={toggle} />
            )}
            <div
                ref={Navref}
                className={`fixed z-50 bg-[#0c0a09] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
                    
                    {/* mobile design  */}
                     
                bottom-0 left-0 w-full rounded-t-[2rem] border-t border-white/10 shadow-[0_-15px_30px_rgba(0,0,0,0.5)]
                ${open ? "h-[80vh] translate-y-0" : "h-0 translate-y-full"} 
                
                /* Desktop design*/
                md:top-20 md:left-0 md:h-screen md:w-auto md:border-r md:border-white/5 md:rounded-none md:translate-y-0 md:shadow-[10px_0_30px_rgba(0,0,0,0.5)]
                ${open ? "md:w-80" : " md:w-20 md:overflow-hidden"}`}
            >
                {/* toggle to mobile */}
                <div className="md:hidden w-12 h-1.5 bg-stone-800 rounded-full mx-auto mt-4 mb-2" onClick={toggle}></div>

                {/* Header Area */}
                <div className="flex items-center justify-between px-5 h-4 md:h-20 border-b border-white/5">
                    {(open || window.innerWidth > 768) && (
                        <span className={`text-white font-black tracking-tighter italic text-xl transition-all ${!open && "md:hidden"}`}>
                            ELVORA <span className="text-stone-600 uppercase">Motors</span>
                        </span>
                    )}
                    <button
                        onClick={toggle}
                        className="p-4 text-gray-400 hover:text-white transition-colors"
                    >
                        {open ? <IoCloseSharp size={24} /> : <div className="hidden md:block"><IoMenuSharp size={20} /></div>}
                    </button>
                </div>

                {/* Admin Profile Section */}
                <div className={`mt-5  px-0 transition-all duration-500`}>
                    <div className={`flex items-center gap-4 bg-white/[0.03] p-3 rounded-sm border border-white/5 ${!open && "md:justify-center md:bg-transparent md:border-none"}`}>
                        <div className="min-w-[40px] h-10 rounded-full bg-white text-black flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {adminName.charAt(0).toUpperCase()}
                        </div>
                        <div className={`${!open && "md:hidden"} overflow-hidden`}>
                            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest leading-none">Senior Admin</p>
                            <p className="text-white font-bold truncate capitalize mt-1 italic">{adminName}</p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="mt-8 md:mt-10 px-3 space-y-2  max-h-[45vh] md:max-h-none">
                    {menuItems.map((item, idx) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={idx}
                                to={item.path}
                                className={`group flex items-center relative p-3 rounded-sm transition-all duration-300
                                    ${isActive
                                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        : "text-stone-500 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <div className={`flex items-center justify-center ${!open ? "md:w-full" : "w-8"}`}>
                                    {item.icon}
                                </div>

                                <span className={`ml-3 text-xs font-black uppercase tracking-[0.15em] transition-all duration-500 whitespace-nowrap
                                    ${open ? "opacity-100 translate-x-0" : "md:opacity-0 md:-translate-x-10 md:w-0"}`}
                                >
                                    {item.name}
                                </span>

                                {isActive && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 
                                        border-t-[6px] border-t-transparent 
                                        border-b-[6px] border-b-transparent 
                                        border-r-[8px] border-r-black mr-[2px]">
                                    </div>
                                )}
                            </Link>
                        );
                    })}


                    <button
                        onClick={handleLogout}
                        className={`w-full group flex items-center relative p-3 rounded-sm transition-all duration-300 mt-4 border-t border-white/5 pt-5
    text-rose-500 hover:bg-rose-500/10 active:scale-95`}
                    >
                        <div className={`flex items-center justify-center ${!open ? "md:w-full" : "w-8"}`}>
                            <IoLogOutOutline size={22} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className={`ml-3 text-xs font-black uppercase tracking-[0.15em] transition-all duration-500
        ${open ? "opacity-100 translate-x-0" : "md:opacity-0 md:-translate-x-10 md:w-0"}`}
                        >
                        Logout
                        </span>
                    </button>
                </nav>

                {/* Footer Area */}
                <div className="absolute bottom-6 left-0 w-full px-6">
                    {open && (
                        <p className="text-[8px] text-stone-700 font-bold uppercase tracking-[0.4em] text-center">
                            © 2026 Elvora Motors
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
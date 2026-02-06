import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { context } from '../../Context/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../../APi/UsersRequests';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


function Header() {
    const links = [
        { link: "Home", path: "/home" },
        { link: "About Us", path: "/about" },
        { link: "Contact Us", path: "/contact" },
        { link: "Dashboard", path: "/dashboard" },
    ];


    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.clear();
            Cookies.remove("token");
            Cookies.remove("type");
            localStorage.clear();
            window.location.href = "/login";
        },
        onError: () => {
            Cookies.remove("token");
            window.location.href = "/login";
        }
    });

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef();
    const location = useLocation();
    const { Token } = useContext(context);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will need to login again to access your account.",
            icon: 'warning',
            showCancelButton: true,
            background: '#0a0a0a',
            color: '#fff',
            confirmButtonColor: '#fff',
            cancelButtonColor: '#262626',
            confirmButtonText: '<span style="color:black; font-weight:bold; font-size:12px">LOGOUT</span>',
            cancelButtonText: '<span style="font-size:12px">CANCEL</span>',
            customClass: {
                popup: 'rounded-none border border-white/10 shadow-2xl',
                confirmButton: 'rounded-none px-8 py-2 tracking-[0.2em]',
                cancelButton: 'rounded-none px-8 py-2 tracking-[0.2em]'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate();
            }
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled
                ? "bg-black/90 backdrop-blur-xl py-2 shadow-2xl"
                : "bg-transparent py-5"
                } text-white border-b border-white/5`}
        >
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
                <div className='flex flex-row w-full lg:w-auto items-center justify-between'>
                    <Link to="/home" className="text-2xl italic font-black uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
                        Elvora <span className="text-gray-500">motors</span>
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-white focus:outline-none"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-white transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                            <span className={`w-full h-0.5 bg-white transition-all ${isOpen ? "opacity-0" : ""}`}></span>
                            <span className={`w-full h-0.5 bg-white transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                        </div>
                    </button>
                </div>

                <div
                    className={`flex-col lg:flex lg:flex-row lg:items-center lg:gap-8 w-full lg:w-auto transition-all duration-500 
                        ${isOpen ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0 overflow-hidden lg:max-h-full lg:opacity-100 lg:overflow-visible lg:mt-0"}
                    `}
                >
                    <ul className='flex flex-col lg:flex-row items-center gap-2 lg:gap-1'>
                        {links.map((e, index) => (
                            <li key={index} className='w-full lg:w-auto'>
                                <Link
                                    to={e.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`relative block px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 group
                                        ${location.pathname === e.path ? "text-white" : "text-gray-400 hover:text-white"}`}
                                >
                                    {e.link}
                                    <span className={`absolute bottom-0 left-4 h-[2px] bg-white transition-all duration-300 
                                        ${location.pathname === e.path ? "w-8" : "w-0 group-hover:w-8"}`}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className='flex flex-col lg:flex-row items-center gap-4 mt-6 lg:mt-0 pb-6 lg:pb-0 w-full lg:w-auto border-t border-white/10 lg:border-none pt-6 lg:pt-0'>
                        {Token ? (
                            <button
                                className='px-6 py-2 border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 rounded-none'
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className='text-xs font-black uppercase tracking-widest hover:text-gray-400 transition-colors'
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className='px-6 py-2 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all duration-500 rounded-none'
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
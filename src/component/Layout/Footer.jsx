import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const links = [
        { link: "Home", path: "/home" },
        { link: "About Us", path: "/about" },
        { link: "Contact Us", path: "/contact" },
        { link: "Dashboard", path: "/dashboard" },
    ];
    const location = useLocation();

    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black italic tracking-tighter">
                            ELVORA<span className="text-stone-600">MOTORS</span>
                        </h2>
                        <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-bold leading-relaxed">
                            Redefining the art of automotive excellence and high-end performance.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                                <Link key={i} to={"#"} className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-stone-400 hover:border-white hover:text-white transition-all duration-500">
                                    <Icon size={14} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-600 mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            {links.map((e, index) => (
                                <li key={index}>
                                    <Link
                                        to={e.path}
                                        className={`group flex items-center text-xs uppercase tracking-widest font-bold transition-all duration-300
                                            ${location.pathname === e.path ? "text-white" : "text-stone-500 hover:text-white"}`}
                                    >
                                        <span className={`w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ${location.pathname === e.path ? "w-4" : ""}`}>
                                            <FiArrowRight className="mr-2" />
                                        </span>
                                        {e.link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-600 mb-8">Showroom</h3>
                        <ul className="space-y-5 text-xs font-bold uppercase tracking-widest text-stone-400">
                            <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                                <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-sm group-hover:bg-white group-hover:text-black transition-all">
                                    <FiPhone size={14} />
                                </div>
                                +20 111 604 5357
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                                <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-sm group-hover:bg-white group-hover:text-black transition-all">
                                    <FiMail size={14} />
                                </div>
                                abdulrhmanaahmed4@gmail.com
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                                <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-sm group-hover:bg-white group-hover:text-black transition-all">
                                    <FiMapPin size={14} />
                                </div>
                                123 DREAM CAR LANE, METPIA
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-600 mb-8">Newsletter</h3>
                        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-6">Receive exclusive offers and early access.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-all placeholder:text-stone-800"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors">
                                <FiArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-700">
                        © 2026 Elvora Motors. Designed for the Elite.
                    </p>
                    <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-stone-700">
                        <Link to={"#"} className="hover:text-stone-400 transition-colors">Privacy Policy</Link>
                        <Link to={"#"} className="hover:text-stone-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
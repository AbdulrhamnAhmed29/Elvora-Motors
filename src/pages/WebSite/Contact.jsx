import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiSend, FiCheck } from "react-icons/fi";
import Swal from 'sweetalert2';
import Footer from '../../component/Layout/Footer';

function ContactUs() {
    const form = useRef();
    const [selectedType, setSelectedType] = useState('Purchase');

    const sendEmail = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'TRANSMITTING...',
            text: 'Establishing secure connection',
            allowOutsideClick: false,
            background: "#000",
            color: "#fff",
            didOpen: () => { Swal.showLoading(); }
        });

        emailjs.sendForm('service_pq9y1ac', 'template_o7mz79e', form.current, '4XSnnD-p_DHoqPkZw')
            .then(() => {
                Swal.fire({
                    title: 'SUCCESS',
                    text: 'Transmission Complete.',
                    icon: 'success',
                    background: "#000",
                    color: "#fff",
                    confirmButtonColor: "#fff",
                    confirmButtonText: "<span style='color:black; font-weight:bold'>DISMISS</span>"
                });
                e.target.reset();
            })
            .catch((error) => {
                Swal.fire({
                    title: 'ERROR',
                    text: 'Transmission Failed. Please try again.',
                    icon: 'error',
                    background: "#000",
                    color: "#fff"
                });
            });
    };

    const types = [
        { id: 'purchase', label: 'BUY', desc: 'Acquire a vehicle' },
        { id: 'booking', label: 'Booking', desc: 'Schedule a visit' },
        { id: 'sell', label: 'Sell My Car', desc: 'Trade or Sell' }
    ];

    return (
        <>
            <div className="bg-black pt-24 pb-16 px-6 text-white min-h-screen">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="mb-16">
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                            ELVORA <span className="opacity-10 block md:inline">Motors</span>
                        </h1>
                        <div className="h-[2px] w-20 bg-white mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        
                        {/* 1. Info Section (Left Side) */}
                        <div className="lg:col-span-4 space-y-12">
                            <div>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] mb-6">Contact Channels</p>
                                <div className="space-y-8">
                                    <div className="group cursor-pointer">
                                        <p className="text-[9px] font-bold opacity-20 uppercase mb-1">Direct Line</p>
                                        <p className="text-lg font-black tracking-tight group-hover:text-emerald-500 transition-all duration-300">01116045357</p>
                                    </div>
                                    <div className="group cursor-pointer">
                                        <p className="text-[9px] font-bold opacity-20 uppercase mb-1">Official Mail</p>
                                        <p className="text-lg font-black tracking-tight group-hover:text-emerald-500 transition-all duration-300 uppercase">abdulrhman@elvora.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border border-white/5 bg-white/[0.01] rounded-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">System Online</span>
                                </div>
                                <p className="text-[10px] opacity-40 font-bold leading-loose uppercase tracking-widest">
                                    Mon — Fri: 09:00 - 22:00<br />
                                    Sat — Sun: 10:00 - 18:00
                                </p>
                            </div>
                        </div>

                        {/* 2. Form Section (Right Side) */}
                        <div className="lg:col-span-8">
                            <form ref={form} onSubmit={sendEmail} className="space-y-12">
                                
                                {/* Inputs: Name & Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="group border-b border-white/10 focus-within:border-white transition-all py-3">
                                        <label className="text-[9px] font-black opacity-30 uppercase tracking-widest block mb-2">01. Full Name</label>
                                        <input type="text" name="from_name" required className="w-full bg-transparent outline-none text-xs font-bold tracking-widest uppercase placeholder:opacity-20" placeholder="ENTER NAME" />
                                    </div>
                                    <div className="group border-b border-white/10 focus-within:border-white transition-all py-3">
                                        <label className="text-[9px] font-black opacity-30 uppercase tracking-widest block mb-2">02. Phone Number</label>
                                        <input type="tel" name="phone" required className="w-full bg-transparent outline-none text-xs font-bold tracking-widest placeholder:opacity-20" placeholder="+20 000 000 000" />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="group border-b border-white/10 focus-within:border-white transition-all py-3">
                                    <label className="text-[9px] font-black opacity-30 uppercase tracking-widest block mb-2">03. Email Address</label>
                                    <input type="email" name="from_email" required className="w-full bg-transparent outline-none text-xs font-bold tracking-widest placeholder:opacity-20" placeholder="YOUR@EMAIL.COM" />
                                </div>

                                {/* Purpose Selection Buttons */}
                                <div>
                                    <label className="text-[9px] font-black opacity-30 uppercase tracking-widest block mb-8">04. Purpose of Inquiry</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {types.map((type) => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setSelectedType(type.label)}
                                                className={`relative py-8 px-4 border transition-all duration-500 text-center ${
                                                    selectedType === type.label 
                                                    ? "bg-white text-black border-white" 
                                                    : "bg-transparent text-white border-white/5 hover:border-white/20"
                                                }`}
                                            >
                                                <p className="text-[11px] font-black uppercase tracking-widest mb-1">{type.label}</p>
                                                <p className={`text-[7px] font-bold uppercase tracking-[0.2em] opacity-40 ${selectedType === type.label ? 'text-black' : 'text-white'}`}>
                                                    {type.desc}
                                                </p>
                                                {selectedType === type.label && (
                                                    <div className="absolute top-2 right-2">
                                                        <FiCheck size={12} />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <input type="hidden" name="request_type" value={selectedType} />
                                </div>

                                {/* Message Textarea */}
                                <div className="group">
                                    <label className="text-[9px] font-black opacity-30 uppercase tracking-widest block mb-4">05. Additional Details</label>
                                    <textarea name="message" rows="4" required className="w-full bg-white/[0.02] border border-white/5 p-6 outline-none focus:border-white/20 text-xs font-medium tracking-widest uppercase transition-all placeholder:opacity-20" placeholder="Tell us more about your request..."></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end pt-6">
                                    <button type="submit" className="group bg-white text-black px-10 md:px-14 py-6 text-[10px] font-black uppercase tracking-[0.6em] border border-white hover:bg-black hover:text-white transition-all duration-700 flex items-center gap-6 w-full md:w-auto justify-center">
                                        Send To Elvora 
                                        <FiSend className="group-hover:translate-x-2 transition-transform duration-500" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContactUs;
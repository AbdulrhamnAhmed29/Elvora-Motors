import React from 'react';
import { FaEnvelope, FaLock, FaShieldAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginForm() {
    const { handleSubmit, register, formState: {  isSubmitting } } = useForm();
    const API_URL = process.env.REACT_APP_API_URL;

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${API_URL}/login`, data);
            const userData = res.data.data || res.data;

            if (userData.token) {
                Cookies.set("token", userData.token, { expires: 2, secure: true, sameSite: 'Lax' });

                const userRole = userData.user?.type || data.type;
                Cookies.set("type", userRole, { expires: 2 });

                if (userData.user) localStorage.setItem("name", userData.user.name);

                Swal.fire({
                    title: "ACCESS GRANTED",
                    text: `Welcome back, ${userRole.toUpperCase()} operator.`,
                    icon: "success",
                    background: "#0c0a09",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = "/home"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "AUTHENTICATION FAILED",
                text: error.response?.data?.message || "Invalid credentials",
                icon: "error",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#7f1d1d"
            });
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-800/20 blur-[150px] rounded-full"></div>
            </div>

            <div className="w-full max-w-[400px] z-10">
                <div className="text-center mb-10">
                    <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                        ELVORA <span className="text-stone-800 font-light">CORE</span>
                    </h1>
                    <p className="text-[9px] text-stone-600 font-bold tracking-[0.6em] uppercase mt-4 italic">
                        Authorized Personnel Only
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">


                    {/* Email Input */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-700 font-bold mb-2 block ml-1"> Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                {...register("email", { required: "Email required" })}
                                placeholder="Email"
                                className="w-full bg-stone-950 border border-white/5 p-4 pl-12 text-[10px] text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-stone-900 uppercase tracking-widest"
                            />
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-700 font-bold mb-2 block ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                {...register("password", { required: "Key required" })}
                                placeholder="••••••••••••"
                                className="w-full bg-stone-950 border border-white/5 p-4 pl-12 text-[10px] text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-stone-900 tracking-widest"
                            />
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                        </div>
                    </div>
                    {/* Account Type Selection */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-700 font-bold mb-2 block ml-1">Access Type</label>
                        <div className="relative">
                            <select
                                {...register("type", { required: "Please select access level" })}
                                className="w-full bg-stone-950 border border-white/5 p-4 pl-12 text-[10px] text-stone-400 focus:outline-none focus:border-white/20 transition-all uppercase tracking-widest appearance-none cursor-pointer"
                                defaultValue="user"
                            >
                                <option value="user"> User</option>
                                <option value="admin"> Admin</option>
                            </select>
                            <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-800">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full bg-white text-black py-5 mt-4 text-[11px] font-black uppercase tracking-[0.5em] overflow-hidden transition-all active:scale-[0.98] disabled:opacity-30"
                    >
                        <span className="relative z-10">{isSubmitting ? "AUTHENTICATING..." : "Sign In"}</span>
                        <div className="absolute inset-0 bg-stone-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>

                    <div className="mt-8 text-center">
                        <Link to="/register" className="text-stone-600 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors">
                           Create New Account <span className="ml-1 text-white">→</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
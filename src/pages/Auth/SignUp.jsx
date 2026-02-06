import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../../APi/UsersRequests';

function Form() {
    const [showPassword, setShowPassword] = useState(false); // فيتشر رؤية الباسورد
    const { handleSubmit, register, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const queryClient = useQueryClient();

    const Mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data.token && data.user) {
                Cookies.set("token", data.token, { expires: 2 });
                Cookies.set("type", data.user.type, { expires: 2 });
                localStorage.setItem("name", data.user.name);
            }
            Swal.fire({
                title: "ACCESS GRANTED",
                text: "Your identity has been registered in Elvora Protocol.",
                icon: "success",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#ffffff",
                confirmButtonText: "<span style='color:black'>ENTER SYSTEM</span>"
            }).then(() => {
                window.location.href = "/";
            });
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            Swal.fire({
                title: "REGISTRATION DENIED",
                text: error.response?.data?.message || "Protocol Error",
                icon: "error",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#7f1d1d"
            });
        },
    });

    const onSubmit = (formData) => {
        Mutation.mutate(formData);
    };

    return (
        <div className="min-h-screen pt-20 bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-stone-800/20 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[150px] rounded-full"></div>
            </div>

            <div className="w-full max-w-[450px] z-10">
                {/* Brand Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                        JOIN <span className="text-stone-800 font-light">ELVORA</span>
                    </h1>
                    <div className="mt-4 flex items-center justify-center gap-3 text-stone-600">
                        <div className="h-[1px] w-8 bg-stone-900"></div>
                        <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Register Now</span>
                        <div className="h-[1px] w-8 bg-stone-900"></div>
                    </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    
                    {/* Full Name */}
                    <div className="relative group">
                        <input
                            type="text"
                            {...register("name", { required: "Legal name is required" })}
                            placeholder="FULL NAME"
                            className="w-full bg-stone-950 border border-white/5 p-4 pl-12 text-[10px] text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-stone-800 uppercase tracking-widest"
                        />
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                        {errors.name && <span className="text-red-900 text-[8px] absolute -bottom-4 left-0 uppercase font-bold">{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="relative group">
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid encrypted email" }
                            })}
                            placeholder="EMAIL"
                            className="w-full bg-stone-950 border border-white/5 p-4 pl-12 text-[10px] text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-stone-800 uppercase tracking-widest"
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                        {errors.email && <span className="text-red-900 text-[8px] absolute -bottom-4 left-0 uppercase font-bold">{errors.email.message}</span>}
                    </div>

                    {/* Password Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                        {/* Password */}
                        <div className="relative group">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Security phrase required",
                                    minLength: { value: 8, message: "Min 8 characters" }
                                })}
                                placeholder="PASSWORD"
                                className="w-full bg-stone-950 border border-white/5 p-4 pl-12 text-[10px] text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-stone-800 tracking-widest"
                            />
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                            {/* زرار العين عشان اليوزر ميتلخبطش */}
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-800 hover:text-white transition-colors"
                            >
                                {showPassword ? <FaEyeSlash size={12}/> : <FaEye size={12}/>}
                            </button>
                        </div>

                        {/* Confirm Password - الـ Confirm Password موجود زي ما هو */}
                        <div className="relative group">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password_confirmation", {
                                    required: "Confirm security phrase",
                                    validate: value => value === password || "Phrases do not match"
                                })}
                                placeholder="CONFIRM"
                                className="w-full bg-stone-950 border border-white/5 p-4 pl-12 text-[10px] text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-stone-800 tracking-widest"
                            />
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                        </div>
                        {/* Error Message for Validation */}
                        {(errors.password || errors.password_confirmation) && (
                            <span className="text-red-900 text-[8px] absolute -bottom-4 left-0 uppercase font-bold">
                                {errors.password?.message || errors.password_confirmation?.message}
                            </span>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div className="relative group mt-2">
                        <select
                            {...register("type")}
                            className="w-full bg-stone-950 border border-white/5 p-4 pl-12 text-[10px] text-stone-500 focus:outline-none focus:border-white/20 transition-all uppercase tracking-widest appearance-none cursor-pointer"
                            defaultValue="user"
                        >
                            <option value="user"> Users</option>
                            <option value="admin">Admin</option>
                        </select>
                        <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={Mutation.isPending}
                        className="w-full bg-white text-black py-5 mt-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-stone-200 transition-all active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-2"
                    >
                        {Mutation.isPending ? (
                             <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        ) : "Create Account"}
                    </button>

                    {/* Footer Links */}
                    <div className="mt-8 text-center">
                        <p className="text-stone-600 text-[9px] font-bold uppercase tracking-[0.2em]">
                            Existing operator? 
                            <Link to="/login" className="text-white hover:text-stone-400 ml-2 transition-colors border-b border-white/20 pb-1">SIGN IN</Link>
                        </p>
                    </div>
                </form>

                <p className="mt-16 text-[8px] text-stone-800 font-black text-center tracking-[0.6em] uppercase opacity-40">
                    © 2026 ELVORA MOTORS // SYSTEM AUTHENTICATION
                </p>
            </div>
        </div>
    );
}

export default Form;
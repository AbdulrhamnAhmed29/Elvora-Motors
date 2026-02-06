import React from 'react';
import { FaEnvelope, FaLock, FaUser, FaShieldAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewUser } from '../../../APi/UsersRequests';

function AddNewUser() {
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const queryClient = useQueryClient();

    const Mutation = useMutation({
        mutationFn: addNewUser,
        onSuccess: () => {
            Swal.fire({
                title: "SUCCESSFUL!",
                text: "Account has been created under Elvora Protocol.",
                icon: "success",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#ffffff",
                confirmButtonText: "<span style='color:black'>PROCEED</span>"
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            navigate("/dashboard/users");
        },
        onError: (error) => {
            Swal.fire({
                title: "ACCESS DENIED",
                text: error.response?.data?.message || "Registration failed",
                icon: "error",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#7f1d1d"
            });
        },
    });

    const onSubmit = (dataForm) => {
        Mutation.mutate(dataForm);
    };

    return (
        <div className="min-h-screen pb-10 md:ps-20 lg:ps-0 px-4 bg-transparent">
            {/* Header Section */}
            <div className="mb-12 pt-8">
                <h1 className="text-6xl font-black text-white italic tracking-[-0.05em] uppercase leading-none">
                    NEW <span className="text-stone-800">USER</span>
                </h1>
                <div className="h-1 w-20 bg-white mt-2"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl md:ms-10 flex flex-col gap-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    
                    {/* Name Input */}
                    <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block group-focus-within:text-white transition-all italic">01. Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="ENTER FULL NAME"
                                className="w-full bg-stone-900/40 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-700 uppercase tracking-widest"
                            />
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700 group-focus-within:text-white transition-colors" />
                        </div>
                        {errors.name && <p className="text-red-500 text-[9px] mt-2 italic tracking-widest">{errors.name.message}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block group-focus-within:text-white transition-all italic">02. Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                })}
                                placeholder="EMAIL@ELVORA.SYSTEM"
                                className="w-full bg-stone-900/40 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-700 uppercase tracking-widest"
                            />
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700 group-focus-within:text-white transition-colors" />
                        </div>
                        {errors.email && <p className="text-red-500 text-[9px] mt-2 italic tracking-widest">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block group-focus-within:text-white transition-all italic">03. Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password required",
                                    minLength: { value: 8, message: "Min 8 characters" }
                                })}
                                placeholder="••••••••••••"
                                className="w-full bg-stone-900/40 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-700"
                            />
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700 group-focus-within:text-white transition-colors" />
                        </div>
                        {errors.password && <p className="text-red-500 text-[9px] mt-2 italic tracking-widest">{errors.password.message}</p>}
                    </div>

                    {/* Account Type Select */}
                    <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block italic">04. Account Type</label>
                        <div className="relative">
                            <select
                                {...register("type")}
                                className="w-full bg-stone-900/40 border-b border-stone-800 p-4 pl-12 text-xs text-stone-400 focus:outline-none focus:border-white transition-all uppercase tracking-[0.2em] cursor-pointer appearance-none"
                            >
                                <option value="user" className="bg-stone-950"> User</option>
                                <option value="admin" className="bg-stone-950"> Admin</option>
                            </select>
                            <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700 group-focus-within:text-white transition-colors" />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-700">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor">
                                    <path d="M1 1L5 5L9 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button Section */}
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={Mutation.isPending}
                        className="group relative w-full md:w-64 overflow-hidden bg-white py-6 transition-all duration-300 active:scale-[0.98] disabled:opacity-30"
                    >
                        <span className="relative z-10 text-black font-black text-[11px] uppercase tracking-[0.5em]">
                            {Mutation.isPending ? "ENCRYPTING..." : "CREATE ACCOUNT"}
                        </span>
                        {/* Hover Effect Layer */}
                        <div className="absolute inset-0 bg-stone-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>
            </form>

            <footer className="mt-24 border-t border-stone-900 pt-8">
                <p className="text-[9px] text-stone-800 font-black tracking-[0.8em] uppercase text-center opacity-50">
                    ELVORA MOTORS // AUTHORIZED PERSONNEL ONLY
                </p>
            </footer>
        </div>
    );
}

export default AddNewUser;
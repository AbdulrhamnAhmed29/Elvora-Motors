import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaShieldAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { getUserById, updateUser } from "../../../APi/UsersRequests"; 

function UpdateUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { handleSubmit, register, reset,  } = useForm();

    const { data: response, isLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id), 
    });

    useEffect(() => {
        if (response) {
            const user = response.data || response; 
            reset({
                name: user.name,
                email: user.email,
                type: user.type,
            });
        }
    }, [response, reset]);

    const mutation = useMutation({
        mutationFn: (data) => updateUser(id, data),
        onSuccess: () => {
            Swal.fire({
                title: "IDENTITY MODIFIED",
                text: "User protocol has been updated.",
                icon: "success",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#fff",
                confirmButtonText: "<span style='color:black'>DONE</span>"
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            navigate("/dashboard/users");
        }
    });

    const onSubmit = (formData) => {
        const dataToSend = { ...formData };
        if (!dataToSend.password) delete dataToSend.password; 
        mutation.mutate(dataToSend);
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 border-t-2 border-white rounded-full animate-spin"></div>
        </div>

    );

    return (
        <div className="min-h-screen md:ps-20 lg:ps-0 pb-10 px-4 bg-black">
            <div className="mb-12 pt-8">
                <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                    Update <span className="text-stone-800 font-light">User</span>
                </h1>
                <p className="text-[10px] text-stone-600 tracking-[0.4em] mt-4 font-bold uppercase">SECURE ACCESS // ID: {id}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl flex flex-col gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Name */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block italic text-white/50">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="w-full bg-stone-900/30 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all uppercase tracking-widest"
                            />
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block italic text-white/50">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full bg-stone-900/30 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all tracking-widest"
                            />
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700" />
                        </div>
                    </div>

                    {/* Account Type */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block italic text-white/50">Access Level</label>
                        <div className="relative">
                            <select
                                {...register("type")}
                                className="w-full bg-stone-900/30 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all uppercase tracking-widest appearance-none"
                            >
                                <option value="user" className="bg-black">Standard User</option>
                                <option value="admin" className="bg-black">Administrator</option>
                            </select>
                            <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700" />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block italic text-white/50">New Password (Optional)</label>
                        <div className="relative">
                            <input
                                type="password"
                                {...register("password")}
                                placeholder="••••••••"
                                className="w-full bg-stone-900/30 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all"
                            />
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700" />
                        </div>
                    </div>

                </div>

                <div className="mt-8 flex gap-4">
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="bg-white text-black px-12 py-5 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-stone-200 transition-all disabled:opacity-30"
                    >
                        {mutation.isPending ? "SAVING..." : "COMMIT CHANGES"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/users")}
                        className="border border-stone-800 text-stone-500 px-12 py-5 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all"
                    >
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaCar, FaInfoCircle, FaCheckCircle, FaTools, FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";
import { getProductById, updateProduct } from "../../../APi/ProductsRequests";

function UpdateCar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    const { data: carData, isLoading } = useQuery({
        queryKey: ['updateP', id],
        queryFn: () => getProductById(id),
    });

    // fill data to form 


    useEffect(() => {
        if (carData) {
            reset({
                title: carData.title,
                description: carData.description,
                is_available: carData.is_available,
                price: carData.price, 
            });
        }
    }, [carData, reset]);

    // update 
    const mutation = useMutation({
        mutationFn: (data) => updateProduct(id, data),
        onSuccess: () => {
            Swal.fire({
                title: "SPECIFICATIONS UPDATED",
                text: "Vehicle parameters have been modified in the core database.",
                icon: "success",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#fff",
                confirmButtonText: "<span style='color:black; font-weight:bold'>BACK TO INVENTORY</span>"
            });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/dashboard/products");
        },
        onError: (error) => {
            Swal.fire({
                title: "SYSTEM ERROR",
                text: error.response?.data?.message || "Failed to update vehicle data",
                icon: "error",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#7f1d1d"
            });
        }
    });

    const onSubmit = (formData) => {
        mutation.mutate(formData);
    };

    if (isLoading) return (
        <div className="flex flex-col items-center  justify-center min-h-[60vh] gap-4">
            <div className="w-10 h-10 border-2 border-stone-800 border-t-white rounded-full animate-spin"></div>
            <p className="text-[10px] text-stone-500 tracking-[0.5em] font-black uppercase">Scanning Vehicle ID...</p>
        </div>
    );

    return (
        <div className="min-h-screen md:ps-20 lg:ps-0 pb-20 px-4 md:px-10">
            {/* Header Section */}
            <div className="mb-16 pt-10">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] bg-white text-black px-2 py-0.5 font-black uppercase tracking-tighter italic">Edit Mode</span>
                    <span className="text-[10px] text-stone-600 tracking-[0.4em] font-black uppercase">Asset: #EV-PRD-{id}</span>
                </div>
                <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                    Update <span className="text-stone-800 font-light">Product</span>
                </h1>
                <div className="h-[1px] w-32 bg-stone-800 mt-6"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">

                    {/* Car Title */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-600 font-black mb-4 block group-focus-within:text-white transition-all italic">01 //  MODEL NAME</label>
                        <div className="relative">
                            <input
                                type="text"
                                {...register("title", { required: "Model title is required" })}
                                className="w-full bg-transparent border-b border-stone-900 p-4 pl-10 text-xs text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-800 uppercase tracking-[0.2em]"
                            />
                            <FaCar className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors text-sm" />
                        </div>
                        {errors.title && <p className="text-red-900 text-[8px] mt-2 font-black uppercase italic">{errors.title.message}</p>}
                    </div>

                    {/* Car Description */}
                    <div className="relative group md:col-span-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-600 font-black mb-4 block group-focus-within:text-white transition-all italic">02 // SPECIFICATIONS & DESCRIPTION</label>
                        <div className="relative">
                            <textarea
                                {...register("description", { required: "Specifications are required" })}
                                rows="3"
                                className="w-full bg-transparent border-b border-stone-900 p-4 pl-10 text-xs text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-800 uppercase tracking-[0.15em] resize-none"
                            />
                            <FaInfoCircle className="absolute left-0 top-4 text-stone-800 group-focus-within:text-white transition-colors text-sm" />
                        </div>
                        {errors.description && <p className="text-red-900 text-[8px] mt-2 font-black uppercase italic">{errors.description.message}</p>}
                    </div>

                    {/* Price  */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-600 font-black mb-4 block group-focus-within:text-white transition-all italic">
                            05 // PRICE ($)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: "Price is required" })}
                                className="w-full bg-transparent border-b border-stone-900 p-4 pl-10 text-xs text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-800 uppercase tracking-[0.2em]"
                            />
                            <FaDollarSign className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors text-sm" />
                        </div>
                        {errors.price && <p className="text-red-900 text-[8px] mt-2 font-black uppercase italic">{errors.price.message}</p>}
                    </div>

                    {/* Availability Status */}
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-600 font-black mb-4 block italic">03 //  STATUS</label>
                        <div className="relative">
                            <select
                                {...register("is_available")}
                                className="w-full bg-stone-950 border border-stone-900 p-4 pl-10 text-[10px] text-stone-400 focus:outline-none focus:border-white transition-all uppercase tracking-[0.2em] appearance-none cursor-pointer"
                            >
                                <option value="1">Available in Showroom</option>
                                <option value="0">Reserved / Sold Out</option>
                            </select>
                            <FaCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-white transition-colors" />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-800">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>


                    {/* Maintenance/Service ID (Visual Only) */}
                    <div className="relative group opacity-50">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-stone-600 font-black mb-4 block italic">04 // MAINTENANCE PROTOCOL</label>
                        <div className="relative">
                            <div className="w-full border-b border-stone-900 p-4 pl-10 text-[10px] text-stone-700 uppercase tracking-[0.2em]">
                                Verified by Elvora Engineering
                            </div>
                            <FaTools className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-800" />
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col md:flex-row gap-6 mt-10">
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="group relative flex-1 bg-white py-6 overflow-hidden transition-all active:scale-[0.98] disabled:opacity-20"
                    >
                        <span className="relative z-10 text-black font-black text-[11px] uppercase tracking-[0.6em]">
                            {mutation.isPending ? "SYNCING..." : "COMMIT SPECIFICATIONS"}
                        </span>
                        <div className="absolute inset-0 bg-stone-200 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/products")}
                        className="flex-1 py-6 border border-stone-900 text-stone-600 text-[11px] font-black uppercase tracking-[0.6em] hover:bg-stone-900 hover:text-white transition-all duration-300"
                    >
                        ABORT CHANGES
                    </button>
                </div>
            </form>

            <footer className="mt-32 border-t border-stone-900/50 pt-8 flex justify-between items-center opacity-30">
                <p className="text-[8px] text-white font-black tracking-[1em] uppercase">Elvora Motors // Vehicle Management Unit</p>
                <div className="flex gap-2">
                    <div className="w-8 h-[1px] bg-white"></div>
                    <div className="w-2 h-[1px] bg-white"></div>
                </div>
            </footer>
        </div>
    );
}

export default UpdateCar;
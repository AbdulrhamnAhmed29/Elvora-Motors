import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaCar, FaDollarSign, FaFileAlt, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../../APi/ProductsRequests';

function AddNewProduct() {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null); 
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm();
    const queryClient = useQueryClient();

    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const Mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            Swal.fire({
                title: "SUCCESSFUL!",
                text: "A Car has been Added under Elvora Protocol.",
                icon: "success",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#ffffff",
                confirmButtonText: "<span style='color:black'>CONTINUE</span>"
            });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/dashboard/products");
            
        },
        onError: (error) => {
            Swal.fire({
                title: "REGISTRATION FAILED",
                text: error.response?.data?.message || "Something went wrong",
                icon: "error",
                background: "#0c0a09",
                color: "#fff",
                confirmButtonColor: "#7f1d1d"
            });
        },
    });

    const onSubmit = (dataForm) => {
        const formData = new FormData();
        formData.append('title', dataForm.title);
        formData.append('description', dataForm.description);
        formData.append('price', dataForm.price);
        formData.append('is_available', dataForm.is_available);
        formData.append('image', dataForm.image[0]);
        Mutation.mutate(formData);
    };

    return (
        <div className="min-h-screen pb-10 px-4 md:ps-20 lg:ps-0 bg-transparent">
            {/* Header Section */}
            <div className="mb-12 pt-8">
                <h1 className="text-6xl font-black text-white italic tracking-[ -0.05em] uppercase leading-none">
                    ADD <span className="text-stone-800 outline-text">CAR</span>
                </h1>
                <div className="h-1 w-20 bg-white mt-2"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl">
                
                {/* Left Side: Form Inputs */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    
                    {/* Title Input */}
                    <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block group-focus-within:text-white transition-all">01. Car Title</label>
                        <div className="relative">
                            <input
                                type="text"
                                {...register("title", { required: "Title is required" })}
                                placeholder="e.g. PHANTOM SERIES II"
                                className="w-full bg-stone-900/40 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-700 uppercase tracking-widest"
                            />
                            <FaCar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700 group-focus-within:text-white transition-colors" />
                        </div>
                        {errors.title && <p className="text-red-500 text-[9px] mt-2 italic tracking-widest">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Price Input */}
                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block group-focus-within:text-white transition-all">02. Valuation</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    {...register("price", { required: "Price required", min: 0 })}
                                    placeholder="PRICE (USD)"
                                    className="w-full bg-stone-900/40 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-700"
                                />
                                <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700 group-focus-within:text-white transition-colors" />
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block">03. Status</label>
                            <select
                                {...register("is_available")}
                                className="w-full bg-stone-900/40 border-b border-stone-800 p-4 text-xs text-stone-400 focus:outline-none focus:border-white transition-all uppercase tracking-[0.2em] cursor-pointer appearance-none"
                            >
                                <option value="yes" className="bg-stone-950">In Stock / Available</option>
                                <option value="no" className="bg-stone-950">Sold / Reserved</option>
                            </select>
                        </div>
                    </div>

                    {/* Description Input */}
                    <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block group-focus-within:text-white transition-all">04. Specifications</label>
                        <div className="relative">
                            <textarea
                                {...register("description", { required: "Description required" })}
                                placeholder="ENTER TECHNICAL DETAILS AND FEATURES..."
                                className="w-full bg-stone-900/40 border-b border-stone-800 p-4 pl-12 text-sm text-white focus:outline-none focus:border-white transition-all placeholder:text-stone-700 uppercase tracking-widest min-h-[120px] resize-none"
                            />
                            <FaFileAlt className="absolute left-4 top-5 text-stone-700 group-focus-within:text-white transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Upload & Preview */}
                <div className="lg:col-span-5">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-3 block">05. Visual Identity</label>
                    <div className={`relative border-2 border-dashed ${errors.image ? 'border-red-900' : 'border-stone-800'} hover:border-stone-600 transition-all rounded-lg overflow-hidden h-[300px] flex items-center justify-center bg-stone-900/20 group`}>
                        {preview ? (
                            <div className="relative w-full h-full">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <button 
                                    type="button" 
                                    onClick={() => {setPreview(null); setValue('image', null)}}
                                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-white hover:text-black transition-all"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
                                <FaCloudUploadAlt className="text-4xl text-stone-800 group-hover:text-white transition-all mb-4" />
                                <span className="text-[10px] tracking-[0.3em] text-stone-600 group-hover:text-stone-300">UPLOAD HIGH-RES IMAGE</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    {...register("image", { required: "Image required", onChange: handleImageChange })}
                                />
                            </label>
                        )}
                    </div>
                    {errors.image && <p className="text-red-500 text-[9px] mt-2 italic tracking-widest uppercase text-center">{errors.image.message}</p>}
                    
                    {/* Submit Button Section */}
                    <div className="mt-10">
                        <button
                            type="submit"
                            disabled={Mutation.isPending}
                            className="w-full group relative overflow-hidden bg-white py-6 transition-all duration-300 active:scale-[0.98] disabled:opacity-30"
                        >
                            <span className="relative z-10 text-black font-black text-xs uppercase tracking-[0.6em]">
                                {Mutation.isPending ? "ADDED..." : "ADD PRODUCT"}
                            </span>
                            <div className="absolute inset-0 bg-stone-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                </div>
            </form>

            <footer className="mt-20 border-t border-stone-900 pt-8">
                <p className="text-[9px] text-stone-800 font-black tracking-[0.8em] uppercase text-center opacity-50">
                    ELVORA MOTORS // SECURE TERMINAL 2026
                </p>
            </footer>
        </div>
    );
}

export default AddNewProduct;
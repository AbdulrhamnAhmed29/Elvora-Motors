import React, { useEffect, useState } from 'react';
import { FaEdit, FaSortAmountDown, FaSortAmountUp, FaFileExcel, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import Swal from "sweetalert2";
import TableSkeleton from "../../Ui/TableSkelton";
import { deleteProduct, getProducts } from '../../../APi/ProductsRequests';

function ProductsTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const usersPerPage = 5;

    const queryClient = useQueryClient();
    // get data from react query
    const { data: productsData, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const products = Array.isArray(productsData) ? productsData : [];

    // search
    const filteredProducts = products.filter(product =>
        product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // sort
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        return sortAsc
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    // pagination
    const totalPages = Math.ceil(sortedProducts.length / usersPerPage) || 1;
    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [sortedProducts.length, totalPages, currentPage]);

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            Swal.fire({
                title: "Deleted!",
                text: "The Car has been removed successfully.",
                icon: "success",
                background: "#0c0a09",
                color: "#fff"
            });
        },
        onError: (err) => {
            Swal.fire("Error", err.message || "Failed to delete user", "error");
        }
    });
    // export to excel
    const exportToExcel = () => {
        const dataToExport = sortedProducts.map(product => ({
            title: product.title,
            description: product.description,
            price: product.price,
            is_available: product.is_available,
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "ProductsData.xlsx");
    };

    // handle loading and error
    if (isLoading) return <div className="min-h-screen bg-black p-10"><TableSkeleton /></div>;
    if (isError) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500">Error: {error.message}</div>;

    return (
        <div className=" md:w-11/12 md:ml-20 lg:ml-0 lg:w-full min-h-screen pt-24 pb-20 px-4 rounded-lg">
            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12">
                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter capitalize">
                    Product <span className="text-stone-800">Details  </span>
                </h1>
                <div className="flex flex-col md:flex-col gap-4 w-full xl:w-auto">
                    <div className="bg-white text-black px-8 py-4 flex rounded-lg items-center gap-3 justify-center min-w-[160px]">
                        <span className="text-xl font-black italic tracking-tighter">Total:</span>
                        <span className="text-2xl font-black italic">{filteredProducts.length}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-grow">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" />
                    <input
                        type="text"
                        placeholder="SEARCH BY TITLE..."
                        className="bg-stone-900/40 border border-white/5 pl-12 pr-6 py-4 text-[10px] text-white focus:outline-none w-full md:w-80 uppercase tracking-widest"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <button onClick={exportToExcel} className="flex items-center gap-3 bg-stone-900 text-white hover:bg-white hover:text-black px-6 py-4 text-[9px] font-black uppercase tracking-widest transition-all border border-white/5">
                    <FaFileExcel size={14} /> EXPORT EXCEL
                </button>
                <button onClick={() => setSortAsc(!sortAsc)} className="flex items-center gap-3 border border-white/10 text-stone-500 px-6 py-4 text-[9px] font-black uppercase tracking-widest transition-all">
                    {sortAsc ? <FaSortAmountDown /> : <FaSortAmountUp />} SORT
                </button>
            </div>

            {/* Table */}
            <div className="bg-[#0c0a09] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest">Title</th>
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest">Price</th>
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest">Description</th>
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest">Available</th>
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/[0.01] transition-all group">
                                        <td className="py-6 px-8 text-stone-700 font-black italic text-sm">{product.title}</td>
                                        <td className="px-8 text-stone-400 text-sm">{product.price}</td>
                                        <td className="px-4 py-4 min-w-[200px]">
                                            <p className="text-xs text-white/60 line-clamp-2 hover:line-clamp-none transition-all duration-300 cursor-pointer leading-relaxed">
                                                {product.description}
                                            </p>
                                        </td>                                        <td className="px-8 capitalize font-semibold text-stone-300 text-sm">{product.is_available ? "Yes" : "No"}</td>
                                        <td className="py-6 px-8 text-center">
                                            <div className="flex items-center justify-center gap-5">
                                                <Link to={`/dashboard/product/edit/${product.id}`} className="text-stone-600 hover:text-white transition-all">
                                                    <FaEdit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "Are you sure?",
                                                            text: "This action cannot be undone!",
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonColor: "#7f1d1d",
                                                            cancelButtonText: "CANCEL",
                                                            confirmButtonText: "YES, DELETE",
                                                            background: "#0c0a09",
                                                            color: "#fff"
                                                        }).then((result) => {
                                                            if (result.isConfirmed) deleteMutation.mutate(product.id);
                                                        });
                                                    }}
                                                    className="text-stone-600 hover:text-red-600 transition-all"
                                                >
                                                    <MdDelete size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-stone-800 uppercase text-xs tracking-widest">No Products Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-row justify-center mt-8 items-center gap-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="text-stone-700 hover:text-white disabled:opacity-10 text-[10px] font-black tracking-widest uppercase transition-all"
                >
                    PREV
                </button>
                <div className="flex  gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-10 text-[10px] font-black transition-all ${currentPage === i + 1 ? "bg-white text-black" : "text-stone-700 hover:text-stone-400"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="text-stone-700 hover:text-white disabled:opacity-10 text-[10px] font-black tracking-widest uppercase transition-all"
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}

export default ProductsTable;

import React, { useState, useEffect } from "react";
import { FaEdit, FaSortAmountDown, FaSortAmountUp, FaFileExcel, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../../../APi/UsersRequests";
import Swal from "sweetalert2";
import TableSkeleton from "../../Ui/TableSkelton";

function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const usersPerPage = 5;
    const queryClient = useQueryClient();

    // get data from react query 
    const { data: apiResponse, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    // check for data 
    const usersList = Array.isArray(apiResponse) ? apiResponse : [];

    // sort and search 
    const filteredUsers = usersList.filter(user =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        const nameA = a?.name?.toLowerCase() || "";
        const nameB = b?.name?.toLowerCase() || "";
        if (nameA < nameB) return sortAsc ? -1 : 1;
        if (nameA > nameB) return sortAsc ? 1 : -1;
        return 0;
    });
    // start pagination  
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredUsers.length, totalPages, currentPage]);
    // end pagination  

    // start delete user 
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            Swal.fire({
                title: "Deleted!",
                text: "The user has been removed successfully.",
                icon: "success",
                background: "#0c0a09",
                color: "#fff"
            });
        },
        onError: (err) => {
            Swal.fire("Error", err.message || "Failed to delete user", "error");
        }
    });
    // end delete user 


    // colors user character 
    const colorClasses = ["bg-red-900/50", "bg-emerald-900/50", "bg-blue-900/50", "bg-amber-900/50", "bg-purple-900/50", "bg-orange-900/50"];
    function getColorClass(name) {
        const charCode = name?.charCodeAt(0) || 0;
        return colorClasses[charCode % colorClasses.length];
    }

    // exoprt to excel 
    const exportToExcel = () => {
        const dataToExport = filteredUsers.map(user => ({
            ID: user.id,
            Name: user.name,
            Email: user.email,
            Type: user.type
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Users_Report.xlsx");
    };

    // handle error  
    if (isLoading) return <div className="min-h-screen bg-black p-10"><TableSkeleton /></div>;
    if (isError) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500">Error: {error.message}</div>;

    return (
        <div className=" md:w-11/12 md:ml-20 lg:ml-0 lg:w-full min-h-screen pt-24 pb-20 px-4 rounded-lg">
            {/* Header  section*/}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12">
                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter capitalize">
                    users <span className="text-stone-800">information</span>
                </h1>
                <div className="flex flex-col md:flex-col gap-4 w-full xl:w-auto">

                    <div className="bg-white text-black px-8 py-4 flex  rounded-lg items-center gap-3 justify-center min-w-[160px]">
                        <span className="text-xl font-black italic tracking-tighter">Total:</span>
                        <span className="text-2xl font-black italic">{filteredUsers.length}</span>
                    </div>
                </div>
            </div>

            {/* Actions section  */}
            <div className="flex gap-4 mb-6">

                <div className="relative flex-grow">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" />
                    <input
                        type="text"
                        placeholder="SEARCH BY NAME..."
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
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest">Id</th>
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest">Name</th>
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest">Email</th>
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest">Type</th>
                                <th className="py-6 px-8 text-[9px] font-black text-stone-600 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/[0.01] transition-all group">
                                        <td className="py-6 px-8 text-stone-700 font-black italic text-sm">EV-{user.id}</td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/5 font-black text-xs ${getColorClass(user.name)}`}>
                                                    {user.name ? user.name[0].toUpperCase() : "?"}
                                                </div>
                                                <span className="text-white font-bold uppercase italic text-sm">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 text-stone-400 text-sm">{user.email}</td>
                                        <td className="px-8 capitalize font-semibold text-stone-300 text-sm">{user.type}</td>
                                        <td className="py-6 px-8 text-center">
                                            <div className="flex items-center justify-center gap-5">
                                                <Link to={`/dashboard/users/${user.id}`} className="text-stone-600 hover:text-white transition-all"><FaEdit size={16} /></Link>
                                                <button
                                                    disabled={deleteMutation.isPending}
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
                                                            if (result.isConfirmed) deleteMutation.mutate(user.id);
                                                        });
                                                    }}
                                                    className="text-stone-600 hover:text-red-600 transition-all disabled:opacity-30"
                                                >
                                                    <MdDelete size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-stone-800 uppercase text-xs tracking-widest">No Users Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
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

export default Users;
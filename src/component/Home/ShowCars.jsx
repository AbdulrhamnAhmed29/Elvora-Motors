import React, { useState } from "react";
import { FaGasPump, FaCogs, FaTachometerAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getProductsToUsers } from "../../APi/PuplicRequests";
import { Link } from "react-router-dom";

function ShowCars() {
  const [selectedName, setSelectedName] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  // Fetch products
  const { data: Userproducts, isLoading, isError, error } = useQuery({
    queryKey: ["ProductToUser"],
    queryFn: getProductsToUsers,
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });

  const Products = Userproducts || [];

  // Names for filter
  const names = [
    "All",
    ...new Map(
      Products.map((car) => {
        const cleanTitle = (car.title || "Unknown").trim().toLowerCase();
        return [cleanTitle, car.title || "Unknown"];
      })
    ).values(),
  ];

  // Filter products by name
  const filteredCars =
    selectedName === "All"
      ? Products
      : Products.filter(
        (car) =>
          (car.title || "").toLowerCase() === selectedName.toLowerCase()
      );

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleFilter = (name) => {
    setSelectedName(name);
    setCurrentPage(1);
  };

  if (isLoading)
    return (
      <p className="text-center text-white py-20 text-lg font-black">
        Loading cars...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 py-20 text-lg font-black">
        Error: {error.message}
      </p>
    );

  return (
    <section className="bg-black py-20" id="pro" >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-4">
            Our <span className="text-gray-500">Collection</span>
          </h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 flex-wrap mb-16">
          {names.map((name, i) => (
            <button
              key={i}
              onClick={() => handleFilter(name)}
              className={`px-8 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-sm border ${selectedName === name
                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "bg-transparent text-gray-500 border-white/10 hover:border-white hover:text-white"
                }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentCars.map((product, index) => (
            <div
              key={index}
              className="group relative bg-stone-900/40 border border-white/5 rounded-sm overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-3"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  loading="lazy"
                  src={product.image || "/placeholder.png"}
                  alt={product.name || "Unnamed Car"}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />

              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                    {product.title || "Unnamed Car"}
                  </h3>
                  <span className="text-white font-light text-sm tracking-widest">
                    {product.year || "2026"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 font-light line-clamp-2 leading-relaxed">
                  {product.description || "No description available."}
                </p>

                <div className="flex justify-between py-4 border-y border-white/5 text-gray-500">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-tighter font-bold">
                    <FaTachometerAlt className="text-white/20" /> 0-100 Km
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-tighter font-bold">
                    <FaCogs className="text-white/20" /> Automatic
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-tighter font-bold">
                    <FaGasPump className="text-white/20" /> Petrol
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <p className="text-white text-2xl font-black tracking-tighter">
                    {product.price ? product.price.toLocaleString() : "N/A"}{" "}
                    <span className="text-xs text-gray-500 font-normal uppercase">
                      EGP
                    </span>
                  </p>
                  <button className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 hover:border-white transition-all pb-1">
                    <Link to={`/details/${product.id}`} >   Details</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-20 gap-3">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                document
                  .getElementById("pro")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`w-10 h-10 flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentPage === i + 1
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "bg-transparent text-gray-500 border border-white/10 hover:border-white hover:text-white"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
}

export default ShowCars;

import React from "react";

const TableSkeleton = () => {
  
  const skeletonRows = Array.from({ length: 6 });

  return (
    <div className="bg-black w-full min-h-screen pt-10 pb-10 px-4 md:px-10">
      {/* Header Skeleton */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12 animate-pulse">
        <div className="space-y-3">
          {/* Title Skeleton */}
          <div className="h-10 bg-stone-900 w-64 rounded-sm"></div>
          {/* Subtitle Skeleton */}
          <div className="h-2 bg-stone-900 w-40 rounded-sm opacity-50"></div>
        </div>

        <div className="flex gap-4 w-full xl:w-auto">
          <div className="h-12 bg-stone-900 w-full md:w-80 rounded-sm border border-white/5"></div>
          <div className="h-12 bg-stone-800 w-32 rounded-sm shadow-xl"></div>
        </div>
      </div>

      {/* Table Skeleton Container */}
      <div className="bg-[#0c0a09] border border-white/5 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="py-6 px-8"><div className="h-2 bg-stone-800 w-10 rounded"></div></th>
                <th className="py-6 px-8"><div className="h-2 bg-stone-800 w-32 rounded"></div></th>
                <th className="py-6 px-8"><div className="h-2 bg-stone-800 w-24 rounded"></div></th>
                <th className="py-6 px-8 text-center"><div className="h-2 bg-stone-800 w-20 mx-auto rounded"></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {skeletonRows.map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {/* ID / Counter Column */}
                  <td className="py-6 px-8">
                    <div className="h-3 bg-stone-900 w-8 rounded"></div>
                  </td>

                  {/* User Profile Column */}
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-sm bg-stone-900 border border-white/5"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-stone-900 w-32 rounded"></div>
                        <div className="h-2 bg-stone-900/40 w-40 rounded"></div>
                      </div>
                    </div>
                  </td>

                  {/* Role/Type Column */}
                  <td className="py-6 px-8">
                    <div className="h-6 bg-stone-900/60 w-16 rounded-full border border-white/5"></div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-6 px-8">
                    <div className="flex justify-center gap-4">
                      <div className="w-8 h-8 bg-stone-900 rounded-sm border border-white/5"></div>
                      <div className="w-8 h-8 bg-stone-900 rounded-sm border border-white/5"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Skeleton */}
        <div className="p-8 border-t border-white/5 bg-white/[0.01] flex flex-col lg:flex-row justify-between items-center gap-8 animate-pulse">
          <div className="h-4 bg-stone-900 w-48 rounded"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 bg-stone-900 rounded-sm border border-white/5"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
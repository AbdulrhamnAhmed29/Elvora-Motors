import React from 'react'

function FormSkeleton() {
    return (
        <div>
            <div className="md:bg-[#0c0a09]/80 animate-pulse md:p-12 flex flex-col gap-6 w-full max-w-lg">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 bg-white/5 border border-white/5 rounded-sm"></div>
                ))}
                <div className="h-20 bg-white/5 border border-white/5 rounded-2xl"></div>
                <div className="h-14 bg-white/20 rounded-sm mt-4"></div>
            </div>

        </div>
    )
}

export default FormSkeleton

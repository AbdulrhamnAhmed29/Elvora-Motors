import React from 'react'
import Header from '../Layout/Header'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'

function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Header />

            <div className='flex-grow flex items-center justify-center relative overflow-hidden'>
                <div className="absolute w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]"></div>

                <div className="relative z-10 text-center px-6">
                    <h1 className="text-[12rem] md:text-[18rem] font-black leading-none text-white/[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                        404
                    </h1>

                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="p-4 bg-white/5 rounded-full border border-white/10">
                                <FaExclamationTriangle className="text-gray-500 text-3xl" />
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white">
                            Lost your <span className="text-gray-500">Way?</span>
                        </h2>

                        <p className="text-gray-400 font-light tracking-widest uppercase text-sm max-w-md mx-auto">
                            The page you are looking for doesn't exist or has been moved to another track.
                        </p>

                       
                    </div>
                </div>

                <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-20">
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
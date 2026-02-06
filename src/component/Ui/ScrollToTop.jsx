import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopButton = () => {
    const [showBtn, setShowBtn] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const percentage = (currentScroll / scrollHeight) * 100;
            setScrollPercentage(percentage);

            if (currentScroll > 400) {
                setShowBtn(true);
            } else {
                setShowBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scrollPercentage / 100) * circumference;

    return (
        <div 
            className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
                showBtn ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50"
            }`}
        >
            <button
                onClick={scrollToTop}
                className="relative group flex items-center justify-center w-14 h-14 bg-black rounded-full border border-white/10 hover:border-white transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
                <svg className="absolute -rotate-90 w-16 h-16">
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-white/5"
                    />
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset: offset }}
                        className="text-white transition-all duration-200"
                    />
                </svg>

                <FaChevronUp className="text-white group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
            </button>
        </div>
    );
};

export default ScrollToTopButton;
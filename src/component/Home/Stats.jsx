import React, { useEffect, useState } from "react";
import { FaCarSide, FaTrophy, FaUsers } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: <FaCarSide className="text-4xl mb-4 text-white/50 group-hover:text-white transition-colors duration-500" />,
      number: 500,
      suffix: "+",
      label: "Vehicles Delivered",
      description: "Hand-picked premium vehicles delivered to their new homes.",
    },
    {
      id: 2,
      icon: <FaTrophy className="text-4xl mb-4 text-white/50 group-hover:text-white transition-colors duration-500" />,
      number: 10,
      suffix: "+",
      label: "Years of Excellence",
      description: "A decade of providing top-tier automotive services and building trust.",
    },
    {
      id: 3,
      icon: <FaUsers className="text-4xl mb-4 text-white/50 group-hover:text-white transition-colors duration-500" />,
      number: 99,
      suffix: "%",
      label: "Customer Satisfaction",
      description: "Our clients' happiness is our ultimate performance metric.",
    },
  ];

  return (
    <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = stat.number;
    const duration = 2000; // 2 seconds
    const incrementTime = Math.floor(duration / end);

    const counter = setInterval(() => {
      start += 1;
      if (start >= end) {
        clearInterval(counter);
        start = end;
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(counter);
  }, [stat.number]);

  return (
    <div className="group relative transition-all duration-500">
      <div className="flex justify-center group-hover:-translate-y-2 transition-transform duration-500">
        {stat.icon}
      </div>

      <h3 className="text-6xl font-black text-white mb-2 tracking-tighter inline-flex items-center">
        {count}
        {stat.suffix}
      </h3>

      <p className="text-xs uppercase tracking-[0.4em] text-gray-500 font-black mb-6">
        {stat.label}
      </p>

      <div className="w-8 h-[2px] bg-white/20 mx-auto mb-6 group-hover:w-24 group-hover:bg-white transition-all duration-700"></div>

      <p className="text-gray-500 font-light leading-relaxed max-w-[280px] mx-auto text-sm group-hover:text-gray-300 transition-colors">
        {stat.description}
      </p>
    </div>
  );
};

export default StatsSection;

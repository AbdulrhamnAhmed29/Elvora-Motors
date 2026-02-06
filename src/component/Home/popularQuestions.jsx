import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        {
            question: "Do you offer flexible installment plans?",
            answer: "Yes, we partner with several leading banks to provide financing options tailored to your budget, with repayment terms up to 60 months."
        },
        {
            question: "Is there a warranty on certified pre-owned cars?",
            answer: "Absolutely. Every vehicle in our showroom undergoes a rigorous 150-point inspection and comes with a minimum 12-month certified warranty."
        },
        {
            question: "Can I trade in my current vehicle?",
            answer: "We offer competitive trade-in valuations. You can bring your current car for a free expert appraisal and use its value towards your new dream car."
        },
        {
            question: "How long does the delivery process take?",
            answer: "Once the paperwork and financing are finalized, we offer door-to-door delivery within 48 hours for local clients."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-stone-950 text-white border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                        Common <span className="text-gray-500">Inquiries</span>
                    </h2>
                    <p className="text-gray-400 font-light tracking-widest uppercase text-sm">
                        Everything you need to know before you drive away
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div
                            key={index}
                            className={`border border-white/10 transition-all duration-500 ${activeIndex === index ? 'bg-white/[0.03]' : 'bg-transparent'}`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-gray-400'}`}>
                                    {item.question}
                                </span>
                                {activeIndex === index ? (
                                    <FaMinus className="text-sm text-gray-500" />
                                ) : (
                                    <FaPlus className="text-sm text-gray-500" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="px-6 pb-6 text-gray-400 leading-relaxed font-light border-t border-white/5 pt-4">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
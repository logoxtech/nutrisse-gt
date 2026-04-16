"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-stone-200 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition">
          <button
            onClick={() => toggleOpen(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
          >
            <span className="font-bold text-nutrisse-charcoal text-base md:text-lg">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="text-nutrisse-sage flex-shrink-0 ml-4" size={24} />
            ) : (
              <ChevronDown className="text-stone-400 flex-shrink-0 ml-4" size={24} />
            )}
          </button>
          
          {openIndex === index && (
             <div className="px-6 pb-5 text-stone-600 leading-relaxed text-sm md:text-base border-t border-stone-100 pt-4">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

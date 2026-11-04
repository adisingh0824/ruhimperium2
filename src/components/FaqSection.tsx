import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQItem } from "../types";
import { DEFAULT_FAQS } from "../data/mockData";

interface FaqSectionProps {
  faqs?: FAQItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-stone-200/70" id="faq-section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* FAQ HEADER — fix #16 & #17: removed duplicate "Ask Concierge" CTA from header;
            single contact action kept in the "Still have questions?" card below */}
        <div className="mb-12 border-b border-stone-200/80 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[#A3483B] text-xs font-sans uppercase tracking-wider font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          {/* Fix #27: decorative inline image removed from the heading so it doesn't disrupt reading flow */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light mt-2">
            Everything you need to know about traditional Kannauj slow-perfumery, application rituals, and botanical pure oils.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200/80" role="list">
          {activeFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5 transition-colors" role="listitem">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] rounded"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-serif transition-colors ${
                    isOpen ? "text-[#15803d] font-medium" : "text-stone-900 group-hover:text-[#15803d]"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                    isOpen 
                      ? "bg-[#15803d] border-[#15803d] text-white" 
                      : "border-stone-200 text-stone-600 group-hover:border-[#15803d] group-hover:text-[#15803d]"
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-xs sm:text-sm text-stone-600 font-light leading-relaxed animate-fade-in pr-10">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Single consolidated concierge CTA (fix #16 & #17) */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">Still have questions?</h3>
            <p className="text-xs text-stone-500 font-light mt-0.5">Our olfactory concierges are on standby to assist with fragrance layering and bespoke blends.</p>
          </div>
          <a
            href="mailto:concierge@ruhimperium.com"
            className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-[#19a24b] text-white text-xs font-sans font-semibold tracking-wide transition-colors shrink-0"
          >
            Chat with Concierge
          </a>
        </div>

      </div>
    </section>
  );
}

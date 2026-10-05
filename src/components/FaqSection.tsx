import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How do I choose the right fragrance for me?",
    answer: "Start by exploring scent families you enjoy — floral, woody, fresh, or spicy. Each attar evolves uniquely on your skin, so your perfect match is one that feels natural and memorable to you."
  },
  {
    question: "How long do attars last on the skin?",
    answer: "Our attars are highly concentrated and alcohol-free, offering long-lasting fragrance that can stay for hours and gently evolve throughout the day."
  },
  {
    question: "Are your perfumes alcohol-free?",
    answer: "Yes, all our attars are crafted using natural oils and traditional methods, completely free from alcohol — making them skin-friendly and authentic."
  },
  {
    question: "How should I apply attar for best results?",
    answer: "Apply a small amount on pulse points like wrists, neck, and behind the ears. The warmth of your body helps the fragrance develop beautifully."
  },
  {
    question: "Are these fragrances suitable for daily use?",
    answer: "Absolutely. Our attars are gentle on the skin and perfect for both everyday wear and special occasions."
  },
  {
    question: "Where are your fragrances manufactured?",
    answer: "100% of our botanical attars and oils are hydro-distilled in ancestral copper degh-bhapka stills in Kannauj, Uttar Pradesh—the historic perfume capital of India with over two centuries of unbroken craftsmanship."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-stone-200/70" id="faq-section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* QUIQ CTA: FAQ HEADER (RAAHI PARFUMS STYLE) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-stone-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[#C47265] text-[10px] font-mono uppercase tracking-[0.25em] font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight flex flex-wrap items-center gap-3">
              <span>Frequently Asked</span>
              <span className="inline-block w-14 sm:w-18 h-7 sm:h-9 rounded-full overflow-hidden border border-stone-300 shadow-inner align-middle">
                <img
                  src="https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=200"
                  alt="Distillery Still"
                  className="w-full h-full object-cover"
                />
              </span>
              <span>Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light mt-1">
              Everything you need to know about traditional Kannauj slow-perfumery, application rituals, and botanical pure oils.
            </p>
          </div>
          <a
            href="mailto:support@ruhimperium.com"
            className="px-6 py-2.5 rounded-full border border-stone-900 bg-stone-900 hover:bg-[#19a24b] hover:border-[#19a24b] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer shadow-xs shrink-0 inline-flex items-center gap-2"
          >
            <span>Ask Concierge</span>
          </a>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200/80">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-serif transition-colors ${
                    isOpen ? "text-[#19a24b] font-medium" : "text-stone-900 group-hover:text-[#19a24b]"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                    isOpen 
                      ? "bg-[#19a24b] border-[#19a24b] text-white" 
                      : "border-stone-200 text-stone-600 group-hover:border-[#19a24b] group-hover:text-[#19a24b]"
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

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-serif font-bold text-stone-900">Still have questions?</h4>
            <p className="text-xs text-stone-500 font-light mt-0.5">Our olfactory concierges are on standby to assist with fragrance layering and bespoke blends.</p>
          </div>
          <a
            href="mailto:concierge@ruhimperium.com"
            className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-[#19a24b] text-white text-[10px] font-mono uppercase tracking-widest transition-colors shrink-0"
          >
            Chat with Concierge
          </a>
        </div>

      </div>
    </section>
  );
}

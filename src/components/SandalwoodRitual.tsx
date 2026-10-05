import React from "react";
import { ArrowRight } from "lucide-react";

interface SandalwoodRitualProps {
  onExplore?: () => void;
}

export default function SandalwoodRitual({ onExplore }: SandalwoodRitualProps) {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-sand-200/70 overflow-hidden" id="sandalwood-ritual-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Visual Canvas (Left Column) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square max-w-[560px] mx-auto rounded-[2rem] overflow-hidden shadow-lg border border-stone-150 bg-stone-100 group">
              <img
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200"
                alt="Sandalwood Stick and Rubbing Stone"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Copy and CTA (Right Column) */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight font-bold">
              Sandalwood Stick + Rubbing Stone
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              <p className="text-base sm:text-lg font-medium text-stone-850">
                Ayurveda's chill pill!
              </p>
              <p>
                Spa treatment from nature – calming your mind, pampering your skin, and making you smell divine all at once.
              </p>
              <p>
                When modern life goes nuts, trust this ancient remedy to bring back your inner balance. 🌼🧘‍♂️
              </p>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onExplore}
                className="px-8 py-3.5 bg-stone-900 hover:bg-[#19a24b] text-white text-xs uppercase font-mono tracking-widest font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2.5 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

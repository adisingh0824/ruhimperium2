import React from "react";

export default function ImpactNumbers() {
  return (
    <section className="bg-[#0b0b0b] text-white py-16 sm:py-24 border-b border-stone-850" id="impact-numbers-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-10 sm:mb-14 text-white" style={{ fontFamily: "Georgia, serif" }}>
          Built Through Generations, Told Through Numbers
        </h2>

        {/* 7-Tile Asymmetric Bento Grid matching Raahi Parfums */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Tile A: 200k+ Fragrances Delivered */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[200px] border border-white/5 hover:border-white/10 transition-colors">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5">
              200k+
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              Fragrances Delivered
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              Making India’s native perfumery accessible to the entire world.
            </p>
          </div>

          {/* Tile B: 72% Customer Satisfaction */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[200px] border border-white/5 hover:border-white/10 transition-colors">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5">
              72%
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              Customer Satisfaction
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              Loved for natural aroma and authentic craftsmanship.
            </p>
          </div>

          {/* Tile C: Square Image */}
          <div className="rounded-3xl overflow-hidden min-h-[260px] relative border border-white/5 group">
            <img 
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800" 
              alt="Ancestral copper distillation stills in Kannauj" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Tile D: 24h Fast Dispatch */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[200px] border border-white/5 hover:border-white/10 transition-colors">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5">
              24h
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              Fast Dispatch
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              Quick shipping so your signature scent reaches you sooner.
            </p>
          </div>

          {/* Tile E: Wide Rectangle Image (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden min-h-[240px] sm:min-h-[280px] relative border border-white/5 group">
            <img 
              src="https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=1200" 
              alt="Artisanal perfume formulation" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Tile F: 75+ Signature Blends */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[200px] border border-white/5 hover:border-white/10 transition-colors">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5">
              75+
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              Signature Blends
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              A diverse collection of attars crafted for every mood and moment.
            </p>
          </div>

          {/* Tile G: 200+ Years of Expertise */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[200px] border border-white/5 hover:border-white/10 transition-colors">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5">
              200+
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              Years of Expertise
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              Blending tradition and innovation in every bottle.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

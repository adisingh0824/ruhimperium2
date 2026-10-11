import React from "react";
import { SiteSettings } from "../types";

interface ImpactNumbersProps {
  siteSettings?: SiteSettings;
}

export default function ImpactNumbers({ siteSettings }: ImpactNumbersProps) {
  const card1Badge = siteSettings?.statsCard1Badge || "GLOBAL REACH";
  const card1Value = siteSettings?.statsCard1Value || "200k+";
  const card1Title = siteSettings?.statsCard1Title || "Fragrances Delivered";
  const card1Desc = siteSettings?.statsCard1Desc || "Making India’s native perfumery accessible to the entire world.";

  const card2Badge = siteSettings?.statsCard2Badge || "LOYALTY INDEX";
  const card2Value = siteSettings?.statsCard2Value || "72%";
  const card2Title = siteSettings?.statsCard2Title || "Customer Satisfaction";
  const card2Desc = siteSettings?.statsCard2Desc || "Loved for natural aroma and authentic craftsmanship.";

  const card3Image = siteSettings?.statsCard3Image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800";
  const card3Title = siteSettings?.statsCard3Title || "True Botanical Heritage";

  const card4Badge = siteSettings?.statsCard4Badge || "LOGISTICS LOGS";
  const card4Value = siteSettings?.statsCard4Value || "24h";
  const card4Title = siteSettings?.statsCard4Title || "Fast Dispatch";
  const card4Desc = siteSettings?.statsCard4Desc || "Quick shipping so your signature scent reaches you sooner.";

  const card5Image = siteSettings?.statsCard5Image || "https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=1200";
  const card5Title = siteSettings?.statsCard5Title || "Heritage Distillation Stoves";

  const card6Badge = siteSettings?.statsCard6Badge || "PORTFOLIO ACCORDS";
  const card6Value = siteSettings?.statsCard6Value || "75+";
  const card6Title = siteSettings?.statsCard6Title || "Signature Blends";
  const card6Desc = siteSettings?.statsCard6Desc || "A diverse collection of attars crafted for every mood and moment.";

  const card7Badge = siteSettings?.statsCard7Badge || "LEGACY COEFFICIENT";
  const card7Value = siteSettings?.statsCard7Value || "200+";
  const card7Title = siteSettings?.statsCard7Title || "Years of Expertise";
  const card7Desc = siteSettings?.statsCard7Desc || "Blending tradition and innovation in every bottle.";

  return (
    <section className="bg-[#0b0b0b] text-white py-16 sm:py-24 border-b border-stone-850" id="impact-numbers-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-10 sm:mb-14 text-white">
          Built Through Generations, Told Through Numbers
        </h2>

        {/* 7-Tile Asymmetric Bento Grid matching Raahi Parfums */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4 sm:gap-6">
          
          {/* Tile A: Fragrances Delivered */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end h-full min-h-[220px] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BC96] mb-auto block font-semibold">
              {card1Badge}
            </span>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5 mt-4">
              {card1Value}
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              {card1Title}
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              {card1Desc}
            </p>
          </div>

          {/* Tile B: Customer Satisfaction */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end h-full min-h-[220px] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BC96] mb-auto block font-semibold">
              {card2Badge}
            </span>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5 mt-4">
              {card2Value}
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              {card2Title}
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              {card2Desc}
            </p>
          </div>

          {/* Tile C: Square Image */}
          <div className="rounded-3xl overflow-hidden h-full min-h-[220px] relative border border-white/5 group">
            <img 
              src={card3Image} 
              alt={card3Title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Tile D: Fast Dispatch */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end h-full min-h-[220px] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BC96] mb-auto block font-semibold">
              {card4Badge}
            </span>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5 mt-4">
              {card4Value}
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              {card4Title}
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              {card4Desc}
            </p>
          </div>

          {/* Tile E: Wide Rectangle Image (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden h-full min-h-[220px] relative border border-white/5 group">
            <img 
              src={card5Image} 
              alt={card5Title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Tile F: Signature Blends */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end h-full min-h-[220px] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BC96] mb-auto block font-semibold">
              {card6Badge}
            </span>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5 mt-4">
              {card6Value}
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              {card6Title}
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              {card6Desc}
            </p>
          </div>

          {/* Tile G: Years of Expertise */}
          <div className="bg-[#0f0f0f] rounded-3xl p-6 sm:p-8 flex flex-col justify-end h-full min-h-[220px] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BC96] mb-auto block font-semibold">
              {card7Badge}
            </span>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-2.5 mt-4">
              {card7Value}
            </p>
            <p className="text-[#dd6570] text-sm sm:text-base font-semibold mb-2">
              {card7Title}
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              {card7Desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

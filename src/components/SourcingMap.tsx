import { useState } from "react";
import { MapPin, Sparkles, BookOpen, Compass, Info, ArrowUpRight } from "lucide-react";
import { MAP_SPOTS } from "../data";
import { MapSpot, Product } from "../types";

interface SourcingMapProps {
  products: Product[];
  onInteractProduct?: (product: Product) => void;
}

export default function SourcingMap({ products, onInteractProduct }: SourcingMapProps) {
  const [selectedSpot, setSelectedSpot] = useState<MapSpot>(MAP_SPOTS[0]);

  return (
    <section className="bg-sand-100 py-16 sm:py-24 border-b border-sand-200" id="sourcing-map-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-medium block mb-2">
            The Territory of Scent
          </span>
          <h2 className="text-3xl sm:text-5xl font-light font-display text-sand-900 tracking-wide mb-6">
            Ingredient Sourcing Map
          </h2>
          <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-sand-500 font-light leading-relaxed">
            Our luxury fragrances are inspired by our founder's travel logs. We traverse key Indian hubs, collaborating with sustainable cooperatives to hydro-distill biological extracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sourcing Hubs Grid / Interactive Map (LHS - 7 cols) */}
          <div className="lg:col-span-7 bg-[#FAFAFA] rounded-2xl border border-sand-200/50 p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col items-center">
            {/* Compass rose ambient visual */}
            <div className="absolute top-4 right-4 text-sand-300 opacity-60 flex flex-col items-center pointer-events-none">
              <Compass className="w-12 h-12 stroke-[0.75] animate-spin-slow text-[#D4BC96]" />
              <span className="text-[7px] tracking-[0.2em] uppercase mt-1 font-mono">WANDERLUST</span>
            </div>

            {/* Stylized high-end SVG vector map of India / South Asia region */}
            <div className="relative w-full max-w-[500px] aspect-[4/5] bg-sand-50/20 rounded-xl flex items-center justify-center p-3 select-none">
              {/* Graphic silhouette block representation */}
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full opacity-[0.95] stroke-sand-200 fill-sand-100 stroke-[0.35]"
                xmlns="http://www.w3.org/1500/svg"
              >
                {/* Outlines representing South Asia / India schematically */}
                <path
                  d="M45 10 
                     C55 12, 57 15, 62 14 
                     C65 15, 66 18, 62 21 
                     C60 22, 60 25, 58 26 
                     C56 28, 54 30, 52 32 
                     C52 35, 54 38, 51 40 
                     C48 42, 53 43, 55 45 
                     C58 46, 68 47, 72 43 
                     C75 42, 79 40, 81 37 
                     C85 36, 88 38, 86 42 
                     C84 45, 80 44, 76 46 
                     C72 48, 70 51, 65 49 
                     C61 48, 58 52, 54 50 
                     C51 49, 49 53, 44 54 
                     C41 55, 38 52, 35 54 
                     C33 55, 30 52, 28 53
                     C25 54, 21 52, 20 48 
                     C20 44, 23 42, 26 40 
                     C29 38, 30 35, 30 31 
                     C30 26, 32 24, 33 20 
                     C34 16, 38 12, 42 12 Z"
                  className="fill-sand-100 stroke-sand-300 stroke-[0.5]"
                />
                
                {/* Peninsular Deccan shape */}
                <path
                  d="M34 54
                     C35 62, 38 72, 39 80
                     C40 85, 41 90, 42 96
                     C42 98, 44 100, 44 96
                     C44 94, 46 88, 47 84
                     C49 80, 52 74, 53 70
                     C54 68, 56 65, 54 61
                     C53 58, 51 55, 49 53 Z"
                  className="fill-sand-100 stroke-sand-300 stroke-[0.5]"
                />

                {/* Connecting routes dashed beauty line */}
                <path
                  d="M 35 78 L 34 84 L 52 44 L 82 36"
                  fill="none"
                  stroke="#D4BC96"
                  strokeWidth="0.5"
                  strokeDasharray="1.5, 1.5"
                  className="opacity-70 animate-pulse"
                />
              </svg>

              {/* Graphical Hotspots placed dynamically over our coordinates values */}
              {MAP_SPOTS.map((spot) => {
                const isSelected = selectedSpot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedSpot(spot)}
                    className="absolute group transition-transform duration-300 hover:scale-110 cursor-pointer focus:outline-none"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    id={`map-spot-btn-${spot.id}`}
                  >
                    {/* Ring anim */}
                    <span className={`absolute -inset-2.5 rounded-full bg-[#D4BC96]/30 transition-all duration-1000 ${
                      isSelected ? "animate-ping opacity-80" : "scale-50 opacity-0 group-hover:scale-75 group-hover:opacity-40"
                    }`} />
                    
                    {/* Glow dot */}
                    <div className={`relative w-4.5 h-4.5 rounded-full flex items-center justify-center shadow transition-all duration-300 ${
                      isSelected 
                        ? "bg-[#2D2926] text-white border-2 border-[#D4BC96] scale-110" 
                        : "bg-white border-2 border-sand-400 text-sand-700 hover:border-[#D4BC96]"
                    }`}>
                      <MapPin className="w-2.5 h-2.5 fill-current" />
                    </div>

                    {/* Popover Hover Label */}
                    <span className="absolute left-1/2 -translate-x-1/2 top-6 bg-[#2D2926] hover:scale-101 border border-sand-900 duration-200 text-white text-[9.5px] uppercase tracking-widest px-2.5 py-1 rounded shadow-lg opacity-0 translate-y-1 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all whitespace-nowrap z-10">
                      {spot.mainIngredient}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick selector buttons */}
            <div className="w-full border-t border-sand-200 pt-6 mt-6 flex flex-wrap gap-2 justify-center">
              {MAP_SPOTS.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedSpot(spot)}
                  className={`text-[10px] uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
                    selectedSpot.id === spot.id
                      ? "bg-[#2D2926] text-white border-sand-900 shadow-sm"
                      : "bg-white text-sand-500 border-sand-200 hover:border-sand-400"
                  }`}
                >
                  {spot.name.split(",")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Sourcing Detail Narrative (RHS - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <div className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm relative">
              <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 bg-[#D4BC96]/15 w-18 h-18 rounded-full pointer-events-none flex items-center justify-center opacity-60">
                <Sparkles className="w-6 h-6 text-[#D4BC96] stroke-[1]" />
              </div>

              {/* Sourcing Location Header */}
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-sand-400 uppercase mb-3">
                <Compass className="w-3.5 h-3.5 text-[#D4BC96] animate-spin-slow" />
                <span>ACTIVE SOURCE RECOVERY</span>
              </div>
              <h3 className="text-2xl sm:text-3.5xl font-light font-display text-sand-900 tracking-wide mb-3">
                {selectedSpot.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#D4BC96] font-medium mb-6">
                Featured: {selectedSpot.mainIngredient}
              </p>

              <div className="h-[1px] w-full bg-sand-200/80 mb-6 font-display"></div>

              {/* Sourcing short summary */}
              <p className="text-sand-600 text-sm font-light leading-relaxed mb-4 italic p-3.5 bg-sand-50 border-l-2 border-[#D4BC96] rounded-r-md">
                "{selectedSpot.description}"
              </p>

              {/* Sourcing narrative */}
              <p className="text-sand-500 text-sm font-light leading-relaxed mb-6">
                {selectedSpot.story}
              </p>

              {/* Featured variant quick redirect */}
              <div className="bg-[#2D2926] hover:scale-101 duration-300 text-white p-4.5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-sand-400 mb-1">
                    Related Scent profile
                  </p>
                  <p className="text-sm font-serif tracking-wide text-white">
                    {selectedSpot.id === "mysore" && "Sandalwood Attar Heritage"}
                    {selectedSpot.id === "malabar" && "Sandy Hills EDP"}
                    {selectedSpot.id === "kannauj" && "Gulab EDP"}
                    {selectedSpot.id === "assam" && "Sidr Wood EDP"}
                  </p>
                </div>
                {onInteractProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      const id = 
                        selectedSpot.id === "mysore" ? "sandalwood-attar" : 
                        selectedSpot.id === "malabar" ? "sandy-hills" : 
                        selectedSpot.id === "kannauj" ? "gulab-edp" : "sidr-wood";
                      const matchedProd = products.find((p) => p.id === id);
                      if (matchedProd) {
                        onInteractProduct(matchedProd);
                      }
                    }}
                    className="p-2 bg-sand-900 group rounded-full border border-sand-800 text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

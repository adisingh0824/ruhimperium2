import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Collection } from "../types";

interface CategorySliderProps {
  collections: Collection[];
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export const CATEGORY_ITEMS = [
  {
    id: "Authentic Indian Attars",
    title: "Authentic Indian Attars",
    tagline: "Copper Still Hydro-Distilled",
    image: "https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=800",
    count: "7 Blends"
  },
  {
    id: "Eau De Parfum",
    title: "Eau De Parfum",
    tagline: "Fine Luminous Mists",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    count: "4 Creations"
  },
  {
    id: "Modern Attars",
    title: "Modern Attars",
    tagline: "Next-Gen Scent Profiles",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    count: "5 Blends"
  },
  {
    id: "Indian Artisanal fragrances",
    title: "Indian Artisanal fragrances",
    tagline: "Small-Batch Masterpieces",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800",
    count: "4 Signatures"
  },
  {
    id: "Discovery Set",
    title: "Discovery Sets",
    tagline: "Travel Coffrets & Gift Sets",
    image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=800",
    count: "Curated Sets"
  },
  {
    id: "Ruh / Absolute Oil",
    title: "Ruh | Absolute Oils",
    tagline: "Pure Uncut Extracts",
    image: "https://images.unsplash.com/photo-1595151830531-2974eb3a13d7?auto=format&fit=crop&q=80&w=800",
    count: "Sacred Absolutes"
  }
];

export default function CategorySlider({ onSelectCategory, selectedCategory }: CategorySliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollerRef.current) return;
    const distance = 300;
    scrollerRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth"
    });
  };

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-stone-200/70" id="category-slider-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header row with arrows */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#C47265] font-bold block mb-1">
              CURATED ARCHIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-tight">
              Explore by Collection
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer shadow-2xs hover:bg-stone-50"
              aria-label="Previous categories"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer shadow-2xs hover:bg-stone-50"
              aria-label="Next categories"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider with Right Gradient Fade */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth snap-x snap-mandatory pr-12"
          >
            {CATEGORY_ITEMS.map((item) => {
              const isSelected = selectedCategory.toLowerCase() === item.id.toLowerCase();

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className="group flex flex-col items-center w-[200px] sm:w-[240px] flex-shrink-0 cursor-pointer snap-start"
                >
                  {/* Image card with rounded corners matching Raahi Parfums */}
                  <div className={`w-full aspect-[4/5] rounded-[1.75rem] overflow-hidden bg-stone-100 border relative transition-all duration-500 group-hover:-translate-y-1.5 ${
                    isSelected 
                      ? "border-[#19a24b] shadow-lg ring-2 ring-[#19a24b]/30" 
                      : "border-stone-200/60 shadow-xs group-hover:shadow-xl"
                  }`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-widest">
                      {item.count}
                    </span>
                  </div>

                  {/* Category Title */}
                  <div className="text-center mt-3.5 space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-900 tracking-wide group-hover:text-[#19a24b] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 font-sans tracking-normal">
                      {item.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Subtle Right-edge Gradient Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-14 bg-gradient-to-l from-white to-transparent hidden sm:block" aria-hidden="true" />
        </div>

      </div>
    </section>
  );
}

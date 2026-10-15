import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Collection } from "../types";

interface CategorySliderProps {
  collections?: Collection[];
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
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
    count: "Sacred Absolutes"
  }
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800";

export default function CategorySlider({ collections = [], onSelectCategory, selectedCategory }: CategorySliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollerRef.current) return;
    const distance = 300;
    scrollerRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth"
    });
  };

  // Merge dynamic admin collections with default items
  // This allows the admin to edit titles, taglines, and cover photos live from the Admin Panel
  const dynamicItems = CATEGORY_ITEMS.map((defaultItem) => {
    const adminCol = collections.find(
      (c) =>
        c.id.toLowerCase() === defaultItem.id.toLowerCase() ||
        c.name.toLowerCase() === defaultItem.title.toLowerCase() ||
        (defaultItem.id === "Ruh / Absolute Oil" && (c.id.includes("absolute") || c.name.toLowerCase().includes("absolute")))
    );

    if (adminCol) {
      return {
        id: defaultItem.id,
        title: adminCol.name || defaultItem.title,
        tagline: adminCol.tag || defaultItem.tagline,
        image: adminCol.image || defaultItem.image,
        count: adminCol.count || defaultItem.count
      };
    }
    return defaultItem;
  });

  // Also include any extra custom collections the admin stamped in the Admin Panel
  const extraCollections = collections
    .filter(
      (c) =>
        !CATEGORY_ITEMS.some(
          (d) =>
            d.id.toLowerCase() === c.id.toLowerCase() ||
            d.title.toLowerCase() === c.name.toLowerCase() ||
            (d.id === "Ruh / Absolute Oil" && (c.id.includes("absolute") || c.name.toLowerCase().includes("absolute")))
        )
    )
    .map((c) => ({
      id: c.id,
      title: c.name,
      tagline: c.tag || "Bespoke Collection",
      image: c.image || FALLBACK_IMAGE,
      count: c.count || "Signature Blend"
    }));

  const allItems = [...dynamicItems, ...extraCollections];

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-stone-200/70" id="category-slider-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header row with integrated navigation controls */}
        <div className="mb-8 pb-4 border-b border-stone-100 flex items-end justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#A3483B] font-bold block mb-1">
              CURATED ARCHIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-tight">
              Explore by Collection
            </h3>
          </div>

          {/* Symmetrical header navigation arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer shadow-xs hover:bg-stone-50 bg-white"
              aria-label="Previous categories"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors cursor-pointer shadow-xs hover:bg-stone-50 bg-white"
              aria-label="Next categories"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Track */}
        <div className="relative">
          <div
            ref={scrollerRef}
            tabIndex={0}
            role="region"
            aria-label="Fragrance categories slider"
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth snap-x snap-mandatory pr-6 focus:outline-none focus:ring-1 focus:ring-stone-400 rounded-2xl"
          >
            {allItems.map((item) => {
              const isSelected = selectedCategory.toLowerCase() === item.id.toLowerCase();

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className="group flex flex-col items-center w-[200px] sm:w-[240px] flex-shrink-0 cursor-pointer snap-start"
                >
                  {/* Image card */}
                  <div className={`w-full aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border relative transition-all duration-500 group-hover:-translate-y-1.5 ${
                    isSelected 
                      ? "border-[#19a24b] shadow-lg ring-2 ring-[#19a24b]/30" 
                      : "border-stone-200/60 shadow-xs group-hover:shadow-xl"
                  }`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-900 text-white text-xs font-mono tracking-wider">
                      {item.count}
                    </span>
                  </div>

                  {/* Category Title */}
                  <div className="text-center mt-3.5 space-y-0.5 bg-white" style={{ isolation: 'isolate' }}>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-900 tracking-wide group-hover:text-[#19a24b] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-600 font-sans tracking-normal">
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

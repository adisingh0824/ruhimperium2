import { Flower2, Trees, Wind, Sparkles, Coffee, Flame } from "lucide-react";

interface ShopByNotesProps {
  onSelectNote: (note: string) => void;
  activeNote?: string;
}

export const AROMA_NOTES = [
  {
    id: "Floral",
    name: "Floral",
    icon: Flower2,
    description: "Soft, romantic, and graceful. Floral notes capture the beauty of blooming petals—Kannauj Rose, Royal Mogra, and Jasmine—for timeless elegance.",
    /* fix #38-45 – removed /80 and /40 opacity so axe resolves a solid background for contrast checks */
    gradient: "from-rose-50 to-pink-50",
    border: "hover:border-rose-300",
    badge: "text-rose-700 bg-rose-50",
    sampleFragrances: "Gulab EDP, Mogra Attar, Aarzoo"
  },
  {
    id: "Woody",
    name: "Woody",
    icon: Trees,
    description: "Deep, warm, and grounded. Woody compositions bring rich forest-inspired tones—Mysore Sandalwood, Himalayan Cedarwood, and Assam Dark Agarwood.",
    /* fix #46-53 – removed /80 and /40 opacity */
    gradient: "from-amber-50 to-stone-50",
    border: "hover:border-amber-300",
    badge: "text-amber-800 bg-amber-50",
    sampleFragrances: "Sandalwood Attar, Musafir EDP, Dahn al Oud"
  },
  {
    id: "Fresh",
    name: "Fresh",
    icon: Wind,
    description: "Crisp, clean, and uplifting. Fresh fragrances energize the senses with airy brightness, Italian bergamot, sea salt, and coastal desert winds.",
    /* fix #54-61 – removed /80 and /40 opacity */
    gradient: "from-sky-50 to-teal-50",
    border: "hover:border-sky-300",
    badge: "text-sky-800 bg-sky-50",
    sampleFragrances: "Safar EDP, Zara EDP, Forest Rush"
  },
  {
    id: "Musky",
    name: "Musky",
    icon: Sparkles,
    description: "Smooth, sensual, and unforgettable. Musky notes add intimacy and mysterious warmth, leaving behind a magnetic trail that feels bold yet polished.",
    /* fix #62-69 – removed /80 and /40 opacity */
    gradient: "from-purple-50 to-stone-50",
    border: "hover:border-purple-300",
    badge: "text-purple-800 bg-purple-50",
    sampleFragrances: "Black Musk, Aarzoo Attar, Modern Musk"
  },
  {
    id: "Gourmand",
    name: "Gourmand",
    icon: Coffee,
    description: "Delicious, creamy, and addictive. Gourmand scents blend sweet edible-inspired notes—wild Sidr mountain honey, golden caramel, and rich vanilla nectar.",
    /* fix #70-77 – removed /80 and /40 opacity */
    gradient: "from-orange-50 to-amber-50",
    border: "hover:border-orange-300",
    badge: "text-orange-800 bg-orange-50",
    sampleFragrances: "Musafir EDP, Safar EDP, Sweet Amber"
  },
  {
    id: "Oriental",
    name: "Oriental",
    icon: Flame,
    description: "Rich, opulent, and magnetic. Oriental blends unite precious Kashmiri saffron, warm amber, and exotic spices for a statement-making scent experience.",
    /* fix #78-85 – removed /80 and /40 opacity */
    gradient: "from-yellow-50 to-red-50",
    border: "hover:border-yellow-400",
    badge: "text-yellow-800 bg-yellow-50",
    sampleFragrances: "Saffron Attar (Kesar), Dahn al Oud, Raat ki Rani"
  }
];

export default function ShopByNotes({ onSelectNote, activeNote }: ShopByNotesProps) {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-stone-200/70" id="shop-by-notes-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#A3483B] font-bold block mb-2">
            Explore our Olfactory Families
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 tracking-tight mb-4">
            Shop by Notes
          </h2>
          <div className="h-[1.5px] w-14 bg-[#D4BC96] mx-auto mb-5"></div>
          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
            Discover your signature scent through an olfactory landscape designed to feel elegant, modern, and luxurious. Explore each fragrance family and find the mood that defines you.
          </p>
        </div>

        {/* Notes Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AROMA_NOTES.map((note) => {
            const Icon = note.icon;
            const isSelected = activeNote?.toLowerCase() === note.id.toLowerCase();

            return (
              // fix #38-85 – isolation:isolate prevents the watermark icon from confusing axe's bg resolver
              <div
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={`group relative rounded-3xl p-8 border transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden bg-gradient-to-br ${note.gradient} ${
                  isSelected
                    ? "border-[#19a24b] shadow-lg ring-2 ring-[#19a24b]/30"
                    : `border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 ${note.border}`
                }`}
                style={{ isolation: 'isolate' as const }}
              >
              {/* Background watermarked floral/leaf icon */}
              <Icon className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 text-stone-900 pointer-events-none group-hover:scale-110 transition-transform duration-700" />

              <div className="relative z-10 space-y-4">
                {/* Icon Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200/60 shadow-xs flex items-center justify-center text-stone-800 group-hover:scale-110 group-hover:bg-[#111111] group-hover:text-[#D4BC96] transition-all duration-300">
                    <Icon className="w-5 h-5 stroke-[1.6]" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full font-bold ${note.badge}`}>
                    Note Family
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight group-hover:text-stone-950 transition-colors">
                  {note.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {note.description}
                </p>
              </div>

              {/* Footer: Notes pills + fix #7 — "Explore Family" promoted to a clear bordered pill button */}
              <div className="relative z-10 pt-5 mt-4 border-t border-stone-200/60 space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                  <span className="text-xs uppercase font-mono tracking-wider text-stone-600 font-semibold mr-1">Notes:</span>
                  {note.sampleFragrances.split(', ').map((frag) => (
                    // fix #41-85 – bg-white (opaque) was bg-white/90; axe can now resolve contrast
                    <span key={frag} className="px-2 py-0.5 rounded-md bg-white border border-stone-300 text-stone-800 text-xs font-sans font-medium">
                      {frag}
                    </span>
                  ))}
                </div>
                {/* Promoted from a tiny span to a full-width pill button for clear affordance */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNote(note.name);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full border-2 border-stone-800 bg-transparent text-stone-900 hover:bg-stone-900 hover:text-white text-xs font-semibold font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer group-hover:border-[#15803d] group-hover:text-[#15803d] group-hover:bg-transparent"
                  aria-label={`Explore ${note.name} family`}
                >
                  Explore Family
                  <span className="group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

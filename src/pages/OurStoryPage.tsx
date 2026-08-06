import React, { useEffect } from "react";
import { ArrowRight, Star, Heart, MapPin, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OurStoryPage() {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-stone-900 font-sans antialiased">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-stone-950">
        <img 
          src="https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=1600" 
          alt="Kannauj Perfumery Capital" 
          className="absolute inset-0 w-full h-full object-cover opacity-35 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        
        <div className="relative z-10 text-center max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-[#D4BC96] font-mono font-bold block">
            ESTABLISHED IN KANNAUJ
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-widest leading-tight uppercase">
            Our Story & Legacy
          </h1>
          <div className="h-[1.5px] w-16 bg-[#D4BC96] mx-auto"></div>
          <p className="text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Bridging India's native perfumery with the modern world through an honest, uncompromised, and ethical route.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Art Of Perfume Making */}
      <section className="py-20 sm:py-28 border-b border-sand-200/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Text details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-bold block font-mono">
                CHAPTER 01
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 leading-tight">
                The Art Of Perfume Making
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96]"></div>
              
              <div className="space-y-4 text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                <p>
                  A legacy of over 200 years in the Indian perfume capital of Kannauj and a eureka moment is what led to the creation of Ruh Imperium. We honor ancient traditions while crafting fragrances suitable for modern lifestyles.
                </p>
                <p>
                  Each blend is formulated using traditional copper stills (Degh-Bhapka) where seasonal botanicals are hydro-distilled into a base of pure oil, completely free from synthetic chemical carriers or cheap petroleum fillers.
                </p>
              </div>
            </div>

            {/* Visual media */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-md border border-sand-200/50">
                <img 
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800" 
                  alt="Traditional Perfumery Art" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chapter 2: Deg-Bhapka Distillation Method */}
      <section className="py-20 sm:py-28 bg-[#F8F6F0] border-b border-sand-200/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Visual media */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-md border border-sand-200/50">
                <img 
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800" 
                  alt="Botanical copper stills" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text details */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-bold block font-mono">
                CHAPTER 02
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 leading-tight">
                True Botanical Luxury & Alcohol-Free Oils
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96]"></div>
              
              <div className="space-y-4 text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                <p>
                  Rooted in tradition, Ruh Imperium transforms heritage into contemporary luxury. Using the ancient deg-bhapka distillation method—slow, hand-done, and deeply intuitive—our attars are crafted with ethically sourced, native Indian ingredients.
                </p>
                <p>
                  This slow-perfumery ethos means each flagon is highly concentrated, lasting for hours on your skin while remaining completely gentle and free from industrial denatured alcohol, parabens, and phthalates.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chapter 3: Guardians of the Scent Routes */}
      <section className="py-20 sm:py-28 border-b border-sand-200/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Text details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-bold block font-mono">
                CHAPTER 03
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 leading-tight">
                Our Sourcing Promise
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96]"></div>
              
              <div className="space-y-4 text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                <p>
                  We believe that to make honest perfumery, we must protect the land and the people who make it possible. Ruh Imperium works directly with sustainable farmer cooperatives in flower belts like Aligarh, Kannauj, and Wayanad.
                </p>
                <p>
                  By bypassing middlemen, we ensure that local artisans receive fair wages while we maintain absolute traceability of our precious biological extracts from soil to skin.
                </p>
              </div>
            </div>

            {/* Visual media */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-md border border-sand-200/50">
                <img 
                  src="https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=800" 
                  alt="Distillery video" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Heirs & Leadership Section */}
      <section className="py-20 sm:py-28 bg-[#F8F6F0]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-bold block mb-2.5 font-mono">
              THE HEIRS & ARCHITECTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-light font-display text-stone-900 tracking-wide">
              Leadership & Sourcing Legacy
            </h2>
            <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mt-5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Vimal */}
            <div className="bg-white rounded-3xl border border-sand-200/50 overflow-hidden shadow-sm flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" 
                  alt="Vimal Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-[#D4BC96] font-semibold font-mono block">
                  FOUNDER & HEAD PERFUMER
                </span>
                <h4 className="text-xl font-serif font-bold text-stone-900">
                  Vimal Singh
                </h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Deeply passionate about reviving traditional Indian hydro-distillation methods (Degh-Bhapka). Vimal spends months in the Kannauj flower belts ensuring our extracts remain uncompromised.
                </p>
              </div>
            </div>

            {/* Aditya */}
            <div className="bg-white rounded-3xl border border-sand-200/50 overflow-hidden shadow-sm flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600" 
                  alt="Aditya Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-[#D4BC96] font-semibold font-mono block">
                  CO-FOUNDER & CHIEF EXPLORER
                </span>
                <h4 className="text-xl font-serif font-bold text-stone-900">
                  Aditya Singh
                </h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Aditya spearheads our wilderness sourcing expeditions. From trekking into Assam's agarwood jungles to securing sustainable cardamom contracts with local co-operatives in Wayanad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 text-center bg-stone-950 text-white space-y-6">
        <h3 className="text-2xl sm:text-4xl font-serif tracking-wide uppercase">
          Experience Slow Perfumery
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 font-light max-w-md mx-auto leading-relaxed">
          Discover our collection of premium, alcohol-free pure attar flagons and solid perfume compounds.
        </p>
        <button 
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const el = document.getElementById("shop-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 300);
          }}
          className="px-8 py-3 bg-[#C47265] hover:bg-[#B36256] text-white text-[10px] uppercase font-mono tracking-widest rounded-xl transition-all duration-300 shadow-md cursor-pointer"
        >
          Explore Catalog
        </button>
      </section>
    </div>
  );
}

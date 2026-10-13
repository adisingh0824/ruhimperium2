import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, ArrowLeft, Home, Sparkles } from "lucide-react";
import { SiteSettings } from "../types";

export default function NotFoundPage({ siteSettings }: { siteSettings?: SiteSettings }) {
  const navigate = useNavigate();
  const brandName = siteSettings?.footerBrandName || "Ruh Imperium";

  useEffect(() => {
    document.title = `404 - Sanctuary Not Found | ${brandName}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", `The requested fragrance chapter or page could not be found in our ${brandName} Kannauj scent archives.`);
    }
  }, [brandName]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FAF7F2] text-stone-900 px-4 py-20">
      <div className="max-w-xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone-100 border border-[#D4BC96]/50 text-[#7A5623] mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-pulse stroke-[1.25]" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] font-mono font-bold text-[#7A5623] block">
            ERROR 404 • UNCHARTED TERRITORY
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
            Fragrance Chapter Not Found
          </h1>
          <div className="h-[1.5px] w-12 bg-[#D4BC96] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-md mx-auto">
            The scent formulation or archive you are searching for may have been archived, renamed, or never existed in our Kannauj catalog.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-7 py-3.5 bg-stone-900 hover:bg-[#7A5623] text-white text-xs font-mono uppercase tracking-widest font-semibold rounded-full transition-all cursor-pointer shadow-md inline-flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Sanctuary</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-7 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-850 text-xs font-mono uppercase tracking-widest font-semibold rounded-full transition-all cursor-pointer border border-stone-200 inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="pt-4 border-t border-stone-150 flex flex-col items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 font-mono">
          {siteSettings?.customLogoUrl && (
            <img 
              src={siteSettings.customLogoUrl} 
              alt={brandName} 
              className="max-h-8 w-auto object-contain mb-1" 
            />
          )}
          <span>{brandName} Scent House • Kannauj, India</span>
        </div>
      </div>
    </div>
  );
}

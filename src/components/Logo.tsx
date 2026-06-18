import { FC } from "react";

interface LogoProps {
  className?: string; // Additional classes for the container
  variant?: "header" | "splash" | "footer" | "dark";
  showSubtitle?: boolean;
  customLogoUrl?: string;
}

export const Logo: FC<LogoProps> = ({
  className = "",
  variant = "header",
  showSubtitle = true,
  customLogoUrl,
}) => {
  const isSplash = variant === "splash";
  const isFooter = variant === "footer";
  const isDarkBg = variant === "footer" || variant === "dark";

  // If not passed as an explicit prop (i.e., customLogoUrl is strictly undefined), resolve from local siteSettings cache
  let logoSrc = customLogoUrl;
  if (customLogoUrl === undefined) {
    try {
      const cached = localStorage.getItem("ruh-site-settings");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.customLogoUrl) {
          logoSrc = parsed.customLogoUrl;
        }
      }
    } catch (e) {}
  }

  if (logoSrc) {
    const imgSizeClass = isSplash 
      ? "max-h-24 sm:max-h-32 w-auto animate-fade-in object-contain" 
      : isFooter 
      ? "max-h-12 sm:max-h-14 w-auto object-contain" 
      : "max-h-12 sm:max-h-14 w-auto object-contain";
      
    return (
      <div 
        className={`flex flex-col items-center justify-center select-none ${className}`} 
        id={`logo-container-${variant}`}
      >
        <img 
          src={logoSrc} 
          alt="Ruh Imperium Logo" 
          className={`${imgSizeClass} drop-shadow-xs transition-transform duration-300 hover:scale-[1.03]`}
        />
      </div>
    );
  }

  // Beautiful, high-end, responsive minimalist text logo matching ruhimperium.com
  const sizeClass = isSplash 
    ? "text-4xl sm:text-6xl tracking-[0.3em] font-medium" 
    : isFooter 
    ? "text-2xl tracking-[0.25em]" 
    : "text-lg sm:text-xl md:text-2xl tracking-[0.25em]";

  return (
    <div 
      className={`flex flex-col items-center justify-center select-none ${className}`} 
      id={`logo-container-${variant}`}
    >
      <div className={`font-serif font-light uppercase ${isDarkBg ? 'text-white' : 'text-stone-900'} ${sizeClass} transition-colors duration-300`}>
        RUH
      </div>
      {showSubtitle && (
        <div className={`font-sans font-light tracking-[0.4em] uppercase text-[8px] sm:text-[9.5px] mt-1 ${isDarkBg ? 'text-[#D4BC96]' : 'text-stone-500'}`}>
          IMPERIUM
        </div>
      )}
    </div>
  );
};

export default Logo;

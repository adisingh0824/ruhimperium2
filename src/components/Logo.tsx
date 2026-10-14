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

  if (customLogoUrl) {
    const imgHeight = isSplash 
      ? "max-h-16 sm:max-h-20" 
      : isFooter 
      ? "max-h-10 sm:max-h-12" 
      : "max-h-8 sm:max-h-10";
    return (
      <div 
        className={`flex items-center justify-center select-none ${className}`} 
        id={`logo-container-${variant}`}
      >
        <img 
          src={customLogoUrl} 
          alt="Brand Logo" 
          className={`${imgHeight} w-auto object-contain transition-all duration-300 drop-shadow-sm`} 
        />
      </div>
    );
  }

  // Beautiful, high-end, responsive minimalist text logo matching ruhimperium.com
  const sizeClass = isSplash 
    ? "text-4xl sm:text-6xl tracking-[0.3em] font-medium" 
    : isFooter 
    ? "text-2xl tracking-[0.25em]" 
    : "text-xs sm:text-lg md:text-xl lg:text-2xl tracking-[0.14em] sm:tracking-[0.25em] whitespace-nowrap";

  return (
    <div 
      className={`flex flex-col items-center justify-center select-none ${className}`} 
      id={`logo-container-${variant}`}
    >
      <div className={`font-serif font-semibold tracking-[0.25em] uppercase ${isDarkBg ? 'text-white' : 'text-stone-900'} ${sizeClass} transition-colors duration-300`}>
        {showSubtitle ? "RUH" : "RUH IMPERIUM"}
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

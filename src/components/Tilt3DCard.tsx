import React, { useRef, useState, ReactNode } from "react";

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number; // max tilt degrees (e.g. 12)
  glareEffect?: boolean;
  scale?: number;
}

export default function Tilt3DCard({
  children,
  className = "",
  maxRotation = 10,
  glareEffect = true,
  scale = 1.02
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxRotation;
    const rotY = ((x - centerX) / centerX) * maxRotation;

    setRotation({ x: rotX, y: rotY });

    if (glareEffect) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY, opacity: 0.25 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${scale}, ${scale}, ${scale})`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      }}
    >
      <div className="w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {/* Dynamic Specular Lighting Glare */}
      {glareEffect && (
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none transition-opacity duration-300 z-30"
          style={{
            borderRadius: "inherit",
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(212, 188, 150, 0.15) 30%, transparent 70%)`,
            opacity: glarePosition.opacity
          }}
        />
      )}
    </div>
  );
}

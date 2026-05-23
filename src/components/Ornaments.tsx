import React from "react";

interface OrnamentProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

// 1. Koshkar Muiiz (Ram's Horn) - Premium symmetrical Kazakh motif
export const KoshkarMuiiz: React.FC<OrnamentProps> = ({
  size = 48,
  color = "currentColor",
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-editorial-accent hover:text-editorial-accent/80 transition-colors ${className}`}
      {...props}
    >
      {/* Symmetrical Left and Right horns */}
      <path d="M50,85 C50,85 50,45 50,25 C50,15 35,15 35,28 C35,40 48,40 48,30 C48,20 30,10 20,28 C10,46 22,65 35,65 C45,65 50,55 50,55" />
      <path d="M50,85 C50,85 50,45 50,25 C50,15 65,15 65,28 C65,40 52,40 52,30 C52,20 70,10 80,28 C90,46 78,65 65,65 C55,65 50,55 50,55" />
      {/* Base decorative loops */}
      <path d="M50,85 C42,85 40,78 50,75 C60,78 58,85 50,85 Z" fill={color} fillOpacity="0.2" />
      {/* Top crystal / seed element */}
      <path d="M50,10 L54,18 L50,24 L46,18 Z" fill={color} />
    </svg>
  );
};

// 2. Corner Ornament - Beautiful framing element for card corners
export const CornerOrnament: React.FC<OrnamentProps & { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }> = ({
  size = 64,
  color = "currentColor",
  className = "",
  position = "top-left",
  ...props
}) => {
  const rotation = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "rotate-270",
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-editorial-accent/60 ${rotation} ${className}`}
      {...props}
    >
      {/* Corner frame borders */}
      <path d="M5,95 L5,5 L95,5" strokeWidth="1.5" strokeDasharray="3,3" />
      <path d="M12,80 L12,12 L80,12" strokeWidth="2" />
      
      {/* Corner loop art */}
      <path d="M12,12 C12,12 25,25 35,20 C45,15 40,5 30,5 C20,5 15,15 15,25" />
      <path d="M12,12 C12,12 25,25 20,35 C15,45 5,40 5,30 C5,20 15,15 25,15" />
      
      {/* Center diamond spark */}
      <path d="M28,28 L32,24 L36,28 L32,32 Z" fill={color} />
    </svg>
  );
};

// 3. Horizontal Ornate Divider
export const OrnateDivider: React.FC<OrnamentProps> = ({
  size = 300,
  color = "currentColor",
  className = "",
  ...props
}) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-editorial-accent/30 to-editorial-accent/80" />
      <svg
        width={36}
        height={36}
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-editorial-accent"
        {...props}
      >
        <path d="M10,50 L35,50" />
        <path d="M65,50 L90,50" />
        <path d="M50,15 C50,15 35,30 35,45 C35,55 50,65 50,65" />
        <path d="M50,15 C50,15 65,30 65,45 C65,55 50,65 50,65" />
        <circle cx="50" cy="45" r="4" fill={color} />
        <circle cx="20" cy="50" r="2.5" fill={color} />
        <circle cx="80" cy="50" r="2.5" fill={color} />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-editorial-accent/80 via-editorial-accent/30 to-transparent" />
    </div>
  );
};

// 4. Circular Mandorla Ornament - For background aura or music player
export const CircularOrnament: React.FC<OrnamentProps> = ({
  size = 120,
  color = "currentColor",
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className={`text-editorial-accent/70 ${className}`}
      {...props}
    >
      <circle cx="100" cy="100" r="85" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="75" />
      <circle cx="100" cy="100" r="45" strokeWidth="1.5" />
      
      {/* 8 symmetrical koshkar muiiz spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <path d="M100,25 C100,35 95,40 100,50 C105,40 100,35 100,25" />
          <path d="M100,25 C90,25 85,30 90,38 C95,45 100,43 100,38" />
          <path d="M100,25 C110,25 115,30 110,38 C105,45 100,43 100,38" />
          <circle cx="100" cy="60" r="3" fill={color} />
          <circle cx="100" cy="15" r="2" fill={color} />
        </g>
      ))}
      <circle cx="100" cy="100" r="8" fill={color} fillOpacity="0.3" />
      <circle cx="100" cy="100" r="3" fill={color} />
    </svg>
  );
};

// 5. Delicate Lace Border
export const LaceBorder: React.FC<OrnamentProps & { vertical?: boolean }> = ({
  size = 200,
  color = "currentColor",
  className = "",
  vertical = false,
  ...props
}) => {
  return (
    <div
      className={`flex opacity-60 pointer-events-none select-none ${
        vertical ? "flex-col h-full overflow-hidden" : "w-full overflow-hidden justify-center"
      } ${className}`}
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <svg
          key={idx}
          width={40}
          height={40}
          viewBox="0 0 100 100"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          className={`${vertical ? "rotate-90" : ""} text-editorial-accent/40`}
          {...props}
        >
          <path d="M0,50 C25,20 25,80 50,50 C75,20 75,80 100,50" />
          <path d="M25,35 C25,35 50,15 50,50 C50,85 75,65 75,65" />
          <circle cx="50" cy="50" r="6" fill={color} fillOpacity="0.2" />
          <circle cx="15" cy="50" r="2" fill={color} />
          <circle cx="85" cy="50" r="2" fill={color} />
        </svg>
      ))}
    </div>
  );
};

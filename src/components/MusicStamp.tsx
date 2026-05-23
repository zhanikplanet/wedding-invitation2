import React from "react";
import { Play, Pause } from "lucide-react";

interface MusicStampProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

export const MusicStamp: React.FC<MusicStampProps> = ({ isPlaying, onToggle, className = "" }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-350 focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 ${className}`}
      aria-label="Әуенді басқару"
      id="music-circular-stamp"
    >
      {/* Outer spinning ring with text */}
      <div
        className={`absolute inset-0 w-full h-full transition-transform ${
          isPlaying ? "animate-[spin_10s_linear_infinite]" : ""
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-editorial-accent">
          <defs>
            <path
              id="circular-text-path"
              d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              fill="none"
            />
          </defs>
          <text className="font-sans font-extrabold uppercase text-[7.5px] fill-editorial-accent tracking-[1.5px]">
            <textPath href="#circular-text-path" startOffset="0%">
              • әуенді қосу • сазды әуен • той әні
            </textPath>
          </text>
        </svg>
      </div>

      {/* Spinning/pulsing dashed circle */}
      <div className={`absolute inset-2 border border-dashed border-editorial-accent/30 rounded-full ${
        isPlaying ? "animate-[spin_20s_linear_infinite]" : ""
      }`} />

      {/* Inner Solid Core */}
      <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-editorial-accent/90 via-[#C5A059] to-editorial-accent text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform">
        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </div>
    </button>
  );
};

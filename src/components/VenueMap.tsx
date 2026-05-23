import React from "react";
import { MapPin, Compass, Navigation } from "lucide-react";
import { CornerOrnament } from "./Ornaments";

interface VenueMapProps {
  venueName: string;
  venueAddress: string;
  mapQuery: string;
  isCreatorMode?: boolean;
  onQueryChange?: (query: string) => void;
  onVenueNameChange?: (name: string) => void;
  onAddressChange?: (address: string) => void;
}

export const VenueMap: React.FC<VenueMapProps> = ({
  venueName,
  venueAddress,
  mapQuery,
  isCreatorMode = false,
  onQueryChange,
  onVenueNameChange,
  onAddressChange,
}) => {
  // Generate safe google maps embed URL based on search query
  const safeSearchQuery = encodeURIComponent(mapQuery || "Ресторан Салтанат, Алматы");
  const embedUrl = `https://maps.google.com/maps?q=${safeSearchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  
  // Navigation links
  const gMapsUrl = `https://www.google.com/maps/search/?api=1&query=${safeSearchQuery}`;
  const yMapsUrl = `https://yandex.com/maps/?text=${safeSearchQuery}`;

  return (
    <div id="venue-map-section" className="bg-editorial-bg border border-editorial-accent/20 rounded-3xl p-6 shadow-lg max-w-lg w-full mx-auto relative overflow-hidden">
      {/* Corner Ornaments */}
      <div className="absolute top-0 right-0 pointer-events-none">
        <CornerOrnament size={48} position="top-right" />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none">
        <CornerOrnament size={48} position="bottom-left" />
      </div>

      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex p-3 bg-editorial-accent/10 rounded-full border border-editorial-accent/25 text-editorial-accent mb-1">
          <MapPin size={24} className="animate-pulse" />
        </div>
        <span className="text-xs font-mono tracking-widest text-editorial-accent font-bold uppercase block">
          Мекен-жайымыз • Салтанат сарайы
        </span>
        <h3 className="text-2xl font-serif text-editorial-text font-medium font-bold">
          Той өтетін орны
        </h3>
      </div>

      <div className="space-y-4 relative z-10">
        {/* Info card */}
        <div className="bg-white/80 border border-stone-200/50 rounded-2xl p-4 text-center shadow-inner">
          <p className="font-serif text-lg font-bold text-editorial-text mb-1">{venueName}</p>
          <p className="text-xs text-editorial-text flex items-center justify-center gap-1.5 font-sans leading-relaxed">
            <Compass size={13} className="text-editorial-accent flex-shrink-0" />
            <span>{venueAddress}</span>
          </p>
        </div>

        {/* Live Embedding Map Iframe */}
        <div className="h-64 w-full rounded-2xl border border-stone-200 shadow-md overflow-hidden relative bg-stone-100">
          <iframe
            id="map-embed-iframe"
            title="Мереке өтетін орын картасы"
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Navigation Actions */}
        <div className="grid grid-cols-2 gap-3" id="navigation-actions">
          <a
            href={gMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-editorial-accent hover:bg-editorial-accent/90 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all text-center cursor-pointer"
          >
            <Navigation size={14} />
            Google Карта
          </a>

          <a
            href={yMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#F5F1E6] hover:bg-editorial-accent/10 border border-stone-200 text-editorial-text text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all text-center cursor-pointer"
          >
            <MapPin size={14} className="text-editorial-accent" />
            Yandex Карта
          </a>
        </div>

        {/* Creator Mode customization */}
        {isCreatorMode && (
          <div className="mt-4 pt-4 border-t border-editorial-accent/20 space-y-3 text-xs bg-editorial-accent/5 p-4 rounded-xl">
            <p className="font-bold text-editorial-text">Картаны теңшеу (Creator Mode):</p>
            
            <div>
              <label className="block text-editorial-text font-medium mb-1">Салтанат Сарайы Атауы:</label>
              <input
                type="text"
                id="edit-venue-name"
                value={venueName}
                onChange={(e) => onVenueNameChange && onVenueNameChange(e.target.value)}
                className="w-full p-2 border border-editorial-accent/30 rounded bg-white text-editorial-text focus:outline-none focus:border-editorial-accent"
                placeholder="Мысалы: Saltanat Sarayi Grand Ballroom"
              />
            </div>

            <div>
              <label className="block text-editorial-text font-medium mb-1">Толық мекен-жайы:</label>
              <input
                type="text"
                id="edit-venue-address"
                value={venueAddress}
                onChange={(e) => onAddressChange && onAddressChange(e.target.value)}
                className="w-full p-2 border border-editorial-accent/30 rounded bg-white text-editorial-text focus:outline-none focus:border-editorial-accent"
                placeholder="Мысалы: Алматы қ., Әл-Фараби даңғылы, 1-үй"
              />
            </div>

            <div>
              <label className="block text-editorial-text font-medium mb-1">Картаға іздеу Сұранысы:</label>
              <input
                type="text"
                id="edit-map-query"
                value={mapQuery}
                onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
                className="w-full p-2 border border-editorial-accent/30 rounded bg-white font-mono text-[11px] text-editorial-text focus:outline-none focus:border-editorial-accent"
                placeholder="Нақты іздеу үшін: м. ресторан Салтанат, Аль-Фараби"
              />
              <p className="text-[10px] text-editorial-text/70 mt-0.5">Картада нақты көрсетілу үшін дәл мекен-жайды немесе мекеме атауын іздеуге жазыңыз.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Play, Pause, Music, Volume2, VolumeX, ListMusic } from "lucide-react";
import { CircularOrnament } from "./Ornaments";

interface MusicPlayerProps {
  musicUrl: string;
  musicTitle: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onUrlChange?: (url: string) => void;
  onTitleChange?: (title: string) => void;
  isCreatorMode?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicUrl,
  musicTitle,
  isPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute,
  onUrlChange,
  onTitleChange,
  isCreatorMode = false,
}) => {
  const [showTracks, setShowTracks] = useState(false);

  const playlist = [
    {
      title: "Қоңыр әуен (Piano Instrumental Romance)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      title: "Аққулар үні (Serene Acoustic)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "Аспан әуені (Light Ambient Strings)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
  ];

  const handleTrackSelect = (title: string, url: string) => {
    if (onTitleChange) onTitleChange(title);
    if (onUrlChange) onUrlChange(url);
    setShowTracks(false);
  };

  return (
    <div id="music-player-container" className="bg-editorial-bg border border-editorial-accent/20 rounded-2xl p-4 shadow-xl max-w-sm w-full mx-auto relative overflow-hidden">
      {/* Background Ornament Texture */}
      <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
        <CircularOrnament size={160} />
      </div>

      <div className="flex items-center gap-4 relative z-10">
        {/* Rotating Circular Amulet (Vinyl style) */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-16 h-16 rounded-full border-2 border-editorial-accent/30 bg-gradient-to-br from-editorial-bg to-[#F5F1E6] flex items-center justify-center shadow-md relative ${
              isPlaying ? "animate-[spin_8s_linear_infinite]" : ""
            }`}
          >
            <CircularOrnament size={56} className="text-editorial-accent/80" />
            <div className="absolute w-3 h-3 bg-editorial-bg border border-editorial-accent rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-editorial-accent rounded-full" />
            </div>
          </div>
          
          {/* Animated Equalizer Waves */}
          {isPlaying && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-end gap-[2px] h-3">
              <span className="w-[2px] bg-editorial-accent animate-[bounce_1.2s_infinite] h-2" style={{ animationDelay: '0.1s' }} />
              <span className="w-[2px] bg-editorial-accent animate-[bounce_0.8s_infinite] h-3" style={{ animationDelay: '0.3s' }} />
              <span className="w-[2px] bg-editorial-accent animate-[bounce_1s_infinite] h-1" style={{ animationDelay: '0.5s' }} />
              <span className="w-[2px] bg-editorial-accent animate-[bounce_1.4s_infinite] h-2.5" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </div>

        {/* Text and Controls */}
        <div className="flex-grow min-w-0">
          <p className="text-[10px] font-mono tracking-widest text-[#C5A059] font-bold uppercase">
            Тәтті әуен • Музыка
          </p>
          <h4 className="text-sm font-semibold truncate text-editorial-text" title={musicTitle}>
            {musicTitle}
          </h4>

          {/* Controls row */}
          <div className="flex items-center gap-3 mt-2">
            <button
              id="music-play-btn"
              onClick={onTogglePlay}
              className="p-2 rounded-full bg-editorial-accent text-white hover:bg-editorial-accent/90 transition-all shadow-sm active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label={isPlaying ? "Пауза" : "Музыканы қосу"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            <button
              id="music-mute-btn"
              onClick={onToggleMute}
              className="p-2 rounded-full hover:bg-editorial-accent/10 text-editorial-text transition-all active:scale-95 cursor-pointer"
              aria-label={isMuted ? "Дыбысты қосу" : "Дыбысты бішіру"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              id="music-tracks-btn"
              onClick={() => setShowTracks(!showTracks)}
              className={`p-2 rounded-full transition-all active:scale-95 cursor-pointer ${
                showTracks ? "bg-editorial-accent/20 text-editorial-text" : "hover:bg-[#F5F1E6] text-editorial-text"
              }`}
              aria-label="Әуен таңдау"
            >
              <ListMusic size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Track Selector Panel */}
      {showTracks && (
        <div className="mt-3 pt-3 border-t border-editorial-accent/20 text-xs text-editorial-text animate-[fadeIn_0.2s_ease-out]">
          <p className="font-semibold text-editorial-text mb-2">Музыка тізімі:</p>
          <div className="space-y-1">
            {playlist.map((track, idx) => (
              <button
                key={idx}
                id={`track-select-btn-${idx}`}
                onClick={() => handleTrackSelect(track.title, track.url)}
                className={`w-full text-left p-2 rounded-md transition-all flex items-center gap-2 cursor-pointer ${
                  musicUrl === track.url
                    ? "bg-editorial-accent/10 text-editorial-text font-medium"
                    : "hover:bg-editorial-accent/5"
                }`}
              >
                <Music size={12} className={musicUrl === track.url ? "text-editorial-accent animate-pulse" : "text-stone-400"} />
                <span className="truncate">{track.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Creator Mode Custom Audio URL */}
      {isCreatorMode && (
        <div className="mt-3 pt-3 border-t border-editorial-accent/20 space-y-2 text-xs font-sans">
          <div>
            <label className="block text-editorial-text font-medium mb-1">Сіздің әуен (MP3 URL өрісі):</label>
            <input
              type="text"
              id="creator-music-url"
              value={musicUrl}
              onChange={(e) => onUrlChange && onUrlChange(e.target.value)}
              className="w-full p-1.5 border border-editorial-accent/30 rounded bg-editorial-bg text-editorial-text font-mono text-[11px] focus:outline-none focus:border-editorial-accent"
              placeholder="https://example.com/song.mp3"
            />
          </div>
          <div>
            <label className="block text-editorial-text font-medium mb-1">Әуен атауы:</label>
            <input
              type="text"
              id="creator-music-title"
              value={musicTitle}
              onChange={(e) => onTitleChange && onTitleChange(e.target.value)}
              className="w-full p-1.5 border border-editorial-accent/30 rounded bg-editorial-bg text-editorial-text focus:outline-none focus:border-editorial-accent"
              placeholder="Әуен атауы"
            />
          </div>
        </div>
      )}
    </div>
  );
};

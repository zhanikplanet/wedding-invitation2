import React, { useState } from "react";
import { MailOpen, Heart, Music, Check } from "lucide-react";
import { KoshkarMuiiz, CircularOrnament } from "./Ornaments";

interface EnvelopeProps {
  brideName: string;
  groomName: string;
  onOpen: (startMusic: boolean) => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  brideName,
  groomName,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [playMusicOnUnlock, setPlayMusicOnUnlock] = useState(true);

  const handleOpenClick = () => {
    setIsOpening(true);
    // Let the fadeout finish, then notify parent component
    setTimeout(() => {
      onOpen(playMusicOnUnlock);
    }, 700);
  };

  return (
    <div
      id="envelope-screen"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-100 bg-radial transition-all duration-700 ${
        isOpening ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        backgroundImage: `radial-gradient(circle, #FCFAF7 0%, #E8E2D5 100%)`,
      }}
    >
      {/* Decorative Traditional Border Accent */}
      <div className="absolute inset-4 md:inset-8 border border-dashed border-editorial-accent/20 pointer-events-none rounded-2xl flex items-center justify-center">
        <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-editorial-accent/30 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-editorial-accent/30 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-editorial-accent/30 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-editorial-accent/30 rounded-br-xl" />
      </div>

      <div className="max-w-md w-full bg-editorial-bg border border-editorial-accent/20 shadow-[0_25px_60px_-15px_rgba(197,160,89,0.25)] rounded-3xl p-8 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
        {/* Shimmering Golden Ornament Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <CircularOrnament size={360} />
        </div>

        {/* Envelope Top Flap Design */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-editorial-accent/10 to-transparent" />

        <div className="space-y-6 relative z-10 flex flex-col items-center">
          {/* Symmetrical Kazakh Ornament Seal */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-editorial-accent/80 via-amber-200 to-editorial-accent shadow-lg flex items-center justify-center border border-amber-300 relative group animate-[pulse_3s_infinite]">
              <KoshkarMuiiz size={52} className="text-stone-900" />
            </div>
            <div className="absolute -inset-2 rounded-full border border-dashed border-editorial-accent/40 animate-[spin_20s_linear_infinite]" />
          </div>

          {/* Invitation Title */}
          <div className="space-y-1">
            <p className="text-xs font-mono tracking-widest text-editorial-accent font-bold uppercase">
              Тойға шақыру • Свадебное пригласительное
            </p>
            <h2 className="text-3xl font-serif text-editorial-text tracking-wide font-medium">
              {groomName} & {brideName}
            </h2>
            <p className="text-[11px] font-sans text-[#4A3728]/70 italic">
              Ұлы мерекеміздің қадірлі қонағы болыңыз!
            </p>
          </div>

          <p className="text-sm text-editorial-text max-w-xs mx-auto text-center leading-relaxed font-sans">
            Сіздерді махаббатымыздың куәсі болуға және шаңырақ көтеру тойымыздың қуанышымен бөлісуге шын жүректен шақырамыз!
          </p>

          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-editorial-accent/30 to-transparent my-1" />

          {/* Interactive music authorization check */}
          <div className="flex items-center gap-2 text-xs text-editorial-text bg-stone-200/40 py-2 px-4 rounded-full border border-stone-200/50">
            <input
              type="checkbox"
              id="envelope-play-music"
              checked={playMusicOnUnlock}
              onChange={() => setPlayMusicOnUnlock(!playMusicOnUnlock)}
              className="rounded text-editorial-accent focus:ring-editorial-accent w-4 h-4 cursor-pointer"
            />
            <label htmlFor="envelope-play-music" className="cursor-pointer flex items-center gap-1.5 font-semibold">
              <Music size={12} className="text-editorial-accent" />
              Музыкамен бірге ашу
            </label>
          </div>

          {/* Opening Trigger Button */}
          <button
            id="open-envelope-btn"
            onClick={handleOpenClick}
            className="mt-4 px-8 py-3.5 bg-editorial-accent hover:bg-editorial-accent/90 text-white rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] outline-none border-none flex items-center gap-2 cursor-pointer"
          >
            <MailOpen size={14} />
            <span>ШАҚЫРУДЫ АШУ</span>
          </button>
        </div>

        {/* Traditional Bottom border design */}
        <div className="absolute bottom-4 text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
          Қазақша Нақышта • 2026
        </div>
      </div>
    </div>
  );
};

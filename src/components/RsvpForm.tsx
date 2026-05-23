import React, { useState } from "react";
import { User, Users, Compass, CheckCircle2, MessageSquareHeart } from "lucide-react";
import { KoshkarMuiiz, OrnateDivider } from "./Ornaments";
import { GuestResponse } from "../types";

interface RsvpFormProps {
  onNewResponse?: (response: GuestResponse) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ onNewResponse }) => {
  const [name, setName] = useState("");
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState(1);
  const [wishes, setWishes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (isAttending === null) return;

    const response: GuestResponse = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      isAttending,
      guestsCount: isAttending ? guestsCount : 0,
      wishes: wishes.trim() || undefined,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    const existing = localStorage.getItem("wedding_rsvp_responses");
    const responses: GuestResponse[] = existing ? JSON.parse(existing) : [];
    responses.push(response);
    localStorage.setItem("wedding_rsvp_responses", JSON.stringify(responses));

    if (onNewResponse) {
      onNewResponse(response);
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setIsAttending(null);
    setGuestsCount(1);
    setWishes("");
    setSubmitted(false);
  };

  return (
    <div id="rsvp-section" className="bg-editorial-bg border border-editorial-accent/20 rounded-3xl p-6 md:p-8 shadow-lg max-w-lg w-full mx-auto relative overflow-hidden">
      {/* Decorative Ornaments in corners */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-editorial-accent/10 pointer-events-none rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-editorial-accent/10 pointer-events-none rounded-br-3xl" />

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <KoshkarMuiiz size={44} className="text-editorial-accent" />
            </div>
            <h3 className="text-2xl font-serif text-editorial-text tracking-wide font-medium">
              Той қонағының сауалнамасы
            </h3>
            <p className="text-xs text-editorial-text/70 max-w-sm mx-auto">
              Құрметті қонақ, біз үшін сіздің бірге болуыңыз маңызды. Келетіндігіңізді растауыңызды сұраймыз:
            </p>
            <OrnateDivider size={200} className="w-1/2 mx-auto pt-2" />
          </div>

          {/* Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="guest-name" className="text-xs font-semibold text-editorial-text block tracking-wider">
              Атыңыз тегіңіз (немесе жұбыңызбен):
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-editorial-accent" />
              <input
                type="text"
                id="guest-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border border-stone-200 rounded-xl bg-white text-editorial-text text-sm focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent/30 transition-all shadow-inner"
                placeholder="Мысалы: Дархан & Аружан"
              />
            </div>
          </div>

          {/* Attendance Checkbox */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-editorial-text block tracking-wider">
              Тойға келесіз бе?
            </span>
            <div className="grid grid-cols-2 gap-3" id="attendance-toggles">
              <button
                type="button"
                id="attendance-yes-btn"
                onClick={() => setIsAttending(true)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                  isAttending === true
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/10 shadow-md"
                    : "border-stone-200 bg-white hover:bg-stone-50 text-stone-600"
                }`}
              >
                <CheckCircle2 size={16} className={isAttending === true ? "text-emerald-600" : "text-stone-300"} />
                Иә, келемін!
              </button>

              <button
                type="button"
                id="attendance-no-btn"
                onClick={() => setIsAttending(false)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                  isAttending === false
                    ? "bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-500/10 shadow-md"
                    : "border-stone-200 bg-white hover:bg-stone-50 text-stone-600"
                }`}
              >
                <Compass size={16} className={isAttending === false ? "text-rose-500" : "text-stone-300"} />
                Келе алмаймын
              </button>
            </div>
          </div>

          {/* Guest Count (if attending) */}
          {isAttending === true && (
            <div className="space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
              <label htmlFor="guests-count" className="text-xs font-semibold text-editorial-text block tracking-wider">
                Адам саны (қыстыра қосыңыз):
              </label>
              <div className="relative">
                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-editorial-accent" />
                <select
                  id="guests-count"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                  className="w-full pl-9 pr-4 py-3 border border-stone-200 rounded-xl bg-white text-editorial-text text-sm focus:outline-none focus:border-editorial-accent shadow-inner"
                >
                  <option value={1}>Өзім жалғыз (1 адам)</option>
                  <option value={2}>Жұбыммен бірге (2 адам)</option>
                  <option value={3}>Отбасымен (3 адам)</option>
                  <option value={4}>Отбасымен (4 адам +)</option>
                </select>
              </div>
            </div>
          )}

          {/* Wishes/Note */}
          <div className="space-y-1.5">
            <label htmlFor="guest-wishes" className="text-xs font-semibold text-editorial-text block tracking-wider">
              Ақ тілек немесе ескерту:
            </label>
            <div className="relative">
              <MessageSquareHeart size={16} className="absolute left-3 top-3 text-editorial-accent" />
              <textarea
                id="guest-wishes"
                rows={3}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl bg-white text-editorial-text text-sm focus:outline-none focus:border-editorial-accent font-sans shadow-inner"
                placeholder="Жас жұбайларға ыстық тілегіңізді жазыңыз..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="rsvp-submit-btn"
            disabled={isAttending === null || !name.trim()}
            className="w-full py-4 bg-editorial-accent hover:bg-editorial-accent/90 text-white rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-150 shadow-md active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Жауапты жіберу</span>
          </button>
        </form>
      ) : (
        <div className="text-center py-8 space-y-4 animate-[fadeIn_0.3s_ease-out]" id="rsvp-success-view">
          <div className="relative inline-block">
            <KoshkarMuiiz size={64} className="text-emerald-500 animate-bounce mx-auto" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-dashed border-emerald-400/40 animate-[spin_10s_linear_infinite]" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-serif text-editorial-text font-bold">
              Ақ тілегіңізге рахмет!
            </h3>
            <p className="text-sm text-editorial-text/80 font-medium">
              Сіздің жауабыңыз сәтті қабылданды.
            </p>
          </div>

          <p className="text-xs text-stone-500 max-w-sm mx-auto px-4 bg-emerald-500/5 py-4 border border-dashed border-emerald-500/20 rounded-xl">
            {isAttending
              ? `Қабыл алдық! Сізді ${guestsCount} қонақ болып келеді деп тіркедік. Тәтті сәттерде қауышқанша!`
              : "Түсіністікпен қараймыз! Ыстық тілегіңіз жас жұбайларға міндетті түрде жетеді."}
          </p>

          <button
            type="button"
            id="rsvp-reset-btn"
            onClick={handleReset}
            className="text-xs text-editorial-accent hover:text-editorial-accent/80 font-mono underline cursor-pointer"
          >
            Жаңадан толтыру / Басқа қонақ
          </button>
        </div>
      )}
    </div>
  );
};

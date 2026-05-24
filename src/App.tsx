import { useState, useEffect, useRef } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock as ClockIcon, 
  Settings, 
  X, 
  ChevronDown,
  MapPin,
  Users,
  Compass,
  Heart
} from "lucide-react";
import { WeddingConfig, GuestResponse } from "./types";
import { Envelope } from "./components/Envelope";
import { MusicPlayer } from "./components/MusicPlayer";
import { MusicStamp } from "./components/MusicStamp";
import { CelebrationTimeline } from "./components/CelebrationTimeline";
import { VenueMap } from "./components/VenueMap";
import { RsvpForm } from "./components/RsvpForm";
import { AdminPanel } from "./components/AdminPanel";
import { KazakhCalendar } from "./components/KazakhCalendar";
import { 
  KoshkarMuiiz, 
  CornerOrnament, 
  OrnateDivider, 
  CircularOrnament, 
  LaceBorder 
} from "./components/Ornaments";

// Beautiful vector and illustration paths
const COUPLE_IMAGE = "/src/assets/images/kazakh_wedding_couple_1779548064433.png";
const BG_ORNAMENT = "/src/assets/images/kazakh_gold_ornaments_bg_1779548084863.png";

const DEFAULT_CONFIG: WeddingConfig = {
  brideName: "Ақжан",
  groomName: "Шыңғыс",
  brideParents: "Болат & Сәуле",
  groomParents: "Ерлан & Алма",
  date: "2026-08-25",
  time: "17:00",
  weddingDate: "2026-08-25",
  uzatuDate: "2026-08-18",
  weddingTime: "17:00",
  uzatuTime: "17:00",
  venueName: "Құрылысы жүріп жатқан әкімшілік ғимарат",
  venueAddress: "Алматы қаласы, 2GIS сілтемесі бойынша",
  twoGisUrl: "https://2gis.kz/almaty/geo/70030076996008465/77.043740,43.309045",
  coordinates: { lat: 43.309045, lng: 77.043740 },
  mapQuery: "43.309045,77.043740",
  
  weddingVenueName: "Құрылысы жүріп жатқан әкімшілік ғимарат",
  weddingVenueAddress: "Алматы қаласы, 2GIS сілтемесі бойынша",
  weddingTwoGisUrl: "https://2gis.kz/almaty/geo/70030076996008465/77.043740,43.309045",
  weddingMapQuery: "43.309045,77.043740",
  
  uzatuVenueName: "«Aqpeil» мейрамханасы",
  uzatuVenueAddress: "Талдықорған қаласы, 2GIS сілтемесі бойынша",
  uzatuTwoGisUrl: "https://2gis.kz/almaty/geo/70000001101735389/78.413457,45.017123",
  uzatuMapQuery: "45.017123,78.413457",

  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  musicTitle: "Қоңыр әуен (Piano Instrumental Romance)",
  additionalInfo: "ҮЙЛЕНУ ТОЙЫНА АРНАЛҒАН САЛТАНАТТЫ АҚ ДАСТАРХАНЫМЫЗДЫҢ ҚАДІРЛІ ҚОНАҒЫ БОЛУҒА ШАҚЫРАМЫЗ!",
  weddingAdditionalInfo: "Шыңғыс пен Ақжанның үйлену тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!",
  uzatuAdditionalInfo: "Аяулы қызымыз Ақжанның Қыз ұзату тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!",
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<WeddingConfig>(DEFAULT_CONFIG);
  const [responses, setResponses] = useState<GuestResponse[]>([]);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [eventType, setEventType] = useState<'wedding' | 'uzatu'>('wedding');
  
  // Audio state hoisted here
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Resolved dynamic active parameters
  const activeDate = eventType === "wedding" ? (config.weddingDate || config.date) : (config.uzatuDate || "2026-08-18");
  const activeTime = eventType === "wedding" ? (config.weddingTime || config.time) : (config.uzatuTime || "17:00");
  const activeAdditionalInfo = eventType === "wedding" ? (config.weddingAdditionalInfo || config.additionalInfo) : (config.uzatuAdditionalInfo || "ҚЫЗ ҰЗАТУ ТОЙЫНА АРНАЛҒАН САЛТАНАТТЫ АҚ ДАСТАРХАНЫМЫЗДЫҢ ҚАДІРЛІ ҚОНАҒЫ БОЛУҒА ШАҚЫРАМЫЗ!");
  const activeVenueName = eventType === "wedding" ? (config.weddingVenueName || config.venueName) : (config.uzatuVenueName || "«Aqpeil» мейрамханасы");
  const activeVenueAddress = eventType === "wedding" ? (config.weddingVenueAddress || config.venueAddress) : (config.uzatuVenueAddress || "Талдықорған қаласы, 2GIS сілтемесі бойынша");
  const activeTwoGisUrl = eventType === "wedding" ? (config.weddingTwoGisUrl || config.twoGisUrl) : (config.uzatuTwoGisUrl || "https://2gis.kz/almaty/geo/70000001101735389/78.413457,45.017123");
  const activeMapQuery = eventType === "wedding" ? (config.weddingMapQuery || config.mapQuery) : (config.uzatuMapQuery || "45.017123,78.413457");

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  // Load RSVP responses on mount
  useEffect(() => {
    const existing = localStorage.getItem("wedding_rsvp_responses");
    if (existing) {
      setResponses(JSON.parse(existing));
    }
  }, []);

  // Sync Audio Element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = config.musicUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [config.musicUrl]);

  // Handle Play/Pause
  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Audio playback failure:", err);
          setIsPlaying(false);
        });
    }
  };

  // Handle Mute
  const handleToggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Recalculate countdown
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(`${activeDate}T${activeTime}`);
      const difference = +targetDate - +new Date();
      
      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isOver: true }));
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [activeDate, activeTime]);

  const handleEnvelopeOpen = (startMusic: boolean) => {
    setIsOpen(true);
    if (startMusic && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }, 300);
    }
  };

  const handleNewRsvp = (newRes: GuestResponse) => {
    setResponses((prev) => [...prev, newRes]);
  };

  const handleClearAllResponses = () => {
    localStorage.removeItem("wedding_rsvp_responses");
    setResponses([]);
  };

  const handleAddSampleResponses = () => {
    const samples: GuestResponse[] = [
      {
        id: "s1",
        name: "Бақытжан & Гүлмира",
        isAttending: true,
        guestsCount: 2,
        wishes: "Жас жұбайларға өмірдегі барлық жақсылықты тілейміз! Махаббаттарыңыз баянды болсын, шаңырақтарыңыз биік болсын!",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "s2",
        name: "Арман Серікұлы",
        isAttending: true,
        guestsCount: 1,
        wishes: "Досым, қуанышың ұзағынан болсын! Үлгілі отбасы болыңдар!",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      }
    ];

    const existing = localStorage.getItem("wedding_rsvp_responses");
    const currentList: GuestResponse[] = existing ? JSON.parse(existing) : [];
    const combined = [...currentList, ...samples];
    localStorage.setItem("wedding_rsvp_responses", JSON.stringify(combined));
    setResponses(combined);
  };

  // Format date readable for Kazakh text folds
  const formattedDayNum = activeDate.split("-")[2];
  const yearText = activeDate.split("-")[0];

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text font-sans relative border-8 md:border-[16px] border-editorial-border overflow-x-hidden selection:bg-editorial-accent/20">
      
      {/* Background audio tag helper */}
      <audio
        ref={audioRef}
        src={config.musicUrl}
        loop
      />

      {/* Decorative Ornaments stamp background layer */}
      <div 
        className="absolute inset-0 opacity-[0.05] bg-repeat pointer-events-none mix-blend-multiply z-0" 
        style={{ backgroundImage: `url(${BG_ORNAMENT})`, backgroundSize: "240px 240px" }}
      />

      {/* 1. Digital envelope starting gate */}
      {!isOpen && (
        <Envelope 
          brideName={config.brideName} 
          groomName={config.groomName} 
          onOpen={handleEnvelopeOpen} 
        />
      )}

      {/* Floating customize badge - top left */}
      {/* <div className="fixed top-4 left-4 z-40">
        <button
          id="creator-toggle-btn"
          onClick={() => setIsCreatorOpen(!isCreatorOpen)}
          className="flex items-center gap-1.5 py-2 px-4 bg-stone-900/90 hover:bg-stone-850 text-amber-400 rounded-full font-mono text-xs font-semibold shadow-lg tracking-wider transition-all border border-amber-500/30 cursor-pointer active:scale-95"
        >
          <Settings size={14} className={isCreatorOpen ? "rotate-90 transition-transform duration-300" : ""} />
          <span>{isCreatorOpen ? "Тапсырыс беру" : "Теңшеу / Настройки"}</span>
        </button>
      </div> */}

      {/* Rotating music badge on the bottom left - directly from video style */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-40 md:bottom-12 md:left-12 drop-shadow-xl animate-fade-in-up">
          <MusicStamp isPlaying={isPlaying} onToggle={handleTogglePlay} />
        </div>
      )}

      {/* Creator Panel Slider */}
      {isCreatorOpen && (
        <div id="creator-drawer" className="fixed top-16 left-4 z-40 max-w-sm w-full bg-stone-900 text-stone-100 border border-amber-500/30 rounded-2xl p-5 shadow-2xl max-h-[82vh] overflow-y-auto space-y-4 animate-[fadeIn_0.25s_ease-out]">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <h3 className="font-serif text-sm font-bold text-amber-300">Тойды теңшеу (Creator Mode)</h3>
            <button 
              id="close-creator-btn"
              onClick={() => setIsCreatorOpen(false)} 
              className="p-1 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-3.5 text-xs font-sans">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Күйеу жігіт есімі:</label>
                <input
                  type="text"
                  id="input-groom"
                  value={config.groomName}
                  onChange={(e) => setConfig({ ...config, groomName: e.target.value })}
                  className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Қалыңдық есімі:</label>
                <input
                  type="text"
                  id="input-bride"
                  value={config.brideName}
                  onChange={(e) => setConfig({ ...config, brideName: e.target.value })}
                  className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Жігіттің ата-анасы:</label>
                <input
                  type="text"
                  id="input-groom-parents"
                  value={config.groomParents}
                  onChange={(e) => setConfig({ ...config, groomParents: e.target.value })}
                  className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Қыздың ата-анасы:</label>
                <input
                  type="text"
                  id="input-bride-parents"
                  value={config.brideParents}
                  onChange={(e) => setConfig({ ...config, brideParents: e.target.value })}
                  className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="border-t border-stone-800 pt-2 shrink-0">
              <p className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase mb-1.5">1. Үйлену тойы мәліметтері:</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium text-[10px]">Үйлену тойы Күні:</label>
                  <input
                    type="date"
                    id="input-wedding-date"
                    value={config.weddingDate || config.date}
                    onChange={(e) => setConfig({ ...config, weddingDate: e.target.value, date: e.target.value })}
                    className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium text-[10px]">Уақыты (сигнал):</label>
                  <input
                    type="time"
                    id="input-wedding-time"
                    value={config.weddingTime || config.time}
                    onChange={(e) => setConfig({ ...config, weddingTime: e.target.value, time: e.target.value })}
                    className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-400 mb-1 font-medium text-[10px]">Үйлену тойы шақыру мәтіні:</label>
                <textarea
                  id="input-wedding-additional"
                  rows={2}
                  value={config.weddingAdditionalInfo || config.additionalInfo}
                  onChange={(e) => setConfig({ ...config, weddingAdditionalInfo: e.target.value, additionalInfo: e.target.value })}
                  className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500 text-[11px] leading-normal"
                />
              </div>
            </div>

            <div className="border-t border-stone-800 pt-2 shrink-0">
              <p className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase mb-1.5">2. Қыз ұзату мәліметтері:</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium text-[10px]">Қыз ұзату Күні:</label>
                  <input
                    type="date"
                    id="input-uzatu-date"
                    value={config.uzatuDate || "2026-08-18"}
                    onChange={(e) => setConfig({ ...config, uzatuDate: e.target.value })}
                    className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium text-[10px]">Уақыты (сигнал):</label>
                  <input
                    type="time"
                    id="input-uzatu-time"
                    value={config.uzatuTime || "17:00"}
                    onChange={(e) => setConfig({ ...config, uzatuTime: e.target.value })}
                    className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-400 mb-1 font-medium text-[10px]">Қыз ұзату шақыру мәтіні:</label>
                <textarea
                  id="input-uzatu-additional"
                  rows={2}
                  value={config.uzatuAdditionalInfo || "ҚЫЗ ҰЗАТУ ТОЙЫНА АРНАЛҒАН САЛТАНАТТЫ АҚ ДАСТАРХАНЫМЫЗДЫҢ ҚАДІРЛІ ҚОНАҒЫ БОЛУҒА ШАҚЫРАМЫЗ!"}
                  onChange={(e) => setConfig({ ...config, uzatuAdditionalInfo: e.target.value })}
                  className="w-full p-2 bg-stone-800 rounded border border-stone-700 text-white focus:outline-none focus:border-amber-500 text-[11px] leading-normal"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Wedding Invitation Page */}
      <div className={`max-w-xl mx-auto px-4 pt-10 pb-24 relative z-10 transition-all duration-700 ${isOpen ? "opacity-100 block" : "blur-lg pointer-events-none select-none h-screen overflow-hidden"}`}>
        
        {/* ININVITATION CARD WITH EXACT CHRONOLOGY OF THE DEMO VIDEO */}
        <div className="bg-editorial-bg border border-editorial-accent/25 shadow-2xl rounded-[32px] overflow-hidden p-6 md:p-10 space-y-16 relative">
          
          {/* Header corner accents */}
          <div className="absolute top-0 left-0 pointer-events-none">
            <CornerOrnament size={64} position="top-left" />
          </div>
          <div className="absolute top-0 right-0 pointer-events-none">
            <CornerOrnament size={64} position="top-right" />
          </div>

          {/* PREMIUM TOY SELECTOR TABS */}
          <div className="flex justify-center p-1 bg-stone-100/80 border border-editorial-accent/20 rounded-2xl max-w-sm mx-auto shadow-sm relative z-20">
            <button
              id="tab-wedding"
              onClick={() => setEventType('wedding')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                eventType === 'wedding'
                  ? 'bg-editorial-accent text-white shadow-md scale-[1.02]'
                  : 'text-stone-500 hover:text-editorial-text hover:bg-stone-50/50'
              }`}
            >
              <span className="text-[9px] opacity-80 tracking-normal font-mono">25 ТАМЫЗ</span>
              <span>Үйлену тойы</span>
            </button>
            <button
              id="tab-uzatu"
              onClick={() => setEventType('uzatu')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                eventType === 'uzatu'
                  ? 'bg-editorial-accent text-white shadow-md scale-[1.02]'
                  : 'text-stone-500 hover:text-editorial-text hover:bg-stone-50/50'
              }`}
            >
              <span className="text-[9px] opacity-80 tracking-normal font-mono">18 ТАМЫЗ</span>
              <span>Қыз ұзату</span>
            </button>
          </div>

          {/* SECTION 1: COVER HERO IMAGE WITH PAIR NAMES */}
          <div className="text-center space-y-8 pt-4">
            {/* Elegant hands overlay illustration from video */}
            <div className="relative max-w-md mx-auto aspect-square rounded-[24px] overflow-hidden border border-editorial-accent/20 shadow-lg bg-stone-50">
              <img
                src={COUPLE_IMAGE}
                alt="Жас жұбайлар қолдары"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-editorial-bg/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Corner delicate framing on cover */}
              <div className="absolute bottom-3 right-3 pointer-events-none">
                <CornerOrnament size={36} position="bottom-right" className="text-editorial-accent/70" />
              </div>
              <div className="absolute bottom-3 left-3 pointer-events-none">
                <CornerOrnament size={36} position="bottom-left" className="text-editorial-accent/70" />
              </div>
            </div>

            {/* Couple names and Day heading (Classic italic with golden accent) */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-display text-editorial-text tracking-wide font-normal leading-tight">
                {eventType === 'wedding' ? (
                  <>
                    <span className="block italic hover:text-editorial-accent transition-colors duration-300 font-serif">
                      {config.groomName}
                    </span>
                    <span className="font-decorative text-editorial-accent text-5xl md:text-6xl my-2 block">
                      &
                    </span>
                    <span className="block italic hover:text-editorial-accent transition-colors duration-300 font-serif">
                      {config.brideName}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block italic hover:text-editorial-accent transition-colors duration-300 font-serif text-5xl md:text-6xl">
                      {config.brideName}
                    </span>
                    <span className="text-xs font-mono tracking-widest text-[#C5A059] font-bold uppercase mt-2 block">
                      ҚЫЗ ҰЗАТУ ТОЙЫ
                    </span>
                  </>
                )}
              </h1>
              
              <div className="flex flex-col items-center justify-center space-y-1.5 pt-2">
                <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-editorial-accent to-transparent" />
                <p className="text-xs font-mono tracking-[0.3em] text-editorial-accent font-bold uppercase animate-pulse">
                  {eventType === 'wedding' ? 'WEDDING DAY' : 'FAREWELL DAY'}
                </p>
                <p className="text-base font-serif font-bold tracking-widest text-[#C5A059] font-mono">
                  {activeDate.split("-").reverse().join(".")}
                </p>
                <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-editorial-accent to-transparent" />
              </div>

              {/* Scrolling direction Indicator */}
              <div className="flex flex-col items-center justify-center pt-8 text-[10px] font-mono tracking-widest text-editorial-text/40 space-y-1.5 animate-bounce">
                <span>ЖОҒАРЫ КӨТЕРІҢІЗ</span>
                <ChevronDown size={14} className="text-editorial-accent" />
              </div>
            </div>
          </div>

          <LaceBorder className="my-2" />

          {/* SECTION 2: GREETING & FORMAL INVITATION */}
          <div className="text-center space-y-8 max-w-md mx-auto">
            <div className="inline-flex justify-center mb-1 animate-pulse">
              <KoshkarMuiiz size={44} className="text-editorial-accent" />
            </div>

            <h2 className="font-decorative text-editorial-accent text-3xl font-bold tracking-wide">
              Құрметті қонақтар!
            </h2>

            <p className="text-xs font-mono tracking-widest text-[#C5A059] font-extrabold uppercase">
              {eventType === 'wedding' ? 'СІЗДЕРДІ БАЛАЛАРЫМЫЗ' : 'СІЗДЕРДІ ҚЫЗЫМЫЗ СӘТІМЕН'}
            </p>

            {eventType === 'wedding' ? (
              <div className="space-y-3 font-serif italic text-2xl text-editorial-text">
                <p className="text-editorial-accent font-medium leading-none">{config.groomName}</p>
                <p className="text-xs font-mono not-italic tracking-wider uppercase text-editorial-text/50">пен</p>
                <p className="text-editorial-accent font-medium leading-none">{config.brideName}дың</p>
              </div>
            ) : (
              <div className="space-y-3 font-serif italic text-2xl text-editorial-text">
                <p className="text-editorial-accent font-medium leading-none">{config.brideName}</p>
                <p className="text-xs font-mono not-italic tracking-wider uppercase text-editorial-text/50">бойжеткеннің</p>
              </div>
            )}

            <p className="text-sm text-editorial-text leading-relaxed font-sans font-medium px-4">
              {activeAdditionalInfo}
            </p>

            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-editorial-accent/30 to-transparent mx-auto" />
          </div>

          <LaceBorder className="my-2" />

          {/* SECTION 3: CALENDAR GRID HIGHLIGHTING */}
          <div className="space-y-4">
            <KazakhCalendar dateString={activeDate} />
            
            <div className="text-center pt-2">
              <p className="text-xs font-mono tracking-widest text-editorial-accent uppercase font-bold">
                БАСТАЛУЫ • НАЧАЛО
              </p>
              <h4 className="text-lg font-serif font-bold text-editorial-text mt-1">
                САҒАТ {activeTime}-ДЕ
              </h4>
            </div>
          </div>

          <OrnateDivider size={200} className="w-1/2 mx-auto" />

          {/* SECTION 4: PROGRAM TIMELINE */}
          <div className="space-y-2">
            <CelebrationTimeline eventType={eventType} />
          </div>

          <LaceBorder className="my-2" />

          {/* SECTION 5: INTERACTIVE LOCATION & VENUE MAP */}
          <div className="space-y-4">
            <VenueMap
              venueName={activeVenueName}
              venueAddress={activeVenueAddress}
              mapQuery={activeMapQuery}
              twoGisUrl={activeTwoGisUrl}
              isCreatorMode={isCreatorOpen}
              onQueryChange={(query) => {
                if (eventType === "wedding") {
                  setConfig({ ...config, weddingMapQuery: query, mapQuery: query });
                } else {
                  setConfig({ ...config, uzatuMapQuery: query });
                }
              }}
              onVenueNameChange={(n) => {
                if (eventType === "wedding") {
                  setConfig({ ...config, weddingVenueName: n, venueName: n });
                } else {
                  setConfig({ ...config, uzatuVenueName: n });
                }
              }}
              onAddressChange={(a) => {
                if (eventType === "wedding") {
                  setConfig({ ...config, weddingVenueAddress: a, venueAddress: a });
                } else {
                  setConfig({ ...config, uzatuVenueAddress: a });
                }
              }}
              onTwoGisUrlChange={(url) => {
                if (eventType === "wedding") {
                  setConfig({ ...config, weddingTwoGisUrl: url, twoGisUrl: url });
                } else {
                  setConfig({ ...config, uzatuTwoGisUrl: url });
                }
              }}
            />
          </div>

          <LaceBorder className="my-2" />

          {/* SECTION 6: HONORARY PARENTS BLESSINGS */}
          <div className="text-center space-y-4 py-4">
            <p className="font-decorative text-editorial-accent text-3xl font-semibold">
              Ізгі ниетпен,
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto bg-editorial-accent/5 p-4 rounded-2xl border border-editorial-accent/10">
              <div className="border-r border-editorial-accent/15 pr-2">
                <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold mb-1">Ұлдың ата-анасы:</p>
                <p className="text-sm font-serif font-bold text-editorial-text">{config.groomParents}</p>
              </div>
              <div className="pl-2">
                <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold mb-1">Қыздың ата-анасы:</p>
                <p className="text-sm font-serif font-bold text-editorial-text">{config.brideParents}</p>
              </div>
            </div>
          </div>

          <LaceBorder className="my-2" />

          {/* SECTION 7: INTERACTIVE RSVP RESPONSE FORM */}
          <div className="space-y-4">
            <RsvpForm onNewResponse={handleNewRsvp} />
          </div>

          <LaceBorder className="my-2" />

          {/* SECTION 8: FINAL MOTTO & COUNTDOWN TIMER */}
          <div className="text-center space-y-8 max-w-md mx-auto">
            <div>
              <p className="font-decorative text-editorial-accent text-3xl font-semibold">
                Қуанышымызға ортақ болыңыздар!
              </p>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-editorial-accent/40 to-transparent mx-auto mt-2" />
            </div>

            {/* Countdown widget */}
            <div className="bg-editorial-accent/10 border border-editorial-accent/25 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute -left-8 -bottom-8 opacity-[0.03] text-editorial-accent pointer-events-none">
                <CircularOrnament size={140} />
              </div>

              <p className="text-xs font-mono tracking-widest text-editorial-accent uppercase font-bold mb-4">
                Тойға дейін қалған уақыт:
              </p>

              {!timeLeft.isOver ? (
                <div className="grid grid-cols-4 gap-2 text-editorial-text" id="countdown-clock">
                  <div className="bg-white/80 p-2.5 rounded-2xl border border-stone-200/50">
                    <span className="block text-2xl font-bold font-mono tracking-tight text-editorial-accent">{timeLeft.days}</span>
                    <span className="text-[10px] font-semibold text-editorial-text uppercase">Күн</span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-2xl border border-stone-200/50">
                    <span className="block text-2xl font-bold font-mono tracking-tight text-editorial-accent">{timeLeft.hours}</span>
                    <span className="text-[10px] font-semibold text-editorial-text uppercase">Сағат</span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-2xl border border-stone-200/50">
                    <span className="block text-2xl font-bold font-mono tracking-tight text-editorial-accent">{timeLeft.minutes}</span>
                    <span className="text-[10px] font-semibold text-editorial-text uppercase">Мин</span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-2xl border border-stone-200/50">
                    <span className="block text-2xl font-bold font-mono tracking-tight text-editorial-accent">{timeLeft.seconds}</span>
                    <span className="text-[10px] font-semibold text-editorial-text uppercase">Сек</span>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <p className="text-base font-bold text-editorial-accent font-serif animate-pulse">
                    Той салтанаты басталды! Ақ отауларыңыз бақыт әкелсін!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Embedded audio settings deck */}
          <div className="py-4 border-t border-editorial-accent/10">
            <MusicPlayer
              musicUrl={config.musicUrl}
              musicTitle={config.musicTitle}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              onUrlChange={(url) => setConfig({ ...config, musicUrl: url })}
              onTitleChange={(title) => setConfig({ ...config, musicTitle: title })}
              isCreatorMode={isCreatorOpen}
            />
          </div>

          {/* Symmetrical Bottom ornaments */}
          <div className="absolute bottom-0 left-0 pointer-events-none">
            <CornerOrnament size={64} position="bottom-left" />
          </div>
          <div className="absolute bottom-0 right-0 pointer-events-none">
            <CornerOrnament size={64} position="bottom-right" />
          </div>

        </div>

        {/* ADMIN/ORGANIZER PANEL COMPANION */}
        <AdminPanel
          responses={responses}
          onClearAll={handleClearAllResponses}
          onAddSample={handleAddSampleResponses}
        />
      </div>
    </div>
  );
}

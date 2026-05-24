import React from "react";
import { Clock, Gift, GlassWater, Sparkles, Flame, Users, HeartHandshake } from "lucide-react";
import { KoshkarMuiiz } from "./Ornaments";

interface TimelineEvent {
  time: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
}

interface CelebrationTimelineProps {
  eventType?: "wedding" | "uzatu";
}

export const CelebrationTimeline: React.FC<CelebrationTimelineProps> = ({ eventType = "wedding" }) => {
  const weddingEvents: TimelineEvent[] = [
    {
      time: "17:00",
      title: "Қонақтарды қарсы алу",
      subtitle: "Сбор гостей & Welcome Drink",
      desc: "Той қонақтарының жиналуы, ақ тілек хаттарын толтыру, естелік фотосессия.",
      icon: <Users size={18} className="text-editorial-accent" />,
    },
    {
      time: "18:00",
      title: "Неке қию рәсімі",
      subtitle: "Нәзік пен сезім тоғысы",
      desc: "Екі жастың салтанатты түрде неке куәлігін алу және уәде алмасу сәті.",
      icon: <GlassWater size={18} className="text-editorial-accent" />,
    },
    {
      time: "18:30",
      title: "Беташар рәсімі",
      subtitle: "Келіннің бетін ашу",
      desc: "Халқымыздың ежелгі дәстүрімен жас келінді әулет пен туған-туыстарға таныстыру, Сәлем салу.",
      icon: <Sparkles size={18} className="text-editorial-accent" />,
    },
    {
      time: "19:00",
      title: "Ұлы мерекенің ашылуы",
      subtitle: "Той басы & Ақ бата",
      desc: "Асабаның тойды бастап, құрметті ата-аналар мен үлкендердің ақ бата беру рәсімі.",
      icon: <HeartHandshake size={18} className="text-editorial-accent" />,
    },
    {
      time: "20:30",
      title: "Бас табақ тартылуы",
      subtitle: "Қазақи ұлттық мәзір",
      desc: "Салтанатты түрде дәстүрлі Бесбармақ тасу және құрметті қонақтарға кәде беру.",
      icon: <Gift size={18} className="text-editorial-accent" />,
    },
    {
      time: "23:00",
      title: "Торт кесу & Жастар вальсі",
      subtitle: "Махаббат тәттілігі",
      desc: "Үйлену тойына арналған алып тәтті тортты бірге кесу және романтикалық вальс.",
      icon: <Flame size={18} className="text-editorial-accent" />,
    },
  ];

  const uzatuEvents: TimelineEvent[] = [
    {
      time: "17:00",
      title: "Қонақтарды қарсы алу",
      subtitle: "Сбор гостей & Welcome Drink",
      desc: "Той қонақтарының жиналуы, ақ тілектер жазу, естелік суретке түсу.",
      icon: <Users size={18} className="text-editorial-accent" />,
    },
    {
      time: "18:00",
      title: "Құттықтау сәттері",
      subtitle: "Ақ тілектер мен сыйлықтар",
      desc: "Келген туған-туыстар мен достардың жас аруға арнаған ізгі тілектері мен сый-сияпат құрметі.",
      icon: <GlassWater size={18} className="text-editorial-accent" />,
    },
    {
      time: "19:00",
      title: "Салтанатты ашылу",
      subtitle: "Қыз ұзату тойының басталуы",
      desc: "Асабаның ұзату тойын салтанатты түрде ашуы, үлкендердің ақ батасы.",
      icon: <HeartHandshake size={18} className="text-editorial-accent" />,
    },
    {
      time: "20:30",
      title: "Сый-құрмет & Ас мәзірі",
      subtitle: "Салтанатты дастархан",
      desc: "Дәстүрлі ұлттық тағамдарды ұсыну, қонақтарға құрмет көрсету рәсімдері.",
      icon: <Gift size={18} className="text-editorial-accent" />,
    },
    {
      time: "22:30",
      title: "Сыңсу және Қоштасу",
      subtitle: "Қыздың мұңы мен қоштасу әні",
      desc: "Жас арудың туған жұртымен, құрбы-құрдастарымен қоштасу кеші, қимас сәттер.",
      icon: <Sparkles size={18} className="text-editorial-accent" />,
    },
    {
      time: "23:00",
      title: "Ақ жол рәсімі",
      subtitle: "Шығарып салу сәті",
      desc: "Жас келінді ақ жолдың үстімен жаңа отауына ақ батамен шығарып салу рәсімі.",
      icon: <Flame size={18} className="text-editorial-accent" />,
    },
  ];

  const events = eventType === "uzatu" ? uzatuEvents : weddingEvents;

  return (
    <div id="timeline-section" className="relative max-w-2xl mx-auto py-8">
      {/* Absolute background accent decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <KoshkarMuiiz size={260} />
      </div>

      <div className="text-center space-y-2 mb-10">
        <span className="text-xs font-mono tracking-widest text-editorial-accent font-bold uppercase block">
          Бағдарлама • Той барысы
        </span>
        <h3 className="text-2xl font-serif text-editorial-text font-medium font-bold">
          Той салтанатының кестесі
        </h3>
        <p className="text-xs text-editorial-text/70 max-w-sm mx-auto">
          Осы салтанатты кештің әрбір сәтін бізбен бірге бөлісуіңізді өтінеміз:
        </p>
      </div>

      {/* Styled Vertical Line Staggered List */}
      <div className="relative border-l border-dashed border-editorial-accent/30 ml-4 md:ml-32 space-y-8 pb-4">
        {events.map((event, index) => (
          <div key={index} className="relative pl-6 md:pl-8 group animate-[fadeIn_0.3s_ease-out]" id={`timeline-item-${index}`}>
            {/* Hour marker for desktop alignment */}
            <div className="hidden md:block absolute right-full mr-8 top-1 text-right">
              <span className="text-sm font-bold font-mono text-editorial-accent bg-editorial-accent/10 px-2.5 py-1 rounded-full border border-editorial-accent/25 shadow-sm">
                {event.time}
              </span>
            </div>

            {/* Timeline bullet handle */}
            <div className="absolute -left-3.5 top-0.5 w-7 h-7 rounded-full bg-editorial-bg border-2 border-editorial-accent flex items-center justify-center shadow-md group-hover:bg-editorial-accent/10 transition-all duration-200">
              {event.icon}
            </div>

            {/* Responsive hour marker for mobile */}
            <div className="md:hidden inline-block mb-1">
              <span className="text-xs font-bold font-mono text-editorial-accent bg-editorial-accent/10 px-2.5 py-0.5 rounded-full border border-editorial-accent/25">
                {event.time}
              </span>
            </div>

            {/* Event Description Card */}
            <div className="bg-editorial-bg hover:bg-white border border-stone-200/50 hover:border-editorial-accent/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
              <h4 className="text-base font-semibold text-editorial-text flex items-center justify-between">
                <span>{event.title}</span>
              </h4>
              <p className="text-[11px] font-semibold text-editorial-accent font-mono tracking-wider mb-2">
                {event.subtitle}
              </p>
              <p className="text-xs text-editorial-text/80 leading-relaxed font-sans">
                {event.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

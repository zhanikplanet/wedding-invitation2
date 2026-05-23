import React from "react";

interface KazakhCalendarProps {
  dateString: string; // "YYYY-MM-DD"
}

const MONTH_NAMES_KAZAKH = [
  "ҚАҢТАР",
  "АҚПАН",
  "НАУРЫЗ",
  "СӘУІР",
  "МАМЫР",
  "МАУСЫМ",
  "ШІЛДЕ",
  "ТАМЫЗ",
  "ҚЫРКҮЙЕК",
  "ҚАЗАН",
  "ҚАРАША",
  "ЖЕЛТОҚСАН",
];

const WEEKDAYS_KAZAKH = ["ДС", "СС", "СР", "БС", "ЖМ", "СН", "ЖБ"];

export const KazakhCalendar: React.FC<KazakhCalendarProps> = ({ dateString }) => {
  // Parse date
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth(); // 0-11
  const day = parsedDate.getDate(); // 1-31

  // Format month name in Kazakh
  const monthName = MONTH_NAMES_KAZAKH[month];

  // Logic to build the month grid correctly
  const firstDayOfMonth = new Date(year, month, 1);
  // Get day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  let firstDayIndex = firstDayOfMonth.getDay(); 
  // Map day index so Monday is 0, Sunday is 6
  let startingIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const totalDays = new Date(year, month + 1, 0).getDate();

  // Days array
  const daysArray: (number | null)[] = [];
  for (let i = 0; i < startingIndex; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    daysArray.push(d);
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-transparent border border-editorial-accent/15 rounded-3xl p-6 relative overflow-hidden">
      {/* Title */}
      <div className="text-center mb-4">
        <p className="font-decorative text-editorial-accent text-3xl font-medium tracking-wide">
          Той салтанаты:
        </p>
        <p className="text-[11px] font-mono tracking-widest text-[#C5A059] font-bold uppercase mt-1">
          {year} ЖЫЛДЫҢ {monthName} АЙЫНЫҢ {day} ЖҰЛДЫЗЫНДА
        </p>
      </div>

      {/* Weekdays header */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold font-mono text-editorial-accent/60 border-b border-editorial-accent/10 pb-2 mb-2">
        {WEEKDAYS_KAZAKH.map((wd, i) => (
          <div key={i}>{wd}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-3.5 text-center items-center justify-items-center font-serif text-sm relative">
        {daysArray.map((d, index) => {
          if (d === null) {
            return <div key={`empty-${index}`} className="w-8 h-8" />;
          }

          const isTargetDay = d === day;

          return (
            <div
              key={`day-${d}`}
              className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 ${
                isTargetDay ? "font-bold text-editorial-accent scale-110" : "text-editorial-text"
              }`}
            >
              {isTargetDay && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[pulse_2.5s_infinite]">
                  {/* Heart Outline shape around the day */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-10 h-10 text-editorial-accent fill-none stroke-[4] drop-shadow-md"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 50,30 
                         C 35,10  5,15  5,45 
                         C 5,75  50,95  50,95 
                         C 50,95  95,75  95,45 
                         C 95,15  65,10  50,30 Z"
                      stroke="currentColor"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
              <span className={`relative z-10 ${isTargetDay ? "text-editorial-text mt-[-2px] ml-[-1px]" : ""}`}>
                {d}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

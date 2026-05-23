import React, { useState, useEffect } from "react";
import { Users, CheckCircle, XCircle, Trash2, Shield, CalendarCheck, FileSpreadsheet, PlusCircle } from "lucide-react";
import { GuestResponse } from "../types";

interface AdminPanelProps {
  responses: GuestResponse[];
  onClearAll: () => void;
  onAddSample: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  responses,
  onClearAll,
  onAddSample,
}) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const correctPin = "2026"; // Simple wedding season pin

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Құпия PIN дұрыс емес!");
      setPin("");
    }
  };

  const attendingCount = responses.filter((r) => r.isAttending).length;
  const decliningCount = responses.filter((r) => !r.isAttending).length;
  const totalGuestHeadcount = responses
    .filter((r) => r.isAttending)
    .reduce((sum, r) => sum + r.guestsCount, 0);

  return (
    <div id="admin-panel" className="max-w-4xl mx-auto mt-12 bg-stone-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-stone-100 relative overflow-hidden transition-all duration-300">
      
      {/* Header section toggle */}
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold tracking-wide text-amber-100">
              Қонақтар тізімі (Ұйымдастырушы панелі)
            </h3>
            <p className="text-xs text-stone-400">
              Барлық толтырылған сауалнамаларды нақты уақытта бақылау
            </p>
          </div>
        </div>

        <button
          id="toggle-admin-btn"
          onClick={() => setIsAdminOpen(!isAdminOpen)}
          className="px-4 py-2 text-xs font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400 rounded-xl shadow-md transition-all cursor-pointer"
        >
          {isAdminOpen ? "Панельді жабу" : "Панельді ашу"}
        </button>
      </div>

      {isAdminOpen && (
        <div className="mt-6 space-y-6 animate-[fadeIn_0.3s_ease-out]">
          {/* Authorization Check */}
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="max-w-xs mx-auto text-center space-y-4 py-8">
              <p className="text-sm text-stone-300">
                Басқару панеліне кіру үшін той жылының PIN кодын енгізіңіз (Код: <span className="font-mono text-amber-500 font-bold">2026</span>)
              </p>
              <div className="space-y-2">
                <input
                  type="password"
                  id="admin-pin-input"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN"
                  className="w-full text-center py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 font-mono tracking-widest focus:outline-none focus:border-amber-500 text-lg placeholder-stone-500"
                />
                {authError && <p className="text-xs text-rose-400 font-medium">{authError}</p>}
              </div>
              <button
                type="submit"
                id="admin-login-btn"
                className="w-full py-2.5 bg-amber-500 text-stone-950 rounded-xl hover:bg-amber-400 transition-all font-semibold text-xs uppercase tracking-widest cursor-pointer"
              >
                Кіру
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Quick statistics row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="admin-stats-cards">
                <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700 text-center">
                  <p className="text-xs text-stone-400">Жалпы жауаптар</p>
                  <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{responses.length}</p>
                </div>

                <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle size={12} className="text-emerald-500" />
                    <span>Келетіндер</span>
                  </div>
                  <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{attendingCount}</p>
                </div>

                <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400">
                    <XCircle size={12} className="text-rose-500" />
                    <span>Келмейтіндер</span>
                  </div>
                  <p className="text-2xl font-bold font-mono text-rose-400 mt-1">{decliningCount}</p>
                </div>

                <div className="bg-[#8C7A5B]/20 p-4 rounded-2xl border border-[#8C7A5B]/30 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-amber-200">
                    <Users size={12} className="text-amber-500" />
                    <span>Қонақ саны</span>
                  </div>
                  <p className="text-2xl font-bold font-mono text-amber-200 mt-1">{totalGuestHeadcount} адам</p>
                </div>
              </div>

              {/* Action utilities bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-800/40 p-3 rounded-2xl border border-stone-700/50">
                <div className="flex gap-2">
                  <button
                    id="admin-add-sample-btn"
                    onClick={onAddSample}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-stone-750 hover:bg-stone-700 border border-stone-600 hover:border-amber-500/40 rounded-lg text-xs font-semibold text-stone-200 cursor-pointer transition-all"
                  >
                    <PlusCircle size={14} className="text-amber-500" />
                    Үлгі қонақтар қосу
                  </button>
                </div>

                <button
                  id="admin-clear-all-btn"
                  onClick={() => {
                    if (window.confirm("Наласыңыз ба? Барлық қонақтар тізімі біржола өшіріледі.")) {
                      onClearAll();
                    }
                  }}
                  className="flex items-center gap-1.5 py-1.5 px-3 bg-rose-950/40 hover:bg-rose-900 border border-rose-900/40 rounded-lg text-xs font-semibold text-rose-200 cursor-pointer transition-all"
                >
                  <Trash2 size={14} className="text-rose-400" />
                  Тізімді тазалау
                </button>
              </div>

              {/* Table of Guests */}
              <div className="border border-stone-850 bg-stone-850 rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full text-left border-collapse min-w-[600px] text-xs" id="guests-admin-table">
                  <thead>
                    <tr className="bg-stone-800 text-stone-300 font-bold uppercase tracking-wider border-b border-stone-700">
                      <th className="p-3">Аты-жөні</th>
                      <th className="p-3">Статусы</th>
                      <th className="p-3 text-center">Қонақтар</th>
                      <th className="p-3">Ыстық тілектері / Жауаптары</th>
                      <th className="p-3 text-right">Уақыты</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-200">
                    {responses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-stone-500 font-mono">
                          Әзірше тіркелген қонақтар жоқ. Сауалнаманы толтырып көріңіз!
                        </td>
                      </tr>
                    ) : (
                      responses.map((res) => (
                        <tr key={res.id} className="hover:bg-stone-800/40 transition-colors">
                          <td className="p-3 font-semibold text-white truncate max-w-[150px]">{res.name}</td>
                          <td className="p-3">
                            <span
                              className={`inline-flex items-center gap-1 py-1 px-2.5 rounded-full text-[10px] font-bold ${
                                res.isAttending
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}
                            >
                              {res.isAttending ? (
                                <>
                                  <CheckCircle size={10} />
                                  <span>Келеді</span>
                                </>
                              ) : (
                                <>
                                  <XCircle size={10} />
                                  <span>Келмейді</span>
                                </>
                              )}
                            </span>
                          </td>
                          <td className="p-3 text-center font-mono font-semibold">
                            {res.isAttending ? `${res.guestsCount} адам` : "—"}
                          </td>
                          <td className="p-3 italic max-w-[240px] whitespace-normal break-words text-stone-300 leading-relaxed">
                            {res.wishes || <span className="text-stone-600 font-mono text-[10px]">тілек жазылмады</span>}
                          </td>
                          <td className="p-3 text-right font-mono text-stone-400 text-[10px]">
                            {new Date(res.timestamp).toLocaleDateString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

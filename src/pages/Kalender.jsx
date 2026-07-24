import React, { useContext, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Activity, Heart, CalendarDays } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import AddActivityModal from '../components/AddActivityModal.jsx';

const WEEKDAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function pad(n) { return String(n).padStart(2, '0'); }
function toDateStr(year, month, day) { return `${year}-${pad(month + 1)}-${pad(day)}`; }

export default function Kalender() {
  const { activities, ibadah, navigateTo } = useContext(AppContext);
  const [viewDate, setViewDate] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const events = useMemo(() => [
    ...activities.map(a => ({ id: 'act_' + a.id, date: a.date, title: a.title, type: a.type, kind: 'Aktivitas', dot: 'bg-indigo-500', badge: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300', page: 'activity_detail_' + a.id })),
    ...ibadah.map(i => ({ id: 'ibd_' + i.id, date: i.date, title: `Ibadah Raya - Sesi ${i.session}`, type: i.session, kind: 'Ibadah', dot: 'bg-rose-500', badge: 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300', page: 'ibadah_detail_' + i.id })),
  ], [activities, ibadah]);

  const eventsByDate = useMemo(() => {
    const map = {};
    for (const e of events) {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    }
    return map;
  }, [events]);

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = viewDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => { const d = new Date(); d.setDate(1); setViewDate(d); setSelectedDate(todayStr); };

  const handleDayClick = (day) => {
    if (!day) return;
    const dateStr = toDateStr(year, month, day);
    setSelectedDate(prev => prev === dateStr ? null : dateStr);
  };

  const selectedEvents = selectedDate ? (eventsByDate[selectedDate] || []) : [];

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Kalender</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Semua aktivitas & ibadah dalam satu tampilan bulan.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:-translate-y-0.5 transition-all">
          <Plus size={20}/> Tambah Aktivitas
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={goPrevMonth} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white capitalize">{monthLabel}</h2>
            <button onClick={goToday} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">Hari Ini</button>
          </div>
          <button onClick={goNextMonth} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
          {WEEKDAYS.map(w => (
            <div key={w} className="text-center text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider py-1">{w}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const dateStr = toDateStr(year, month, day);
            const dayEvents = eventsByDate[dateStr] || [];
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;
            return (
              <button
                key={i}
                onClick={() => handleDayClick(day)}
                className={`aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-start pt-1.5 md:pt-2.5 gap-1 transition-all border-2 ${
                  isToday && isSelected ? 'border-indigo-300 dark:border-indigo-400 bg-indigo-600 text-white ring-2 ring-indigo-300 dark:ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' :
                  isToday ? 'border-transparent bg-indigo-600 text-white' :
                  isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' :
                  'border-transparent bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`text-xs md:text-sm font-bold ${isToday ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>{day}</span>
                <div className="flex gap-0.5 flex-wrap justify-center px-0.5">
                  {dayEvents.slice(0, 3).map(e => (
                    <div key={e.id} className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : e.dot}`}></div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </h3>
            <button onClick={() => setSelectedDate(null)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={18}/></button>
          </div>
          {selectedEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedEvents.map(e => (
                <div key={e.id} onClick={() => navigateTo(e.page)} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl cursor-pointer transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${e.kind === 'Ibadah' ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'}`}>
                    {e.kind === 'Ibadah' ? <Heart size={18} /> : <Activity size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 dark:text-slate-100">{e.title}</div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${e.badge}`}>{e.type}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-8 gap-3">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><CalendarDays size={24} /></div>
              <p className="text-slate-400 dark:text-slate-500 font-medium">Belum ada acara di tanggal ini.</p>
              <button onClick={() => setShowAdd(true)} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">+ Tambah Aktivitas di tanggal ini</button>
            </div>
          )}
        </div>
      )}

      {showAdd && <AddActivityModal onClose={() => setShowAdd(false)} initialDate={selectedDate || ''} />}
    </div>
  );
}

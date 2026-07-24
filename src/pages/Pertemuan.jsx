import React, { useContext, useMemo, useState } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight, X, List, CalendarDays, Activity, Heart } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import AddActivityModal from '../components/AddActivityModal.jsx';

const WEEKDAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function pad(n) { return String(n).padStart(2, '0'); }
function toDateStr(year, month, day) { return `${year}-${pad(month + 1)}-${pad(day)}`; }

export default function Pertemuan() {
  const { activities, navigateTo, activeUser, GROUPS, MEETING_TYPES, MEETING_TYPE_STYLES, pertemuanView, setPertemuanView } = useContext(AppContext);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showPast, setShowPast] = useState(false);
  const [viewDate, setViewDate] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [selectedDate, setSelectedDate] = useState(null);

  const canManage = activeUser.role === 'super_admin' || activeUser.role === 'leader';
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredAct = activities
    .filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === 'All' || a.type === filterType) &&
      (showPast ? a.date < todayStr : a.date >= todayStr)
    )
    .sort((a, b) => showPast ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const eventsByDate = useMemo(() => {
    const map = {};
    for (const a of activities) {
      if (!map[a.date]) map[a.date] = [];
      map[a.date].push(a);
    }
    return map;
  }, [activities]);

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
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Pertemuan</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Ibadah, PDG, Bible Talk, dan semua pertemuan dalam satu tempat.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex gap-1">
            <button onClick={() => setPertemuanView('list')} className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${pertemuanView === 'list' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
              <List size={16}/> List
            </button>
            <button onClick={() => setPertemuanView('kalender')} className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${pertemuanView === 'kalender' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
              <CalendarDays size={16}/> Kalender
            </button>
          </div>
          {canManage && (
            <button onClick={() => setShowAdd(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:-translate-y-0.5 transition-all">
              <Plus size={20}/> Tambah
            </button>
          )}
        </div>
      </div>

      {pertemuanView === 'list' ? (
        <>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input type="text" placeholder="Cari pertemuan..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
            </div>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto">
              <option value="All">Semua Tipe</option>
              {MEETING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-fit mb-6">
            <button onClick={() => setShowPast(false)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${!showPast ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>Mendatang</button>
            <button onClick={() => setShowPast(true)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${showPast ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>Riwayat</button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                  <th className="p-5">Tanggal</th>
                  <th className="p-5">Kegiatan</th>
                  <th className="p-5">Grup Terlibat</th>
                  <th className="p-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAct.map(a => {
                  const style = MEETING_TYPE_STYLES[a.type] || MEETING_TYPE_STYLES.Lainnya;
                  const isAllGroups = a.groups.length === GROUPS.length;
                  return (
                    <tr key={a.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                      <td className="p-5 text-slate-800 dark:text-slate-200 font-semibold">{a.date}</td>
                      <td className="p-5">
                        <div className="font-extrabold text-slate-900 dark:text-white text-lg">{a.title}</div>
                        <div className={`text-xs font-bold inline-block px-2 py-1 rounded-md mt-2 ${style.badge}`}>{a.type}</div>
                      </td>
                      <td className="p-5">
                        {isAllGroups ? (
                          <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-400 shadow-sm">Semua Grup</span>
                        ) : (
                          <div className="flex gap-2 flex-wrap">
                            {a.groups.map(g => {
                              const gInfo = GROUPS.find(gr => gr.id === g);
                              return <span key={g} className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm ${gInfo ? gInfo.color : 'bg-slate-400'}`}>{gInfo ? gInfo.name : g}</span>
                            })}
                          </div>
                        )}
                      </td>
                      <td className="p-5 text-right">
                        <button onClick={() => navigateTo('activity_detail_' + a.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold text-sm bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-4 py-2 rounded-xl transition-colors">Buka &rarr;</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredAct.length === 0 && <div className="p-10 text-center font-bold text-slate-400 dark:text-slate-500">{showPast ? 'Belum ada riwayat pertemuan.' : 'Tidak ada pertemuan mendatang.'}</div>}
          </div>
        </>
      ) : (
        <>
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
                      {dayEvents.slice(0, 3).map(e => {
                        const style = MEETING_TYPE_STYLES[e.type] || MEETING_TYPE_STYLES.Lainnya;
                        return <div key={e.id} className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : style.dot}`}></div>;
                      })}
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
                  {selectedEvents.map(e => {
                    const style = MEETING_TYPE_STYLES[e.type] || MEETING_TYPE_STYLES.Lainnya;
                    return (
                      <div key={e.id} onClick={() => navigateTo('activity_detail_' + e.id)} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl cursor-pointer transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${style.iconBg}`}>
                          {e.type === 'Ibadah Minggu' ? <Heart size={18} /> : <Activity size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-800 dark:text-slate-100">{e.title}</div>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${style.badge}`}>{e.type}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-8 gap-3">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500"><CalendarDays size={24} /></div>
                  <p className="text-slate-400 dark:text-slate-500 font-medium">Belum ada pertemuan di tanggal ini.</p>
                  {canManage && <button onClick={() => setShowAdd(true)} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">+ Tambah Pertemuan di tanggal ini</button>}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {showAdd && <AddActivityModal onClose={() => setShowAdd(false)} initialDate={pertemuanView === 'kalender' ? (selectedDate || '') : ''} />}
    </div>
  );
}

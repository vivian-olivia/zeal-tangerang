import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const THEMES = {
  amber: {
    card: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-100 dark:border-amber-900/50',
    title: 'text-amber-900 dark:text-amber-200',
    iconWrap: 'bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300',
    row: 'bg-white/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 border-amber-200/50 dark:border-amber-900/40',
    rowPast: 'bg-white/30 dark:bg-slate-800/20 border-amber-200/30 dark:border-amber-900/20',
    avatar: 'bg-gradient-to-br from-amber-300 to-orange-400',
    date: 'text-amber-700 dark:text-amber-400',
    upcomingBadge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300',
    empty: 'bg-white/50 dark:bg-slate-800/30 border-amber-200/50 dark:border-amber-900/40 text-amber-800 dark:text-amber-300',
  },
  rose: {
    card: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-rose-100 dark:border-rose-900/50',
    title: 'text-rose-900 dark:text-rose-200',
    iconWrap: 'bg-rose-200 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300',
    row: 'bg-white/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 border-rose-200/50 dark:border-rose-900/40',
    rowPast: 'bg-white/30 dark:bg-slate-800/20 border-rose-200/30 dark:border-rose-900/20',
    avatar: 'bg-gradient-to-br from-rose-300 to-pink-400',
    date: 'text-rose-700 dark:text-rose-400',
    upcomingBadge: 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300',
    empty: 'bg-white/50 dark:bg-slate-800/30 border-rose-200/50 dark:border-rose-900/40 text-rose-800 dark:text-rose-300',
  },
};

export default function BirthdayWidget({ title, icon: Icon, theme = 'amber', dateField, emptyText }) {
  const { members, navigateTo } = useContext(AppContext);
  const t = THEMES[theme];

  const today = new Date();
  const currentMonth = today.getMonth();
  const todayDate = today.getDate();

  const list = members
    .filter(m => m[dateField] && new Date(m[dateField]).getMonth() === currentMonth)
    .map(m => {
      const day = new Date(m[dateField]).getDate();
      return { ...m, bdayDay: day, isToday: day === todayDate, isPast: day < todayDate };
    })
    .sort((a, b) => a.bdayDay - b.bdayDay);

  return (
    <div className={`rounded-3xl shadow-sm border p-8 ${t.card}`}>
      <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${t.title}`}>
        <div className={`p-2 rounded-xl ${t.iconWrap}`}><Icon size={20} /></div>
        {title}
      </h2>
      {list.length > 0 ? (
        <div className="space-y-4">
          {list.map(m => (
            <div key={m.id} onClick={() => navigateTo('profile_' + m.id)} className={`flex items-center gap-4 cursor-pointer p-3 rounded-2xl transition-all shadow-sm border ${m.isPast ? `${t.rowPast} opacity-60 hover:opacity-100` : t.row}`}>
              <div className={`w-12 h-12 rounded-2xl text-white font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-inner ${m.isPast ? 'bg-slate-300 dark:bg-slate-700' : t.avatar}`}>
                {m.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-100">{m.name.split(' ')[0]}</div>
                <div className={`text-sm font-medium ${t.date}`}>{new Date(m[dateField]).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</div>
              </div>
              {m.isToday ? (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-sm whitespace-nowrap">Hari ini! 🎉</span>
              ) : m.isPast ? (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 whitespace-nowrap">Sudah lewat</span>
              ) : (
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${t.upcomingBadge}`}>{m.bdayDay - todayDate} hari lagi</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center p-6 rounded-2xl border font-medium ${t.empty}`}>{emptyText}</div>
      )}
    </div>
  );
}

import React, { useContext } from 'react';
import { Home, Users, Activity, CalendarDays, BookOpen } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

const navItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'members', label: 'Disciples', icon: Users },
  { id: 'dtree', label: 'D-Tree', icon: Activity },
  { id: 'pertemuan', label: 'Pertemuan', icon: CalendarDays },
  { id: 'bs', label: 'BS', icon: BookOpen },
];

export default function BottomNav() {
  const { currentPage, navigateTo } = useContext(AppContext);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-800 z-50 flex justify-around items-center px-1 pb-4 pt-1 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentPage === item.id || currentPage.startsWith(item.id + '_');
        return (
          <button
            key={item.id}
            type="button"
            onClick={(e) => {
              e.preventDefault(); // Mencegah klik tembus atau diartikan sebagai submit form
              navigateTo(item.id);
            }}
            className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-100/80 dark:bg-indigo-500/20 scale-110' : 'bg-transparent'}`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[9px] mt-0.5 transition-all ${isActive ? 'font-extrabold' : 'font-semibold'}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

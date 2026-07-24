import React, { useContext } from 'react';
import { ChevronDown, Sun, Moon } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import zealLogo from '../../assets/Logo Hitam Zeal.png';

export default function MobileTopBar() {
  const { activeUser, setActiveUser, members, isDark, toggleDark } = useContext(AppContext);
  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 z-20 sticky top-0 shadow-sm">
      <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
        <img src={zealLogo} alt="Zeal Tangerang" className="h-6 w-auto object-contain" />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleDark}
          className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-300"
          title={isDark ? 'Mode Terang' : 'Mode Gelap'}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <div className="relative">
          <select
            value={activeUser.id}
            onChange={(e) => setActiveUser(members.find(m => m.id === parseInt(e.target.value)))}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none appearance-none cursor-pointer"
          >
            {members.filter(m => m.role === 'super_admin' || m.role === 'leader' || m.id === 3).map(m => (
              <option key={m.id} value={m.id}>
                {m.name.split(' ')[0]} ({m.role === 'super_admin' ? 'SA' : m.role === 'leader' ? 'L' : 'M'})
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-2 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

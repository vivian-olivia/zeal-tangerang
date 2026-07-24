import React, { useContext } from 'react';
import { Home, Users, Activity, Calendar, Heart, BookOpen, ChevronDown, Zap, Sun, Moon } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'members', label: 'Disciples', icon: Users },
  { id: 'dtree', label: 'D-Tree', icon: Activity },
  { id: 'aktivitas', label: 'Aktivitas', icon: Calendar },
  { id: 'ibadah', label: 'Ibadah', icon: Heart },
  { id: 'bs', label: 'Bible Study', icon: BookOpen },
];

export default function Sidebar() {
  const { currentPage, navigateTo, activeUser, setActiveUser, members, isDark, toggleDark } = useContext(AppContext);

  return (
    <nav className="w-72 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800 flex flex-col justify-between z-20 hidden md:flex shadow-sm">
      <div>
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 transform -rotate-6">
                <Zap size={22} className="rotate-6" />
              </div>
              <div>
                <span className="font-bold text-2xl text-slate-900 dark:text-white tracking-tight block leading-none">Zeal</span>
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">Tangerang</span>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleDark}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-300 transition-colors"
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
        <div className="px-6 space-y-1.5 mt-6">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || currentPage.startsWith(item.id + '_');
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950 font-semibold translate-x-1'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:text-indigo-600 dark:hover:text-indigo-400 font-medium'
                }`}
              >
                <Icon size={22} className={isActive ? 'text-white' : ''} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-4 rounded-3xl border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm">
          <div className="text-xs text-indigo-800/60 dark:text-indigo-300/60 font-bold uppercase tracking-wider mb-3 px-1">Ganti Role Simulasi:</div>
          <div className="relative">
            <select
              value={activeUser.id}
              onChange={(e) => setActiveUser(members.find(m => m.id === parseInt(e.target.value)))}
              className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-indigo-100 dark:border-indigo-900 rounded-xl p-3 pl-4 pr-10 text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer shadow-sm"
            >
              {members.filter(m => m.role === 'super_admin' || m.role === 'leader' || m.id === 3).map(m => (
                <option key={m.id} value={m.id}>
                  {m.name.split(' ')[0]} ({m.role})
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-3.5 text-indigo-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </nav>
  );
}

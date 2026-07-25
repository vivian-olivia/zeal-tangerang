import React, { useContext } from 'react';
import { Home, Users, Activity, CalendarDays, BookOpen, Sun, Moon, LogOut } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import zealLogo from '../../assets/Logo Hitam Zeal.png';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'members', label: 'Disciples', icon: Users },
  { id: 'dtree', label: 'D-Tree', icon: Activity },
  { id: 'pertemuan', label: 'Pertemuan', icon: CalendarDays },
  { id: 'bs', label: 'Bible Study', icon: BookOpen },
];

const ROLE_LABELS = { super_admin: 'super_admin', leader: 'leader', member: 'member', guest: 'Mode Tamu' };

export default function Sidebar() {
  const { currentPage, navigateTo, activeUser, logout, isDark, toggleDark } = useContext(AppContext);
  const isGuest = activeUser.role === 'guest';

  return (
    <nav className="w-72 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800 flex flex-col justify-between z-20 hidden md:flex shadow-sm">
      <div>
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="bg-white rounded-2xl px-3 py-2.5 shadow-sm">
              <img src={zealLogo} alt="Zeal Tangerang" className="h-9 w-auto object-contain" />
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
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-4 rounded-3xl border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm flex items-center justify-between gap-3">
          {isGuest ? (
            <div className="min-w-0 flex-1 p-1">
              <div className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{activeUser.name}</div>
              <div className="text-xs text-indigo-800/60 dark:text-indigo-300/60 font-bold uppercase tracking-wider truncate">{ROLE_LABELS.guest}</div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigateTo('profile_' + activeUser.id)}
              className="min-w-0 flex-1 text-left rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/40 transition-colors p-1 -m-1"
              title="Lihat & edit profil saya"
            >
              <div className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{activeUser.name}</div>
              <div className="text-xs text-indigo-800/60 dark:text-indigo-300/60 font-bold uppercase tracking-wider truncate">{ROLE_LABELS[activeUser.role] || activeUser.role}</div>
            </button>
          )}
          <button
            type="button"
            onClick={logout}
            className="p-2.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border border-indigo-100 dark:border-indigo-900 rounded-xl text-indigo-500 dark:text-indigo-300 transition-colors flex-shrink-0"
            title={isGuest ? 'Keluar dari Mode Tamu' : 'Keluar'}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

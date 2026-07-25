import React, { useContext } from 'react';
import { Sun, Moon, LogOut } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import zealLogo from '../../assets/Logo Hitam Zeal.png';

export default function MobileTopBar() {
  const { activeUser, navigateTo, logout, isDark, toggleDark } = useContext(AppContext);
  const isGuest = activeUser.role === 'guest';
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
        {isGuest ? (
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[7rem]">
            Tamu
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigateTo('profile_' + activeUser.id)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[7rem]"
            title="Lihat & edit profil saya"
          >
            {activeUser.name.split(' ')[0]}
          </button>
        )}
        <button
          type="button"
          onClick={logout}
          className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-300"
          title={isGuest ? 'Keluar dari Mode Tamu' : 'Keluar'}
        >
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
}

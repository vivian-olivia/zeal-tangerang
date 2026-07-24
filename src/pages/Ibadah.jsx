import React, { useContext, useState } from 'react';
import { Heart } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function Ibadah() {
  const { ibadah, navigateTo } = useContext(AppContext);
  const [filterSession, setFilterSession] = useState('All');

  const filteredIbadah = ibadah.filter(i => filterSession === 'All' || i.session === filterSession);

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          Ibadah Raya <Heart className="text-rose-500" fill="currentColor"/>
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8 flex justify-end">
        <select value={filterSession} onChange={e => setFilterSession(e.target.value)} className="bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto">
          <option value="All">Semua Sesi</option>
          <option value="Pagi">Sesi Pagi</option>
          <option value="Sore">Sesi Sore</option>
        </select>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        {filteredIbadah.map(i => (
          <div key={i.id} className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">{i.date.split('-')[2]}</div>
               <div>
                 <div className="font-extrabold text-slate-900 dark:text-white text-lg">Ibadah Raya - Sesi {i.session}</div>
                 <div className="text-sm font-bold text-slate-400 dark:text-slate-500 mt-1">{i.date}</div>
               </div>
            </div>
            <button onClick={() => navigateTo('ibadah_detail_' + i.id)} className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-5 py-3 rounded-2xl transition-colors whitespace-nowrap">Lihat Kehadiran &rarr;</button>
          </div>
        ))}
        {filteredIbadah.length === 0 && <div className="p-10 text-center font-bold text-slate-400 dark:text-slate-500">Tidak ada data ibadah.</div>}
      </div>
    </div>
  );
}

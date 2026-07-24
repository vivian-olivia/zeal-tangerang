import React, { useContext, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import AddActivityModal from '../components/AddActivityModal.jsx';

export default function Aktivitas() {
  const { activities, navigateTo, activeUser, GROUPS } = useContext(AppContext);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredAct = activities.filter(a => {
    return a.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (filterType === 'All' || a.type === filterType);
  });

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Aktivitas</h1>
        {(activeUser.role === 'super_admin' || activeUser.role === 'leader') && (
          <button onClick={() => setShowAdd(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:-translate-y-0.5 transition-all">
            <Plus size={20}/> Tambah Aktivitas
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input type="text" placeholder="Cari aktivitas..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto">
          <option value="All">Semua Tipe</option>
          <option value="PDG">PDG</option>
          <option value="Fellowship">Fellowship</option>
          <option value="Lainnya">Lainnya</option>
        </select>
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
            {filteredAct.map(a => (
              <tr key={a.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="p-5 text-slate-800 dark:text-slate-200 font-semibold">{a.date}</td>
                <td className="p-5">
                  <div className="font-extrabold text-slate-900 dark:text-white text-lg">{a.title}</div>
                  <div className="text-xs font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 inline-block px-2 py-1 rounded-md mt-2">{a.type}</div>
                </td>
                <td className="p-5">
                  <div className="flex gap-2 flex-wrap">
                    {a.groups.map(g => {
                       const gInfo = GROUPS.find(gr => gr.id === g);
                       return <span key={g} className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm ${gInfo ? gInfo.color : 'bg-slate-400'}`}>{gInfo ? gInfo.name : g}</span>
                    })}
                  </div>
                </td>
                <td className="p-5 text-right">
                  <button onClick={() => navigateTo('activity_detail_' + a.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold text-sm bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-4 py-2 rounded-xl transition-colors">Buka &rarr;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAct.length === 0 && <div className="p-10 text-center font-bold text-slate-400 dark:text-slate-500">Tidak ada aktivitas ditemukan.</div>}
      </div>

      {showAdd && <AddActivityModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}

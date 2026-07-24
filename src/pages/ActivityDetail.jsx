import React, { useContext } from 'react';
import { ChevronLeft } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function ActivityDetail({ id }) {
  const { activities, setActivities, members, navigateTo, activeUser, GROUPS } = useContext(AppContext);
  const activity = activities.find(a => a.id === id);
  if (!activity) return null;

  const isAllGroups = activity.groups.length === GROUPS.length;
  const targetMembers = members.filter(m => activity.groups.includes(m.group));

  const handleStatusChange = (memberId, status, reason = '') => {
    const updated = activities.map(a => a.id === id ? { ...a, attendance: { ...a.attendance, [memberId]: { status, reason } } } : a);
    setActivities(updated);
  };

  return (
    <div className="p-5 md:p-10">
      <button onClick={() => navigateTo('pertemuan')} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 font-bold transition-colors"><div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg"><ChevronLeft size={20} /></div> Kembali</button>
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-indigo-950 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -z-0"></div>
        <div className="relative z-10">
           <h1 className="text-3xl font-black mb-2">{activity.title}</h1>
           <div className="flex flex-wrap gap-3 items-center text-indigo-100 font-medium">
             <span>{activity.date}</span> • <span className="px-2 py-1 bg-white/20 rounded-lg text-sm font-bold">{activity.type}</span> • <span>Target: {isAllGroups ? 'Semua Anggota' : activity.groups.join(', ')}</span>
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">
            <tr><th className="p-5">Nama</th><th className="p-5">Grup</th><th className="p-5">Kehadiran</th><th className="p-5">Catatan/Alasan</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {targetMembers.map(m => {
              const att = activity.attendance[m.id] || { status: 'Belum diisi', reason: '' };
              const isEditable = activeUser.role === 'super_admin' || (activeUser.role === 'leader' && m.group === activeUser.group);
              return (
                <tr key={m.id} className={isEditable ? 'hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors' : 'bg-slate-50/50 dark:bg-slate-800/20 opacity-80'}>
                  <td className="p-5 font-bold text-slate-800 dark:text-slate-100">{m.name}</td>
                  <td className="p-5 text-sm font-bold text-slate-500 dark:text-slate-400">{GROUPS.find(g => g.id === m.group)?.name}</td>
                  <td className="p-5">
                    <select
                      disabled={!isEditable}
                      value={att.status}
                      onChange={(e) => handleStatusChange(m.id, e.target.value, att.reason)}
                      className={`p-2.5 text-sm rounded-xl font-bold border-2 outline-none appearance-none cursor-pointer ${
                        att.status === 'Hadir' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900' :
                        att.status === 'Alfa' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900' :
                        att.status === 'Belum diisi' ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900'
                      }`}
                    >
                      <option>Belum diisi</option><option>Hadir</option><option>Telat</option><option>Izin</option><option>Sakit</option><option>Alfa</option>
                    </select>
                  </td>
                  <td className="p-5">
                    <input
                      disabled={!isEditable}
                      type="text" placeholder="Ketik alasan jika absen..." value={att.reason}
                      onChange={(e) => handleStatusChange(m.id, att.status, e.target.value)}
                      className="w-full p-2.5 text-sm border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:bg-slate-50 dark:focus:bg-slate-800 outline-none font-medium transition-colors disabled:bg-transparent text-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

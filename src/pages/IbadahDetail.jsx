import React, { useContext } from 'react';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function IbadahDetail({ id }) {
  const { ibadah, setIbadah, members, activeUser, navigateTo } = useContext(AppContext);
  const session = ibadah.find(i => i.id === id);
  if (!session) return null;

  const handleStatusChange = (memberId, status, reason = '') => {
    const updated = ibadah.map(i => i.id === id ? { ...i, attendance: { ...i.attendance, [memberId]: { status, reason } } } : i);
    setIbadah(updated);
  };

  return (
    <div className="p-5 md:p-10">
       <button onClick={() => navigateTo('ibadah')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-bold transition-colors"><div className="p-1.5 bg-slate-100 rounded-lg"><ChevronLeft size={20} /></div> Kembali</button>

       <div className="mb-8">
         <h1 className="text-3xl font-black text-slate-900">Absensi Ibadah</h1>
         <p className="text-lg font-bold text-indigo-600 mt-2">{session.date} • Sesi {session.session}</p>
       </div>

       <div className="bg-blue-50/50 border border-blue-100 text-blue-800 p-5 rounded-2xl mb-8 text-sm flex gap-4 items-start shadow-sm">
          <AlertCircle size={24} className="flex-shrink-0 text-blue-600 mt-0.5"/>
          <p className="font-medium leading-relaxed">Sebagai <strong>{activeUser.role}</strong>, Anda {activeUser.role === 'super_admin' ? 'bisa mengedit absensi semua orang.' : `hanya bisa mengedit absensi kelompok Anda (${activeUser.group}). Kelompok lain bersifat view-only.`}</p>
       </div>

       <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
               <tr><th className="p-5">Nama</th><th className="p-5">Grup</th><th className="p-5">Kehadiran</th></tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {members.map(m => {
                  const att = session.attendance[m.id] || { status: 'Belum diisi' };
                  const isEditable = activeUser.role === 'super_admin' || (activeUser.role === 'leader' && m.group === activeUser.group);
                  return (
                    <tr key={m.id} className={isEditable ? 'hover:bg-slate-50 transition-colors' : 'bg-slate-50/50 opacity-70'}>
                      <td className="p-5 font-bold text-slate-800">{m.name}</td>
                      <td className="p-5 text-sm font-bold text-slate-400">{m.group}</td>
                      <td className="p-5">
                        <select
                          disabled={!isEditable}
                          value={att.status}
                          onChange={(e) => handleStatusChange(m.id, e.target.value)}
                          className={`p-2.5 text-sm rounded-xl font-bold border-2 outline-none appearance-none ${!isEditable ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-700 cursor-pointer focus:border-indigo-500 focus:bg-slate-50'}`}
                        >
                          <option>Belum diisi</option><option>Hadir</option><option>Alfa</option><option>Izin</option><option>Sakit</option>
                        </select>
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

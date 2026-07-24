import React, { useContext, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function BibleStudy() {
  const { bsCases, setBsCases, navigateTo, showToast, members, activeUser } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddCase, setShowAddCase] = useState(false);
  const [newCase, setNewCase] = useState({ personName: '', teacherId: activeUser.id });

  const filteredBS = bsCases.filter(bs => {
    return bs.personName.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (filterStatus === 'All' || bs.status === filterStatus);
  });

  const handleAddCase = (e) => {
    e.preventDefault();
    const newId = bsCases.length + 1;
    setBsCases([{ id: newId, personName: newCase.personName, teacherId: Number(newCase.teacherId), status: 'Aktif', sessions: [] }, ...bsCases]);
    setShowAddCase(false);
    showToast('Bible Study baru berhasil dibuat!');
  };

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Bible Study</h1>
        <button onClick={() => setShowAddCase(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:-translate-y-0.5 transition-all">
           <Plus size={20}/> Tambah BS Baru
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input type="text" placeholder="Cari nama orang..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto">
          <option value="All">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBS.map(bs => (
          <div key={bs.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">{bs.personName}</h2>
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg shadow-sm ${bs.status === 'Aktif' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>{bs.status}</span>
              </div>
              <div className="text-right bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-2xl">
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 leading-none">M{bs.sessions.length}</div>
              </div>
            </div>
            <button onClick={() => navigateTo('bs_detail_' + bs.id)} className="w-full mt-2 py-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 font-bold rounded-2xl transition-colors border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-900">Buka Detail Sesi</button>
          </div>
        ))}
      </div>

      {showAddCase && (
        <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-extrabold mb-6 text-slate-900 dark:text-white">Mulai BS Baru</h2>
            <form onSubmit={handleAddCase} className="space-y-5">
              <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Orang (Studi-an)</label><input required type="text" value={newCase.personName} onChange={e => setNewCase({ ...newCase, personName: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200"/></div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Guru (Leader BS)</label>
                <select value={newCase.teacherId} onChange={e => setNewCase({ ...newCase, teacherId: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer text-slate-800 dark:text-slate-200">
                  {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="pt-4 flex gap-4"><button type="button" onClick={() => setShowAddCase(false)} className="flex-1 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">Batal</button><button type="submit" className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700">Simpan</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

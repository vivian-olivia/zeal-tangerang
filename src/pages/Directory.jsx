import React, { useContext, useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function Directory() {
  const { members, activeUser, navigateTo, showToast, GROUPS, LOVE_LANGUAGES, GENDER_COLORS, LIFE_STATUS_COLORS } = useContext(AppContext);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '' });

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterLL, setFilterLL] = useState('All');

  const handleInvite = (e) => {
    e.preventDefault();
    showToast(`Undangan berhasil dikirim ke ${inviteForm.email}`);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '' });
  };

  const filteredMembers = members.filter(m => {
    const matchName = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGroup = filterGroup === 'All' || m.group === filterGroup;
    const matchLL = filterLL === 'All' || m.loveLang === filterLL;
    return matchName && matchGroup && matchLL;
  }).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Disciples</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">{filteredMembers.length} anggota ditemukan</p>
        </div>
        {(activeUser.role === 'super_admin' || activeUser.role === 'leader') && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-slate-900/20 dark:shadow-indigo-950 hover:-translate-y-0.5"
          >
            <Plus size={20}/> Tambah Anggota
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input
            type="text" placeholder="Cari nama anggota..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 w-full md:flex md:gap-4 md:w-auto">
          <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)} className="w-full min-w-0 truncate bg-slate-50 dark:bg-slate-800 px-3 md:px-4 py-3 rounded-2xl font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="All">Semua Grup</option>
            {GROUPS.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <select value={filterLL} onChange={e => setFilterLL(e.target.value)} className="w-full min-w-0 truncate bg-slate-50 dark:bg-slate-800 px-3 md:px-4 py-3 rounded-2xl font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="All">Semua Love Language</option>
            {Object.keys(LOVE_LANGUAGES).map(ll => ll !== 'Unknown' && <option key={ll} value={ll}>{ll}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {filteredMembers.map(m => {
          const genderColor = GENDER_COLORS[m.gender] || 'bg-slate-300';
          const groupInfo = GROUPS.find(g => g.id === m.group);
          const lifeStatusColor = LIFE_STATUS_COLORS[m.lifeStatus] || LIFE_STATUS_COLORS.Lainnya;
          return (
            <div
              key={m.id}
              onClick={() => navigateTo('profile_' + m.id)}
              className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`h-1.5 md:h-2.5 w-full ${genderColor}`}></div>
              <div className="p-3 md:p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-lg md:text-3xl font-black text-slate-300 dark:text-slate-600 mb-2 md:mb-5 group-hover:scale-110 transition-transform duration-300 border-2 md:border-4 border-white dark:border-slate-900 shadow-md">
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs md:text-lg leading-tight truncate max-w-full">{m.name}</h3>
                <span className={`mt-1.5 md:mt-3 px-2.5 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold text-white shadow-sm truncate max-w-full ${groupInfo?.color || 'bg-slate-500'}`}>
                  {groupInfo?.name || m.group}
                </span>
                {m.lifeStatus && (
                  <span className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold border truncate max-w-full ${lifeStatusColor}`}>
                    {m.lifeStatus}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Undang Anggota</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20}/></button>
            </div>
            <form onSubmit={handleInvite} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
                <input required type="text" value={inviteForm.name} onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200" placeholder="Ketik nama lengkap..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input required type="email" value={inviteForm.email} onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200" placeholder="email@contoh.com" />
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Batal</button>
                <button type="submit" className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:bg-indigo-700 transition-colors">Kirim</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

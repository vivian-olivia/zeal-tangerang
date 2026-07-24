import React, { useContext, useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function Directory() {
  const { members, activeUser, navigateTo, showToast, GROUPS, LOVE_LANGUAGES } = useContext(AppContext);
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Disciples</h1>
          <p className="text-slate-500 font-medium mt-2">{filteredMembers.length} anggota ditemukan</p>
        </div>
        {(activeUser.role === 'super_admin' || activeUser.role === 'leader') && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-0.5"
          >
            <Plus size={20}/> Tambah Anggota
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input
            type="text" placeholder="Cari nama anggota..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)} className="bg-slate-50 px-4 py-3 rounded-2xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="All">Semua Grup</option>
            {GROUPS.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <select value={filterLL} onChange={e => setFilterLL(e.target.value)} className="bg-slate-50 px-4 py-3 rounded-2xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="All">Semua Love Language</option>
            {Object.keys(LOVE_LANGUAGES).map(ll => ll !== 'Unknown' && <option key={ll} value={ll}>{ll}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map(m => {
          const llColor = LOVE_LANGUAGES[m.loveLang] || LOVE_LANGUAGES['Unknown'];
          const groupInfo = GROUPS.find(g => g.id === m.group);
          return (
            <div
              key={m.id}
              onClick={() => navigateTo('profile_' + m.id)}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`h-2.5 w-full ${llColor}`}></div>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-3xl font-black text-slate-300 mb-5 group-hover:scale-110 transition-transform duration-300 border-4 border-white shadow-md">
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">{m.name}</h3>
                <span className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm ${groupInfo?.color || 'bg-slate-500'}`}>
                  {groupInfo?.name || m.group}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900">Undang Anggota</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleInvite} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                <input required type="text" value={inviteForm.name} onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none" placeholder="Ketik nama lengkap..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input required type="email" value={inviteForm.email} onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none" placeholder="email@contoh.com" />
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 py-3.5 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">Batal</button>
                <button type="submit" className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">Kirim</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

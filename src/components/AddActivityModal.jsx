import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';

export default function AddActivityModal({ onClose }) {
  const { setActivities, activities, showToast, GROUPS } = useContext(AppContext);
  const [form, setForm] = useState({ title: '', type: 'PDG', date: '', groups: [] });

  const toggleGroup = (groupId) => {
    setForm(prev => ({
      ...prev,
      groups: prev.groups.includes(groupId) ? prev.groups.filter(g => g !== groupId) : [...prev.groups, groupId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.groups.length === 0) return showToast('Pilih minimal 1 grup!', 'error');
    const newAct = { ...form, id: Date.now(), attendance: {} };
    setActivities([newAct, ...activities]);
    showToast('Aktivitas berhasil ditambahkan!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-extrabold mb-6 text-slate-900">Tambah Aktivitas</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Nama Kegiatan</label><input required type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium"/></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label><input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Tipe</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"><option>PDG</option><option>Fellowship</option><option>Lainnya</option></select></div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Grup yang Terlibat</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GROUPS.map(g => (
                <label key={g.id} className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border-2 transition-all ${form.groups.includes(g.id) ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                  <input type="checkbox" checked={form.groups.includes(g.id)} onChange={() => toggleGroup(g.id)} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" />
                  <span className="text-sm font-bold text-slate-700">{g.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-6 flex gap-4"><button type="button" onClick={onClose} className="flex-1 p-3.5 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200">Batal</button><button type="submit" className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700">Simpan</button></div>
        </form>
      </div>
    </div>
  );
}

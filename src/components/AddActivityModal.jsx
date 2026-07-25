import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';

export default function AddActivityModal({ onClose, initialDate = '' }) {
  const { addActivity, showToast, GROUPS, MEETING_TYPES } = useContext(AppContext);
  const [form, setForm] = useState({ title: '', type: MEETING_TYPES[0], date: initialDate, groups: [] });
  const [submitting, setSubmitting] = useState(false);

  const isIbadah = form.type === 'Ibadah Minggu';

  const toggleGroup = (groupId) => {
    setForm(prev => ({
      ...prev,
      groups: prev.groups.includes(groupId) ? prev.groups.filter(g => g !== groupId) : [...prev.groups, groupId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isIbadah && form.groups.length === 0) return showToast('Pilih minimal 1 grup!', 'error');
    const groups = isIbadah ? GROUPS.map(g => g.id) : form.groups;
    setSubmitting(true);
    const { error } = await addActivity({ title: form.title, type: form.type, date: form.date, groups });
    setSubmitting(false);
    if (error) return;
    showToast('Pertemuan berhasil ditambahkan!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-extrabold mb-6 text-slate-900 dark:text-white">Tambah Pertemuan</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Kegiatan</label><input required type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200"/></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tanggal</label><input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200"/></div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tipe</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer text-slate-800 dark:text-slate-200">
                {MEETING_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {isIbadah ? (
            <div className="p-4 bg-rose-50/60 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-900 rounded-2xl text-sm font-medium text-rose-700 dark:text-rose-300">
              Ibadah Minggu otomatis berlaku untuk semua anggota, semua grup.
            </div>
          ) : (
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Grup yang Terlibat</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {GROUPS.map(g => (
                  <label key={g.id} className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border-2 transition-all ${form.groups.includes(g.id) ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}>
                    <input type="checkbox" checked={form.groups.includes(g.id)} onChange={() => toggleGroup(g.id)} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{g.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="pt-6 flex gap-4"><button type="button" onClick={onClose} className="flex-1 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">Batal</button><button type="submit" disabled={submitting} className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:bg-indigo-700 disabled:opacity-60">{submitting ? 'Menyimpan...' : 'Simpan'}</button></div>
        </form>
      </div>
    </div>
  );
}

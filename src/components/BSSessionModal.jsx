import React from 'react';

export default function BSSessionModal({ title, submitLabel, form, setForm, members, onSubmit, onClose }) {
  const toggleSitIn = (mId) => setForm(prev => ({ ...prev, sitIn: prev.sitIn.includes(mId) ? prev.sitIn.filter(x => x !== mId) : [...prev.sitIn, mId] }));

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
       <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in-up">
          <h2 className="text-2xl font-extrabold mb-8 text-slate-900 dark:text-white">{title}</h2>
          <form onSubmit={onSubmit} className="space-y-6">
             <div className="grid grid-cols-2 gap-5">
               <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tanggal</label><input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800 dark:text-slate-200"/></div>
               <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Lokasi</label><input required type="text" placeholder="Mis. Cafe XYZ" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800 dark:text-slate-200"/></div>
             </div>
             <div className="grid grid-cols-3 gap-5">
               <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Materi Ke-</label><input required type="number" value={form.material} onChange={e => setForm({ ...form, material: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800 dark:text-slate-200"/></div>
               <div className="col-span-2"><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Topik Utama</label><input required type="text" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800 dark:text-slate-200"/></div>
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Anggota Sit-in (Multi-select)</label>
               <div className="max-h-40 overflow-y-auto border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-4 grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 custom-scrollbar">
                 {members.map(m => (
                   <label key={m.id} className={`flex items-center gap-3 cursor-pointer text-sm font-bold p-2 rounded-xl transition-colors ${form.sitIn.includes(m.id) ? 'bg-indigo-100/50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                     <input type="checkbox" checked={form.sitIn.includes(m.id)} onChange={() => toggleSitIn(m.id)} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" /> {m.name}
                   </label>
                 ))}
               </div>
             </div>
             <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 text-rose-500 dark:text-rose-400">Issue / Pergumulan</label><textarea rows="2" value={form.issue} onChange={e => setForm({ ...form, issue: e.target.value })} className="w-full p-3.5 bg-rose-50/50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-900 rounded-2xl focus:ring-2 focus:ring-rose-400 outline-none font-medium text-rose-900 dark:text-rose-200 placeholder:text-rose-300 dark:placeholder:text-rose-800" placeholder="Opsional..."></textarea></div>
             <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 text-amber-500 dark:text-amber-400">Action Items</label><textarea rows="2" value={form.actions} onChange={e => setForm({ ...form, actions: e.target.value })} className="w-full p-3.5 bg-amber-50/50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-900 rounded-2xl focus:ring-2 focus:ring-amber-400 outline-none font-medium text-amber-900 dark:text-amber-200 placeholder:text-amber-300 dark:placeholder:text-amber-800" placeholder="Tugas mandiri untuk minggu depan..."></textarea></div>
             <div><label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 text-teal-500 dark:text-teal-400">Summary Notes</label><textarea rows="3" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="w-full p-3.5 bg-teal-50/50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-900 rounded-2xl focus:ring-2 focus:ring-teal-400 outline-none font-medium text-teal-900 dark:text-teal-200 placeholder:text-teal-300 dark:placeholder:text-teal-800" placeholder="Rangkuman materi..."></textarea></div>

             <div className="pt-6 flex gap-4"><button type="button" onClick={onClose} className="flex-1 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">Batal</button><button type="submit" className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:bg-indigo-700">{submitLabel}</button></div>
          </form>
       </div>
    </div>
  );
}

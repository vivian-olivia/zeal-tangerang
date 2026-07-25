import React, { useContext, useState } from 'react';
import { X } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function EditStatusModal({ member, onClose }) {
  const { updateMember, showToast } = useContext(AppContext);
  const [status, setStatus] = useState(member.status || 'Strong');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await updateMember({ ...member, status });
    setSubmitting(false);
    showToast('Status rohani berhasil diperbarui!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Update Status Rohani</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20}/></button>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">{member.name}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Status Rohani</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer text-slate-800 dark:text-slate-200">
              <option value="Strong">Strong</option>
              <option value="Concern">Concern</option>
              <option value="Weak">Weak</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">Batal</button>
            <button type="submit" disabled={submitting} className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:bg-indigo-700 disabled:opacity-60">{submitting ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

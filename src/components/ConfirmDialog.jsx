import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ title, message, confirmLabel = 'Hapus', onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    await onConfirm();
    setBusy(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-[70] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in-up">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5">
          <AlertTriangle size={22} />
        </div>
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">{title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">{message}</p>
        <div className="flex gap-3">
          <button type="button" onClick={onClose} disabled={busy} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-60 transition-colors">
            Batal
          </button>
          <button type="button" onClick={handleConfirm} disabled={busy} className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold shadow-lg shadow-rose-200 dark:shadow-rose-950 disabled:opacity-60 transition-colors">
            {busy ? 'Menghapus...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

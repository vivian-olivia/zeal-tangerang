import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-24 md:bottom-8 right-4 md:right-8 px-6 py-4 rounded-2xl shadow-2xl text-white font-semibold flex items-center gap-3 z-50 transform transition-all animate-bounce-short ${toast.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-red-500'}`}>
      {toast.type === 'success' ? <CheckCircle size={20}/> : <AlertCircle size={20}/>}
      {toast.msg}
    </div>
  );
}

import React from 'react';

const styles = {
  indigo: 'from-indigo-500 to-blue-600 shadow-indigo-200',
  amber: 'from-amber-400 to-orange-500 shadow-amber-200',
  teal: 'from-teal-400 to-emerald-500 shadow-teal-200',
  rose: 'from-rose-400 to-pink-500 shadow-rose-200',
};

export default function StatCard({ title, value, icon: Icon, type }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all group overflow-hidden relative">
      <div className={`absolute top-[-50%] right-[-20%] w-32 h-32 bg-gradient-to-br ${styles[type]} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${styles[type]} text-white shadow-lg`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
      <div>
        <div className="text-3xl font-black text-slate-800 tracking-tight">{value}</div>
        <div className="text-sm font-semibold text-slate-500 mt-1">{title}</div>
      </div>
    </div>
  );
}

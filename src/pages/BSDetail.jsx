import React, { useContext, useState } from 'react';
import { ChevronLeft, Plus, Edit3, Trash2, Calendar, MapPin, AlertCircle, CheckSquare, FileText, Users } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import BSSessionModal from '../components/BSSessionModal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

export default function BSDetail({ id }) {
  const { bsCases, addBsSession, updateBsSession, deleteBsSession, deleteBsCase, members, navigateTo, activeUser, showToast } = useContext(AppContext);
  const bs = bsCases.find(b => b.id === id);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ date: '', location: '', material: bs?.sessions.length + 1 || 1, topic: '', sitIn: [], issue: '', actions: '', notes: '' });
  const [editingSession, setEditingSession] = useState(null);
  const [deletingSessionId, setDeletingSessionId] = useState(null);
  const [showDeleteCase, setShowDeleteCase] = useState(false);

  if (!bs) return null;

  const canManage = activeUser.role === 'leader' || activeUser.role === 'super_admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBsSession(id, form);
    setShowAdd(false);
    showToast('Sesi BS berhasil ditambahkan!');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateBsSession(id, editingSession);
    setEditingSession(null);
    showToast('Sesi BS berhasil diperbarui!');
  };

  return (
    <div className="p-5 md:p-10">
       <div className="flex items-center justify-between mb-8">
         <button onClick={() => navigateTo('bs')} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-colors"><div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg"><ChevronLeft size={20} /></div> Kembali</button>
         {canManage && (
           <button onClick={() => setShowDeleteCase(true)} className="flex items-center gap-2 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 px-4 py-2.5 rounded-xl font-bold text-sm border border-rose-100 dark:border-rose-900 transition-all">
             <Trash2 size={16}/> Hapus BS
           </button>
         )}
       </div>

       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 break-words">{bs.personName}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Total {bs.sessions.length} sesi tercatat.</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:-translate-y-0.5 transition-all">
            <Plus size={20}/> Tambah Sesi
          </button>
       </div>

       <div className="space-y-8 relative before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-indigo-100 before:to-indigo-50 dark:before:from-indigo-900 dark:before:to-slate-900">
          {bs.sessions.map((ses) => (
             <div key={ses.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-500 text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-4 md:ml-0 font-black">
                  M{ses.material}
                </div>

                {/* Card */}
                <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all relative">
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={() => setEditingSession({ ...ses })}
                      className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-colors"
                      title="Edit Sesi"
                    >
                      <Edit3 size={16}/>
                    </button>
                    {canManage && (
                      <button
                        onClick={() => setDeletingSessionId(ses.id)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-2 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"
                        title="Hapus Sesi"
                      >
                        <Trash2 size={16}/>
                      </button>
                    )}
                  </div>
                  <div className="pr-16 text-sm font-bold text-slate-400 dark:text-slate-500 mb-2 flex items-center flex-wrap gap-x-2 gap-y-1">
                    <Calendar size={14} className="shrink-0"/> {ses.date} <span className="text-slate-300 dark:text-slate-700">•</span> <MapPin size={14} className="shrink-0"/> <span className="break-words">{ses.location}</span>
                  </div>
                  <h3 className="pr-16 text-xl font-extrabold text-slate-900 dark:text-white mb-5 break-words">{ses.topic}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="bg-rose-50/50 dark:bg-rose-500/10 p-4 rounded-2xl border border-rose-100 dark:border-rose-900"><div className="text-[10px] font-black text-rose-500 dark:text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><AlertCircle size={12}/> Issue</div><p className="text-sm font-medium text-rose-900 dark:text-rose-200 leading-relaxed">{ses.issue || '-'}</p></div>
                    <div className="bg-amber-50/50 dark:bg-amber-500/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-900"><div className="text-[10px] font-black text-amber-500 dark:text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><CheckSquare size={12}/> Action Items</div><p className="text-sm font-medium text-amber-900 dark:text-amber-200 leading-relaxed">{ses.actions || '-'}</p></div>
                    <div className="bg-teal-50/50 dark:bg-teal-500/10 p-4 rounded-2xl border border-teal-100 dark:border-teal-900"><div className="text-[10px] font-black text-teal-500 dark:text-teal-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><FileText size={12}/> Notes</div><p className="text-sm font-medium text-teal-900 dark:text-teal-200 leading-relaxed">{ses.notes || '-'}</p></div>
                  </div>

                  <div className="text-sm font-bold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-5 flex items-start gap-2">
                    <Users size={16} className="text-slate-400 dark:text-slate-500 mt-0.5"/>
                    <span className="leading-relaxed">Sit-in: {ses.sitIn.length > 0 ? ses.sitIn.map(sid => members.find(m => m.id === sid)?.name.split(' ')[0]).join(', ') : '-'}</span>
                  </div>
                </div>
             </div>
          ))}
       </div>

       {showAdd && (
          <BSSessionModal
            title="Catat Sesi BS Baru"
            submitLabel="Simpan Sesi"
            form={form}
            setForm={setForm}
            members={members}
            onSubmit={handleSubmit}
            onClose={() => setShowAdd(false)}
          />
       )}

       {editingSession && (
          <BSSessionModal
            title="Edit Sesi BS"
            submitLabel="Update Sesi"
            form={editingSession}
            setForm={setEditingSession}
            members={members}
            onSubmit={handleEditSubmit}
            onClose={() => setEditingSession(null)}
          />
       )}

       {deletingSessionId != null && (
          <ConfirmDialog
            title="Hapus Sesi?"
            message="Sesi BS ini akan dihapus permanen. Tindakan ini tidak bisa dibatalkan."
            onConfirm={async () => { await deleteBsSession(id, deletingSessionId); setDeletingSessionId(null); }}
            onClose={() => setDeletingSessionId(null)}
          />
       )}

       {showDeleteCase && (
          <ConfirmDialog
            title="Hapus Bible Study?"
            message={`Seluruh riwayat BS untuk ${bs.personName} akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.`}
            onConfirm={async () => { await deleteBsCase(id); navigateTo('bs'); }}
            onClose={() => setShowDeleteCase(false)}
          />
       )}
    </div>
  );
}

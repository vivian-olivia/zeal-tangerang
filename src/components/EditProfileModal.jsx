import React, { useContext, useState } from 'react';
import { X } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function EditProfileModal({ member, isStatusVisible, onClose }) {
  const { updateMember, showToast, LOVE_LANGUAGES, SERVICE_OPTIONS } = useContext(AppContext);

  const [form, setForm] = useState({
    name: member.name,
    phone: member.phone || '',
    gender: member.gender || 'L',
    loveLang: member.loveLang || 'Unknown',
    status: member.status,
    bday: member.bday || '',
    spiritualBday: member.spiritualBday || '',
    service: member.service || [],
    hasEducation: !!member.education,
    education: member.education || { univ: '', jurusan: '', angkatan: '', eduStatus: 'Aktif', graduationYear: '' },
    hasJob: !!member.job,
    job: member.job || { role: '', company: '' },
  });

  const toggleService = (s) => setForm(prev => ({
    ...prev,
    service: prev.service.includes(s) ? prev.service.filter(x => x !== s) : [...prev.service, s],
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...member,
      name: form.name,
      phone: form.phone,
      gender: form.gender,
      loveLang: form.loveLang,
      bday: form.bday || null,
      spiritualBday: form.spiritualBday || null,
      service: form.service,
      status: isStatusVisible ? form.status : member.status,
      education: form.hasEducation ? {
        univ: form.education.univ,
        jurusan: form.education.jurusan,
        angkatan: form.education.angkatan ? Number(form.education.angkatan) : null,
        eduStatus: form.education.eduStatus,
        graduationYear: form.education.eduStatus === 'Lulus' && form.education.graduationYear ? Number(form.education.graduationYear) : null,
      } : null,
      job: form.hasJob ? { role: form.job.role, company: form.job.company } : null,
    };
    updateMember(updated);
    showToast('Profil berhasil diperbarui!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar animate-fade-in-up">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Edit Profil</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
              <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">No. WhatsApp</label>
              <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Jenis Kelamin</label>
              <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer text-slate-800 dark:text-slate-200">
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Love Language</label>
              <select value={form.loveLang} onChange={e => setForm({ ...form, loveLang: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer text-slate-800 dark:text-slate-200">
                {Object.keys(LOVE_LANGUAGES).map(ll => <option key={ll} value={ll}>{ll}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tanggal Lahir</label>
              <input type="date" value={form.bday} onChange={e => setForm({ ...form, bday: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Ulang Tahun Rohani</label>
              <input type="date" value={form.spiritualBday} onChange={e => setForm({ ...form, spiritualBday: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
            </div>
          </div>

          {isStatusVisible && (
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Status Rohani</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer text-slate-800 dark:text-slate-200">
                <option value="Strong">Strong</option>
                <option value="Concern">Concern</option>
                <option value="Weak">Weak</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Pelayanan</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SERVICE_OPTIONS.map(s => (
                <label key={s} className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border-2 transition-all ${form.service.includes(s) ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}>
                  <input type="checkbox" checked={form.service.includes(s)} onChange={() => toggleService(s)} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input type="checkbox" checked={form.hasEducation} onChange={e => setForm({ ...form, hasEducation: e.target.checked })} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Sedang / Pernah Kuliah</span>
            </label>
            {form.hasEducation && (
              <div className="space-y-4 pl-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Universitas</label>
                    <input type="text" value={form.education.univ} onChange={e => setForm({ ...form, education: { ...form.education, univ: e.target.value } })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Jurusan</label>
                    <input type="text" value={form.education.jurusan} onChange={e => setForm({ ...form, education: { ...form.education, jurusan: e.target.value } })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Angkatan</label>
                    <input type="number" value={form.education.angkatan} onChange={e => setForm({ ...form, education: { ...form.education, angkatan: e.target.value } })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Status Kuliah</label>
                    <select value={form.education.eduStatus} onChange={e => setForm({ ...form, education: { ...form.education, eduStatus: e.target.value } })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer text-slate-800 dark:text-slate-200">
                      <option value="Aktif">Masih Aktif</option>
                      <option value="Lulus">Sudah Lulus</option>
                    </select>
                  </div>
                  {form.education.eduStatus === 'Lulus' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Tahun Lulus</label>
                      <input type="number" value={form.education.graduationYear || ''} onChange={e => setForm({ ...form, education: { ...form.education, graduationYear: e.target.value } })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input type="checkbox" checked={form.hasJob} onChange={e => setForm({ ...form, hasJob: e.target.checked })} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Sedang Bekerja</span>
            </label>
            {form.hasJob && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-1">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Pekerjaan</label>
                  <input type="text" value={form.job.role} onChange={e => setForm({ ...form, job: { ...form.job, role: e.target.value } })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Tempat Kerja</label>
                  <input type="text" value={form.job.company} onChange={e => setForm({ ...form, job: { ...form.job, company: e.target.value } })} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200" />
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">Batal</button>
            <button type="submit" className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:bg-indigo-700">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

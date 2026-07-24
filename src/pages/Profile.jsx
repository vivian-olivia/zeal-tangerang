import React, { useContext, useState } from 'react';
import { ChevronLeft, Heart, GraduationCap, Briefcase, Edit3 } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import { getLifeStatusLabel } from '../data/mockData.js';
import EditProfileModal from '../components/EditProfileModal.jsx';

export default function Profile({ id }) {
  const { members, navigateTo, activeUser, GROUPS, LOVE_LANGUAGES, GENDER_COLORS, LIFE_STATUS_COLORS } = useContext(AppContext);
  const member = members.find(m => m.id === id);
  const [showEdit, setShowEdit] = useState(false);

  if (!member) return <div className="p-10 text-center font-bold text-slate-400 text-xl">Member not found</div>;

  const bimber = members.find(m => m.id === member.mentorId);
  const binaan = members.filter(m => m.mentorId === member.id);

  // Status check: Super Admin or upwards hierarchy can view. Cannot view own status unless super_admin.
  const canViewStatus = (viewer, target) => {
    if (viewer.role === 'super_admin') return true;
    if (viewer.id === target.id) return false;
    let curr = target;
    while (curr && curr.mentorId) {
      if (curr.mentorId === viewer.id) return true;
      curr = members.find(m => m.id === curr.mentorId);
    }
    return false;
  };

  const isStatusVisible = canViewStatus(activeUser, member);
  const canEdit = activeUser.id === member.id || activeUser.role === 'super_admin';
  const llColor = LOVE_LANGUAGES[member.loveLang] || LOVE_LANGUAGES['Unknown'];
  const genderColor = GENDER_COLORS[member.gender] || 'bg-slate-300';
  const lifeStatus = getLifeStatusLabel(member);
  const lifeStatusColor = LIFE_STATUS_COLORS[lifeStatus] || LIFE_STATUS_COLORS.Lainnya;

  return (
    <div className="p-5 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigateTo('members')} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-colors">
          <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg"><ChevronLeft size={20} /></div> Kembali
        </button>
        {canEdit && (
          <button onClick={() => setShowEdit(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 dark:shadow-indigo-950 transition-all">
            <Edit3 size={16}/> Edit Profil
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden relative">
             <div className={`h-3 w-full ${genderColor}`}></div>
             <div className="p-8 text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-4xl font-black text-slate-300 dark:text-slate-600 mb-6 shadow-inner border-4 border-white dark:border-slate-900">
                  {member.name.charAt(0)}
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{member.name}</h1>
                <div className="font-bold text-slate-500 dark:text-slate-400 mt-2">{GROUPS.find(g => g.id === member.group)?.name}</div>

                <div className="mt-8 text-left space-y-5 border-t border-slate-100 dark:border-slate-800 pt-8">
                  {isStatusVisible && (
                    <div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Status Rohani</div>
                      <div className="font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 inline-block px-3 py-1.5 rounded-lg">{member.status}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Love Language</div>
                    <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3 bg-slate-50 dark:bg-slate-800 inline-block px-3 py-1.5 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${llColor} inline-block`}></div> {member.loveLang || '-'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Tanggal Lahir</div>
                      <div className="font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-sm">
                        {member.bday ? new Date(member.bday).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Ultah Rohani</div>
                      <div className="font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-lg text-sm">
                        {member.spiritualBday ? new Date(member.spiritualBday).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                      </div>
                    </div>
                  </div>
                  {member.service && member.service.length > 0 && (
                    <div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Pelayanan</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {member.service.map(s => (
                           <span key={s} className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                     <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">WhatsApp</div>
                     <div className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 inline-block px-3 py-1.5 rounded-lg">{member.phone || '-'}</div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
               <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
                 {member.job ? <Briefcase size={20}/> : <GraduationCap size={20}/>}
               </div>
               Kesibukan Saat Ini
            </h2>

            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border mb-6 ${lifeStatusColor}`}>
              {lifeStatus}
            </span>

            {!member.education && !member.job && (
              <p className="text-slate-400 dark:text-slate-500 italic font-medium">Belum ada informasi tambahan.</p>
            )}

            {member.education && (
              <div className={member.job ? 'mb-6 pb-6 border-b border-slate-100 dark:border-slate-800' : ''}>
                <div className="text-xs font-black text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-3">Pendidikan</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Universitas</div>
                    <div className="font-bold text-slate-800 dark:text-slate-100">{member.education.univ}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Jurusan</div>
                    <div className="font-bold text-slate-800 dark:text-slate-100">{member.education.jurusan}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Angkatan</div>
                    <div className="font-bold text-slate-800 dark:text-slate-100">{member.education.angkatan}</div>
                  </div>
                </div>
                <div className="mt-4">
                  {member.education.eduStatus === 'Lulus' ? (
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
                      Lulus {member.education.graduationYear || ''}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                      Masih Kuliah
                    </span>
                  )}
                </div>
              </div>
            )}

            {member.job && (
              <div>
                <div className="text-xs font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-wider mb-3">Pekerjaan</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Pekerjaan</div>
                    <div className="font-bold text-slate-800 dark:text-slate-100">{member.job.role}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Tempat Kerja</div>
                    <div className="font-bold text-slate-800 dark:text-slate-100">{member.job.company}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
               <div className="p-2 bg-rose-100 dark:bg-rose-500/20 text-rose-500 dark:text-rose-400 rounded-xl"><Heart size={20}/></div>
               D-Tree Family
            </h2>

            <div className="mb-8">
              <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-4">DIBIMBING OLEH</div>
              {bimber ? (
                <div
                  onClick={() => navigateTo('profile_' + bimber.id)}
                  className="inline-flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-2.5 pr-6 rounded-2xl cursor-pointer hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all border border-slate-100 dark:border-slate-700"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center font-black text-slate-400 dark:text-slate-500 text-sm">{bimber.name.charAt(0)}</div>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{bimber.name}</span>
                </div>
              ) : <span className="text-slate-400 dark:text-slate-500 italic font-medium bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">Tidak ada</span>}
            </div>

            <div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-4">MEMBIMBING ({binaan.length})</div>
              {binaan.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {binaan.map(b => (
                    <div
                      key={b.id}
                      onClick={() => navigateTo('profile_' + b.id)}
                      className="inline-flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2 pr-5 rounded-2xl cursor-pointer hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all border border-slate-100 dark:border-slate-700"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs">{b.name.charAt(0)}</div>
                      <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{b.name}</span>
                    </div>
                  ))}
                </div>
              ) : <span className="text-slate-400 dark:text-slate-500 italic font-medium bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">Belum ada binaan</span>}
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditProfileModal member={member} isStatusVisible={isStatusVisible} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
}

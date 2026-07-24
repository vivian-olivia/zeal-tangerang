import React, { useContext } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

export default function Profile({ id }) {
  const { members, navigateTo, activeUser, GROUPS, LOVE_LANGUAGES } = useContext(AppContext);
  const member = members.find(m => m.id === id);

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
  const llColor = LOVE_LANGUAGES[member.loveLang] || LOVE_LANGUAGES['Unknown'];

  return (
    <div className="p-5 md:p-10">
      <button onClick={() => navigateTo('members')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-bold transition-colors">
        <div className="p-1.5 bg-slate-100 rounded-lg"><ChevronLeft size={20} /></div> Kembali
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
             <div className={`h-3 w-full ${llColor}`}></div>
             <div className="p-8 text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-4xl font-black text-slate-300 mb-6 shadow-inner border-4 border-white">
                  {member.name.charAt(0)}
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900">{member.name}</h1>
                <div className="font-bold text-slate-500 mt-2">{GROUPS.find(g => g.id === member.group)?.name}</div>

                <div className="mt-8 text-left space-y-5 border-t border-slate-100 pt-8">
                  {isStatusVisible && (
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Status Rohani</div>
                      <div className="font-bold text-slate-800 bg-slate-50 inline-block px-3 py-1.5 rounded-lg">{member.status}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Love Language</div>
                    <div className="font-bold text-slate-800 flex items-center gap-3 bg-slate-50 inline-block px-3 py-1.5 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${llColor} inline-block`}></div> {member.loveLang || '-'}
                    </div>
                  </div>
                  {member.service && member.service.length > 0 && (
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Pelayanan</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {member.service.map(s => (
                           <span key={s} className="font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                     <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">WhatsApp</div>
                     <div className="font-bold text-indigo-600 bg-indigo-50 inline-block px-3 py-1.5 rounded-lg">{member.phone || '-'}</div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-extrabold text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
               <div className="p-2 bg-rose-100 text-rose-500 rounded-xl"><Heart size={20}/></div>
               D-Tree Family
            </h2>

            <div className="mb-8">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">DIBIMBING OLEH</div>
              {bimber ? (
                <div
                  onClick={() => navigateTo('profile_' + bimber.id)}
                  className="inline-flex items-center gap-4 bg-slate-50 p-2.5 pr-6 rounded-2xl cursor-pointer hover:bg-white hover:shadow-md transition-all border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-slate-400 text-sm">{bimber.name.charAt(0)}</div>
                  <span className="font-bold text-slate-800">{bimber.name}</span>
                </div>
              ) : <span className="text-slate-400 italic font-medium bg-slate-50 px-4 py-2 rounded-xl">Tidak ada</span>}
            </div>

            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">MEMBIMBING ({binaan.length})</div>
              {binaan.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {binaan.map(b => (
                    <div
                      key={b.id}
                      onClick={() => navigateTo('profile_' + b.id)}
                      className="inline-flex items-center gap-3 bg-slate-50 p-2 pr-5 rounded-2xl cursor-pointer hover:bg-white hover:shadow-md transition-all border border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white shadow-sm text-indigo-600 flex items-center justify-center font-black text-xs">{b.name.charAt(0)}</div>
                      <span className="font-bold text-slate-800 text-sm">{b.name}</span>
                    </div>
                  ))}
                </div>
              ) : <span className="text-slate-400 italic font-medium bg-slate-50 px-4 py-2 rounded-xl">Belum ada binaan</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

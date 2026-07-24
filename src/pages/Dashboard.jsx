import React, { useContext } from 'react';
import { Users, Activity, CheckCircle, BookOpen, Sparkles, BookOpen as BookOpenIcon, UserPlus, CheckSquare, Cake } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import StatCard from '../components/StatCard.jsx';

export default function Dashboard() {
  const { activeUser, members, navigateTo } = useContext(AppContext);
  const today = new Date();
  const currentMonth = today.getMonth();
  const todayDate = today.getDate();

  const bdaysThisMonth = members
    .filter(m => m.bday && new Date(m.bday).getMonth() === currentMonth)
    .map(m => {
      const day = new Date(m.bday).getDate();
      return { ...m, bdayDay: day, isToday: day === todayDate, isPast: day < todayDate };
    })
    .sort((a, b) => a.bdayDay - b.bdayDay);

  return (
    <div className="p-5 md:p-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            Halo, {activeUser.name.split(' ')[0]}! <span className="text-4xl inline-block animate-wave">👋</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Satu komunitas, satu keluarga.</p>
        </div>
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Sparkles size={16} />
          {activeUser.role === 'super_admin' ? 'Super Admin' : activeUser.role === 'leader' ? 'Leader' : 'Member'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Anggota" value={members.length} icon={Users} type="indigo" />
        <StatCard title="Kehadiran Aktivitas" value="85%" icon={Activity} type="teal" />
        <StatCard title="Hadir Ibadah" value="24/30" icon={CheckCircle} type="amber" />
        <StatCard title="Sesi BS Aktif" value="7" icon={BookOpen} type="rose" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl"><Activity size={20}/></div>
                Aktivitas Terbaru
              </h2>
              <button onClick={() => navigateTo('aktivitas')} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-full transition-colors">Lihat Semua</button>
            </div>
            <div className="space-y-4">
              {[
                { text: 'Sesi BS ditambahkan untuk Budi Santoso', time: '2 jam lalu', icon: BookOpenIcon, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
                { text: 'Kehadiran PDG Gabungan diinput', time: 'Kemarin', icon: CheckSquare, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
                { text: 'Anggota baru bergabung: Vionika', time: '2 hari lalu', icon: UserPlus, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
              ].map((act, i) => (
                <div key={i} onClick={() => navigateTo('aktivitas')} className="flex items-center gap-5 p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 border border-slate-100 dark:border-slate-700 rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${act.color}`}>
                    <act.icon size={20} />
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-slate-100 font-bold">{act.text}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-3xl shadow-sm border border-amber-100 dark:border-amber-900/50 p-8">
            <h2 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-6 flex items-center gap-3">
              <div className="p-2 bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-xl"><Cake size={20} /></div>
              Ulang Tahun
            </h2>
            {bdaysThisMonth.length > 0 ? (
              <div className="space-y-4">
                {bdaysThisMonth.map(m => (
                  <div key={m.id} onClick={() => navigateTo('profile_' + m.id)} className={`flex items-center gap-4 cursor-pointer p-3 rounded-2xl transition-all shadow-sm border ${m.isPast ? 'bg-white/30 dark:bg-slate-800/20 border-amber-200/30 dark:border-amber-900/20 opacity-60 hover:opacity-100' : 'bg-white/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 border-amber-200/50 dark:border-amber-900/40'}`}>
                    <div className={`w-12 h-12 rounded-2xl text-white font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-inner ${m.isPast ? 'bg-slate-300 dark:bg-slate-700' : 'bg-gradient-to-br from-amber-300 to-orange-400'}`}>
                      {m.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 dark:text-slate-100">{m.name.split(' ')[0]}</div>
                      <div className="text-sm font-medium text-amber-700 dark:text-amber-400">{new Date(m.bday).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</div>
                    </div>
                    {m.isToday ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-sm whitespace-nowrap">Hari ini! 🎉</span>
                    ) : m.isPast ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 whitespace-nowrap">Sudah lewat</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 whitespace-nowrap">{m.bdayDay - todayDate} hari lagi</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-white/50 dark:bg-slate-800/30 rounded-2xl border border-amber-200/50 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 font-medium">Tidak ada ulang tahun bulan ini.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

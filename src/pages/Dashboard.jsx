import React, { useContext } from 'react';
import { Users, Activity, CheckCircle, BookOpen, Sparkles, Cake, HeartHandshake, CalendarClock, Heart } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import StatCard from '../components/StatCard.jsx';
import BirthdayWidget from '../components/BirthdayWidget.jsx';

export default function Dashboard() {
  const { activeUser, members, activities, MEETING_TYPE_STYLES, navigateTo, setPertemuanView } = useContext(AppContext);

  const todayStr = new Date().toISOString().split('T')[0];
  const today = new Date();

  const upcomingEvents = activities
    .filter(a => a.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)
    .map(a => {
      const diffDays = Math.round((new Date(a.date) - today) / 86400000);
      const label = diffDays <= 0 ? 'Hari ini' : diffDays === 1 ? 'Besok' : `${diffDays} hari lagi`;
      const style = MEETING_TYPE_STYLES[a.type] || MEETING_TYPE_STYLES.Lainnya;
      const icon = a.type === 'Ibadah Minggu' ? Heart : Activity;
      return { key: 'act_' + a.id, title: a.title, type: a.type, date: a.date, icon, color: style.iconBg, page: 'activity_detail_' + a.id, label };
    });

  const goToKalender = () => { setPertemuanView('kalender'); navigateTo('pertemuan'); };

  return (
    <div className="p-5 md:p-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            Halo, {activeUser.name.split(' ')[0]}! <span className="text-4xl inline-block animate-wave">👋</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">We gather to know God and make God known</p>
        </div>
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Sparkles size={16} />
          {activeUser.role === 'super_admin' ? 'Super Admin' : activeUser.role === 'leader' ? 'Leader' : activeUser.role === 'guest' ? 'Mode Tamu' : 'Member'}
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
                <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl"><CalendarClock size={20}/></div>
                Acara Mendatang
              </h2>
              <button onClick={goToKalender} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-full transition-colors">Lihat Kalender</button>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map(e => (
                  <div key={e.key} onClick={() => navigateTo(e.page)} className="flex items-center gap-5 p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 border border-slate-100 dark:border-slate-700 rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                    <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${e.color}`}>
                      <e.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 dark:text-slate-100 font-bold truncate">{e.title}</p>
                      <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-1 truncate">{new Date(e.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })} • {e.type}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 whitespace-nowrap">{e.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-white/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/40 text-slate-500 dark:text-slate-400 font-medium">Tidak ada acara mendatang.</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <BirthdayWidget title="Ulang Tahun" icon={Cake} theme="amber" dateField="bday" emptyText="Tidak ada ulang tahun bulan ini." />
          <BirthdayWidget title="Ulang Tahun Rohani" icon={HeartHandshake} theme="rose" dateField="spiritualBday" emptyText="Tidak ada ulang tahun rohani bulan ini." />
        </div>
      </div>
    </div>
  );
}

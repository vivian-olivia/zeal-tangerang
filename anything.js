import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  Users, BookOpen, Calendar, MapPin, Search, Plus, ChevronLeft, Menu, X, 
  Cake, CheckCircle, Clock, Settings, LogOut, Home, UserPlus, ChevronDown, 
  ChevronRight, Trash2, Edit3, Shield, Mail, ExternalLink, BarChart2, MoreVertical,
  Activity, CheckSquare, FileText, AlertCircle, Filter, Heart, Sparkles, Zap
} from 'lucide-react';

const GROUPS = [
  { id: 'CT', name: 'Core Team', color: 'bg-slate-800' },
  { id: 'RK', name: 'Raymond-Kezia', color: 'bg-red-500' },
  { id: 'MP', name: 'Michael-Putri', color: 'bg-teal-500' },
  { id: 'VY', name: 'Vincent-Yolly', color: 'bg-blue-500' },
  { id: 'AS', name: 'Abraham-Shira', color: 'bg-rose-500' },
  { id: 'JC', name: 'Jeffrey-Chelsea', color: 'bg-violet-500' },
  { id: 'JR', name: 'Jingga-Rosy', color: 'bg-cyan-500' }
];

const LOVE_LANGUAGES = {
  'Words of Affirmation': 'bg-indigo-500',
  'Acts of Service': 'bg-teal-500',
  'Receiving Gifts': 'bg-amber-500',
  'Quality Time': 'bg-rose-500',
  'Physical Touch': 'bg-violet-500',
  'Unknown': 'bg-gray-300'
};

const MOCK_MEMBERS = [
  { id: 1, name: 'Christian Jingga', role: 'super_admin', group: 'JR', status: 'Strong', loveLang: 'Quality Time', bday: '1995-05-15', mentorId: null, phone: '08123456789', service: ['Songmin', 'Multimedia'] },
  { id: 2, name: 'Raymond', role: 'leader', group: 'RK', status: 'Strong', loveLang: 'Acts of Service', bday: '1996-08-20', mentorId: 1, phone: '08123456780', service: ['Ushers'] },
  { id: 4, name: 'Vincent', role: 'leader', group: 'VY', status: 'Strong', loveLang: 'Quality Time', bday: '1997-12-05', mentorId: 1, phone: '08123456782', service: ['Multimedia'] },
  { id: 6, name: 'Michael Anggriawan', role: 'leader', group: 'MP', status: 'Strong', loveLang: 'Receiving Gifts', bday: '1998-11-12', mentorId: 1, phone: '08123456784', service: ['Multimedia'] },
  { id: 18, name: 'Abraham Newton', role: 'leader', group: 'AS', status: 'Strong', loveLang: 'Acts of Service', bday: '1996-03-14', mentorId: 1, phone: '08123456786', service: ['KKK'] },
  { id: 22, name: 'Jeffrey Adriel', role: 'leader', group: 'JC', status: 'Strong', loveLang: 'Quality Time', bday: '1997-09-22', mentorId: 1, phone: '08123456787', service: [] },
  { id: 3, name: 'Kezia Natalie', role: 'member', group: 'RK', status: 'Strong', loveLang: 'Words of Affirmation', bday: new Date().toISOString().split('T')[0], mentorId: 2, phone: '08123456781', service: ['Ushers', 'Songmin'] }, 
  { id: 5, name: 'Yolly Pratiwi', role: 'member', group: 'VY', status: 'Strong', loveLang: 'Acts of Service', bday: '1999-07-03', mentorId: 4, phone: '08123456783', service: ['Social Media'] },
  { id: 7, name: 'Vionika Clementia', role: 'member', group: 'VY', status: 'Strong', loveLang: 'Quality Time', bday: '2000-02-28', mentorId: 5, phone: '08123456785', service: ['Multimedia'] },
  { id: 8, name: 'Rosy Lie', role: 'member', group: 'JR', status: 'Strong', loveLang: 'Acts of Service', bday: '1998-01-15', mentorId: 1, phone: '08111111111', service: ['Ushers'] },
  { id: 9, name: 'Mega Putri', role: 'member', group: 'MP', status: 'Strong', loveLang: 'Receiving Gifts', bday: '2001-04-12', mentorId: 6, phone: '08111111112', service: ['Social Media'] },
  { id: 10, name: 'Chelsea Wang', role: 'member', group: 'JC', status: 'Strong', loveLang: 'Quality Time', bday: '2002-09-30', mentorId: 22, phone: '08111111113', service: ['Ushers'] },
  { id: 11, name: 'Shira', role: 'member', group: 'AS', status: 'Strong', loveLang: 'Words of Affirmation', bday: '2003-11-20', mentorId: 18, phone: '08111111114', service: ['Songmin'] },
  { id: 12, name: 'Jafferson', role: 'member', group: 'RK', status: 'Concern', loveLang: 'Unknown', bday: '2000-06-10', mentorId: 2, phone: '08222222221', service: [] },
  { id: 13, name: 'William Natan', role: 'member', group: 'RK', status: 'Concern', loveLang: 'Unknown', bday: '2001-08-05', mentorId: 2, phone: '08222222222', service: [] },
  { id: 14, name: 'Misael Sinaga', role: 'member', group: 'VY', status: 'Weak', loveLang: 'Words of Affirmation', bday: '1999-12-12', mentorId: 4, phone: '08222222223', service: [] },
];

const MOCK_ACTIVITIES = [
  { id: 1, title: 'PDG Gabungan', type: 'PDG', date: '2024-06-15', groups: ['RK', 'VY', 'MP'], attendance: { 2: { status: 'Hadir', reason: '' }, 3: { status: 'Hadir', reason: '' }, 4: { status: 'Izin', reason: 'Kerja' } } },
  { id: 2, title: 'Bible Talk Spesial', type: 'Fellowship', date: '2024-06-20', groups: ['AS', 'JC', 'JR'], attendance: {} },
  { id: 3, title: 'Retreat Youth', type: 'Lainnya', date: '2024-07-01', groups: ['CT', 'RK', 'MP', 'VY', 'AS', 'JC', 'JR'], attendance: {} }
];

const MOCK_IBADAH = [
  { id: 1, date: '2024-06-16', session: 'Pagi', attendance: { 1: { status: 'Hadir' }, 2: { status: 'Hadir' }, 12: { status: 'Alfa' } } },
  { id: 2, date: '2024-06-23', session: 'Sore', attendance: {} },
  { id: 3, date: '2024-06-30', session: 'Pagi', attendance: {} }
];

const MOCK_BS = [
  { 
    id: 1, personName: 'Budi Santoso', teacherId: 1, status: 'Aktif', 
    sessions: [
      { id: 101, date: '2024-06-10', location: 'Starbucks', material: 1, topic: 'Keselamatan', sitIn: [2, 3], issue: 'Masih ragu tentang anugerah', actions: 'Ajak ngobrol personal minggu depan', notes: 'Sesi berjalan lancar, Budi banyak bertanya.' }
    ] 
  },
  { 
    id: 2, personName: 'Jessica Lin', teacherId: 3, status: 'Aktif', 
    sessions: [
      { id: 102, date: '2024-06-12', location: 'Zoom', material: 2, topic: 'Firman Tuhan', sitIn: [4], issue: 'Susah cari waktu', actions: 'Buat plan baca', notes: 'Materi selesai dibahas.' }
    ] 
  },
  { 
    id: 3, personName: 'Hendra Lim', teacherId: 6, status: 'Selesai', 
    sessions: [
      { id: 103, date: '2024-05-20', location: 'Gereja', material: 12, topic: 'Gereja Lokal', sitIn: [9], issue: '', actions: 'Ajak gabung PDG', notes: 'Selesai seluruh seri BS.' }
    ] 
  }
];

const AppContext = createContext();

export default function App() {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [ibadah, setIbadah] = useState(MOCK_IBADAH);
  const [bsCases, setBsCases] = useState(MOCK_BS);
  
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeUser, setActiveUser] = useState(MOCK_MEMBERS[0]); 
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const contextValue = {
    members, setMembers, GROUPS, LOVE_LANGUAGES,
    activities, setActivities,
    ibadah, setIbadah,
    bsCases, setBsCases,
    currentPage, setCurrentPage,
    activeUser, setActiveUser,
    showToast
  };

  // Helper for hash routing within components
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash) {
        setCurrentPage(hash.replace('/', '_'));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Check if there is an active hash when the app first loads
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    // 1. Langsung ganti state UI (mencegah kedipan)
    setCurrentPage(page);
    
    // 2. Gunakan pushState untuk mengganti URL secara diam-diam
    // Ini mencegah browser mobile melakukan "Force Reload" yang me-reset app kembali ke Home.
    try {
      window.history.pushState(null, '', `/#/${page.replace('_', '/')}`);
    } catch (e) {
      // Abaikan jika browser strict/iframe memblokir penggantian URL
    }
  };

  return (
    <AppContext.Provider value={{...contextValue, navigateTo}}>
      <div className="flex flex-col md:flex-row h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden relative">
        {/* Decorative background blur elements for youthful feel */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>

        <MobileTopBar />
        <Sidebar />
        
        {/* Added pb-24 for mobile to avoid content being hidden under the BottomNav */}
        <main className="flex-1 overflow-y-auto relative z-10 scroll-smooth custom-scrollbar pb-24 md:pb-0">
          <div className="max-w-7xl mx-auto">
             <PageRouter />
          </div>
          {toast && (
            <div className={`fixed bottom-24 md:bottom-8 right-4 md:right-8 px-6 py-4 rounded-2xl shadow-2xl text-white font-semibold flex items-center gap-3 z-50 transform transition-all animate-bounce-short ${toast.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-red-500'}`}>
              {toast.type === 'success' ? <CheckCircle size={20}/> : <AlertCircle size={20}/>}
              {toast.msg}
            </div>
          )}
        </main>
        
        <BottomNav />
      </div>
    </AppContext.Provider>
  );
}

function MobileTopBar() {
  const { activeUser, setActiveUser, members } = useContext(AppContext);
  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 z-20 sticky top-0 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 transform -rotate-6">
          <Zap size={16} className="rotate-6" />
        </div>
        <span className="font-bold text-xl text-slate-900 tracking-tight leading-none">Zeal</span>
      </div>
      <div className="relative">
        <select 
          value={activeUser.id} 
          onChange={(e) => setActiveUser(members.find(m => m.id === parseInt(e.target.value)))}
          className="bg-slate-100 border border-slate-200 rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer"
        >
          {members.filter(m => m.role === 'super_admin' || m.role === 'leader' || m.id === 3).map(m => (
            <option key={m.id} value={m.id}>
              {m.name.split(' ')[0]} ({m.role === 'super_admin' ? 'SA' : m.role === 'leader' ? 'L' : 'M'})
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function BottomNav() {
  const { currentPage, navigateTo } = useContext(AppContext);
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'members', label: 'Disciples', icon: Users },
    { id: 'dtree', label: 'D-Tree', icon: Activity },
    { id: 'aktivitas', label: 'Aktivitas', icon: Calendar },
    { id: 'ibadah', label: 'Ibadah', icon: Heart },
    { id: 'bs', label: 'BS', icon: BookOpen },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 z-50 flex justify-around items-center px-1 pb-4 pt-1 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentPage === item.id || currentPage.startsWith(item.id + '_');
        return (
          <button 
            key={item.id} 
            type="button"
            onClick={(e) => {
              e.preventDefault(); // Mencegah klik tembus atau diartikan sebagai submit form
              navigateTo(item.id);
            }}
            className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-100/80 scale-110' : 'bg-transparent'}`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[9px] mt-0.5 transition-all ${isActive ? 'font-extrabold' : 'font-semibold'}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Sidebar() {
  const { currentPage, navigateTo, activeUser, setActiveUser, members } = useContext(AppContext);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'members', label: 'Disciples', icon: Users },
    { id: 'dtree', label: 'D-Tree', icon: Activity },
    { id: 'aktivitas', label: 'Aktivitas', icon: Calendar },
    { id: 'ibadah', label: 'Ibadah', icon: Heart },
    { id: 'bs', label: 'Bible Study', icon: BookOpen },
  ];

  return (
    <nav className="w-72 bg-white/70 backdrop-blur-xl border-r border-slate-200/60 flex flex-col justify-between z-20 hidden md:flex shadow-sm">
      <div>
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 transform -rotate-6">
              <Zap size={22} className="rotate-6" />
            </div>
            <div>
              <span className="font-bold text-2xl text-slate-900 tracking-tight block leading-none">Zeal</span>
              <span className="text-sm font-medium text-indigo-600 tracking-wider uppercase">Tangerang</span>
            </div>
          </div>
        </div>
        <div className="px-6 space-y-1.5 mt-6">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || currentPage.startsWith(item.id + '_');
            return (
              <button 
                key={item.id} 
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  isActive 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-semibold translate-x-1' 
                  : 'text-slate-500 hover:bg-white hover:shadow-sm hover:text-indigo-600 font-medium'
                }`}
              >
                <Icon size={22} className={isActive ? 'text-white' : ''} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-3xl border border-indigo-100/50 shadow-sm">
          <div className="text-xs text-indigo-800/60 font-bold uppercase tracking-wider mb-3 px-1">Ganti Role Simulasi:</div>
          <div className="relative">
            <select 
              value={activeUser.id} 
              onChange={(e) => setActiveUser(members.find(m => m.id === parseInt(e.target.value)))}
              className="w-full bg-white/80 backdrop-blur border border-indigo-100 rounded-xl p-3 pl-4 pr-10 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer shadow-sm"
            >
              {members.filter(m => m.role === 'super_admin' || m.role === 'leader' || m.id === 3).map(m => (
                <option key={m.id} value={m.id}>
                  {m.name.split(' ')[0]} ({m.role})
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-3.5 text-indigo-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function PageRouter() {
  const { currentPage } = useContext(AppContext);

  if (currentPage === 'dashboard') return <Dashboard />;
  if (currentPage === 'members') return <Directory />;
  if (currentPage.startsWith('profile_')) return <Profile id={parseInt(currentPage.split('_')[1])} />;
  if (currentPage === 'dtree') return <DTree />;
  if (currentPage === 'aktivitas') return <Aktivitas />;
  if (currentPage.startsWith('activity_detail_')) return <ActivityDetail id={parseInt(currentPage.split('_')[2])} />;
  if (currentPage === 'ibadah') return <Ibadah />;
  if (currentPage.startsWith('ibadah_detail_')) return <IbadahDetail id={parseInt(currentPage.split('_')[2])} />;
  if (currentPage === 'bs') return <BibleStudy />;
  if (currentPage.startsWith('bs_detail_')) return <BSDetail id={parseInt(currentPage.split('_')[2])} />;

  return <div className="p-12 text-center text-slate-400 font-medium text-lg">Halaman tidak ditemukan.</div>;
}

function Dashboard() {
  const { activeUser, members, navigateTo } = useContext(AppContext);
  const currentMonth = new Date().getMonth();
  
  const bdaysThisMonth = members.filter(m => {
    if(!m.bday) return false;
    return new Date(m.bday).getMonth() === currentMonth;
  });

  return (
    <div className="p-5 md:p-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            Halo, {activeUser.name.split(' ')[0]}! <span className="text-4xl inline-block animate-wave">👋</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg font-medium">Satu komunitas, satu keluarga.</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/50 shadow-sm text-sm font-bold text-indigo-600 flex items-center gap-2">
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
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-slate-100 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl"><Activity size={20}/></div>
                Aktivitas Terbaru
              </h2>
              <button onClick={() => navigateTo('aktivitas')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-full transition-colors">Lihat Semua</button>
            </div>
            <div className="space-y-4">
              {[
                { text: "Sesi BS ditambahkan untuk Budi Santoso", time: "2 jam lalu", icon: BookOpen, color: "text-blue-500 bg-blue-50" },
                { text: "Kehadiran PDG Gabungan diinput", time: "Kemarin", icon: CheckSquare, color: "text-emerald-500 bg-emerald-50" },
                { text: "Anggota baru bergabung: Vionika", time: "2 hari lalu", icon: UserPlus, color: "text-indigo-500 bg-indigo-50" }
              ].map((act, i) => (
                <div key={i} onClick={() => navigateTo('aktivitas')} className="flex items-center gap-5 p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${act.color}`}>
                    <act.icon size={20} />
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold">{act.text}</p>
                    <p className="text-slate-400 text-sm font-medium mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-sm border border-amber-100 p-8">
            <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-amber-200 text-amber-700 rounded-xl"><Cake size={20} /></div>
              Ulang Tahun 
            </h2>
            {bdaysThisMonth.length > 0 ? (
              <div className="space-y-4">
                {bdaysThisMonth.map(m => (
                  <div key={m.id} onClick={() => navigateTo('profile_'+m.id)} className="flex items-center gap-4 cursor-pointer bg-white/60 hover:bg-white p-3 rounded-2xl transition-all shadow-sm border border-amber-200/50">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 text-white font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-inner">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{m.name.split(' ')[0]}</div>
                      <div className="text-sm font-medium text-amber-700">{new Date(m.bday).toLocaleDateString('id-ID', {day:'numeric', month:'long'})}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-white/50 rounded-2xl border border-amber-200/50 text-amber-800 font-medium">Tidak ada ulang tahun bulan ini.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, type }) {
  const styles = {
    indigo: 'from-indigo-500 to-blue-600 shadow-indigo-200',
    amber: 'from-amber-400 to-orange-500 shadow-amber-200',
    teal: 'from-teal-400 to-emerald-500 shadow-teal-200',
    rose: 'from-rose-400 to-pink-500 shadow-rose-200'
  };
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

function Directory() {
  const { members, activeUser, navigateTo, showToast, GROUPS, LOVE_LANGUAGES } = useContext(AppContext);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '' });
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterLL, setFilterLL] = useState('All');

  const handleInvite = (e) => {
    e.preventDefault();
    showToast(`Undangan berhasil dikirim ke ${inviteForm.email}`);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '' });
  };

  const filteredMembers = members.filter(m => {
    const matchName = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGroup = filterGroup === 'All' || m.group === filterGroup;
    const matchLL = filterLL === 'All' || m.loveLang === filterLL;
    return matchName && matchGroup && matchLL;
  }).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Disciples</h1>
          <p className="text-slate-500 font-medium mt-2">{filteredMembers.length} anggota ditemukan</p>
        </div>
        {(activeUser.role === 'super_admin' || activeUser.role === 'leader') && (
          <button 
            onClick={() => setShowInviteModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-0.5"
          >
            <Plus size={20}/> Tambah Anggota
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input 
            type="text" placeholder="Cari nama anggota..." 
            value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select value={filterGroup} onChange={e=>setFilterGroup(e.target.value)} className="bg-slate-50 px-4 py-3 rounded-2xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="All">Semua Grup</option>
            {GROUPS.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <select value={filterLL} onChange={e=>setFilterLL(e.target.value)} className="bg-slate-50 px-4 py-3 rounded-2xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="All">Semua Love Language</option>
            {Object.keys(LOVE_LANGUAGES).map(ll => ll !== 'Unknown' && <option key={ll} value={ll}>{ll}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map(m => {
          const llColor = LOVE_LANGUAGES[m.loveLang] || LOVE_LANGUAGES['Unknown'];
          const groupInfo = GROUPS.find(g => g.id === m.group);
          return (
            <div 
              key={m.id} 
              onClick={() => navigateTo('profile_' + m.id)}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`h-2.5 w-full ${llColor}`}></div>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-3xl font-black text-slate-300 mb-5 group-hover:scale-110 transition-transform duration-300 border-4 border-white shadow-md">
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">{m.name}</h3>
                <span className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm ${groupInfo?.color || 'bg-slate-500'}`}>
                  {groupInfo?.name || m.group}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900">Undang Anggota</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleInvite} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                <input required type="text" value={inviteForm.name} onChange={e => setInviteForm({...inviteForm, name: e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none" placeholder="Ketik nama lengkap..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input required type="email" value={inviteForm.email} onChange={e => setInviteForm({...inviteForm, email: e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none" placeholder="email@contoh.com" />
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 py-3.5 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">Batal</button>
                <button type="submit" className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">Kirim</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Profile({ id }) {
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
                <div className="font-bold text-slate-500 mt-2">{GROUPS.find(g=>g.id===member.group)?.name}</div>
                
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

function DTree() {
  const { members, navigateTo, LOVE_LANGUAGES } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const roots = members.filter(m => !m.mentorId);

  const TreeNode = ({ member }) => {
    const binaan = members.filter(m => m.mentorId === member.id);
    const llColor = LOVE_LANGUAGES[member.loveLang] || LOVE_LANGUAGES['Unknown'];
    const isMatched = searchTerm && member.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return (
      <div className="flex flex-col items-center relative">
        <div 
          onClick={() => navigateTo('profile_' + member.id)}
          className={`bg-white border-2 rounded-2xl shadow-sm p-4 w-44 text-center cursor-pointer transition-all relative overflow-hidden group z-10 ${isMatched ? 'border-amber-400 shadow-amber-100 shadow-lg scale-105' : 'border-transparent hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1'}`}
        >
          <div className={`absolute top-0 left-0 w-full h-1.5 ${llColor}`}></div>
          <div className="w-12 h-12 mx-auto bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-300 mb-3 border-2 border-white shadow-sm">
            {member.name.charAt(0)}
          </div>
          <div className="font-extrabold text-sm text-slate-800 truncate">{member.name.split(' ')[0]}</div>
          <div className="text-xs font-bold text-slate-400 mt-1">{member.group}</div>
        </div>
        
        {binaan.length > 0 && (
          <>
            <div className="w-0.5 h-8 bg-slate-200"></div>
            <div className="flex gap-6 pt-4 border-t-2 border-slate-200 relative">
              {binaan.map(b => (
                <div key={b.id} className="relative flex flex-col items-center">
                  <div className="absolute top-[-16px] w-0.5 h-4 bg-slate-200"></div>
                  <TreeNode member={b} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-5 md:p-10 min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
         <div>
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">D-Tree Family</h1>
           <p className="text-slate-500 font-medium mt-2">Peta silsilah pemuridan komunitas</p>
         </div>
         <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              type="text" placeholder="Cari nama..." 
              value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 font-medium outline-none"
            />
         </div>
      </div>
      <div className="overflow-auto bg-slate-100/50 p-12 rounded-3xl border border-slate-200 flex justify-center shadow-inner relative">
        <div className="flex gap-16">
          {roots.map(root => <TreeNode key={root.id} member={root} />)}
        </div>
      </div>
    </div>
  );
}

function Aktivitas() {
  const { activities, navigateTo, activeUser, GROUPS } = useContext(AppContext);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredAct = activities.filter(a => {
    return a.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
           (filterType === 'All' || a.type === filterType);
  });

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Aktivitas</h1>
        {(activeUser.role === 'super_admin' || activeUser.role === 'leader') && (
          <button onClick={() => setShowAdd(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all">
            <Plus size={20}/> Tambah Aktivitas
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input type="text" placeholder="Cari aktivitas..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={filterType} onChange={e=>setFilterType(e.target.value)} className="bg-slate-50 px-4 py-3 rounded-2xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto">
          <option value="All">Semua Tipe</option>
          <option value="PDG">PDG</option>
          <option value="Fellowship">Fellowship</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 uppercase tracking-wider font-bold">
              <th className="p-5">Tanggal</th>
              <th className="p-5">Kegiatan</th>
              <th className="p-5">Grup Terlibat</th>
              <th className="p-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAct.map(a => (
              <tr key={a.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-5 text-slate-800 font-semibold">{a.date}</td>
                <td className="p-5">
                  <div className="font-extrabold text-slate-900 text-lg">{a.title}</div>
                  <div className="text-xs font-bold text-indigo-500 bg-indigo-50 inline-block px-2 py-1 rounded-md mt-2">{a.type}</div>
                </td>
                <td className="p-5">
                  <div className="flex gap-2 flex-wrap">
                    {a.groups.map(g => {
                       const gInfo = GROUPS.find(gr => gr.id === g);
                       return <span key={g} className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm ${gInfo ? gInfo.color : 'bg-slate-400'}`}>{gInfo ? gInfo.name : g}</span>
                    })}
                  </div>
                </td>
                <td className="p-5 text-right">
                  <button onClick={() => navigateTo('activity_detail_' + a.id)} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors">Buka &rarr;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAct.length === 0 && <div className="p-10 text-center font-bold text-slate-400">Tidak ada aktivitas ditemukan.</div>}
      </div>

      {showAdd && <AddActivityModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}

function AddActivityModal({ onClose }) {
  const { setActivities, activities, showToast, GROUPS } = useContext(AppContext);
  const [form, setForm] = useState({ title: '', type: 'PDG', date: '', groups: [] });

  const toggleGroup = (groupId) => {
    setForm(prev => ({
      ...prev,
      groups: prev.groups.includes(groupId) ? prev.groups.filter(g => g !== groupId) : [...prev.groups, groupId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form.groups.length === 0) return showToast('Pilih minimal 1 grup!', 'error');
    const newAct = { ...form, id: Date.now(), attendance: {} };
    setActivities([newAct, ...activities]);
    showToast('Aktivitas berhasil ditambahkan!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <h2 className="text-2xl font-extrabold mb-6 text-slate-900">Tambah Aktivitas</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Nama Kegiatan</label><input required type="text" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium"/></div>
          <div className="grid grid-cols-2 gap-5">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label><input required type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium"/></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Tipe</label><select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"><option>PDG</option><option>Fellowship</option><option>Lainnya</option></select></div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Grup yang Terlibat</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GROUPS.map(g => (
                <label key={g.id} className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border-2 transition-all ${form.groups.includes(g.id) ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                  <input type="checkbox" checked={form.groups.includes(g.id)} onChange={() => toggleGroup(g.id)} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" />
                  <span className="text-sm font-bold text-slate-700">{g.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-6 flex gap-4"><button type="button" onClick={onClose} className="flex-1 p-3.5 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200">Batal</button><button type="submit" className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700">Simpan</button></div>
        </form>
      </div>
    </div>
  );
}

function ActivityDetail({ id }) {
  const { activities, setActivities, members, navigateTo, activeUser, GROUPS } = useContext(AppContext);
  const activity = activities.find(a => a.id === id);
  if(!activity) return null;

  const targetMembers = members.filter(m => activity.groups.includes(m.group));

  const handleStatusChange = (memberId, status, reason = '') => {
    const updated = activities.map(a => a.id === id ? { ...a, attendance: { ...a.attendance, [memberId]: { status, reason } } } : a);
    setActivities(updated);
  };

  return (
    <div className="p-5 md:p-10">
      <button onClick={() => navigateTo('aktivitas')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-bold transition-colors"><div className="p-1.5 bg-slate-100 rounded-lg"><ChevronLeft size={20} /></div> Kembali</button>
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl shadow-lg shadow-indigo-200 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -z-0"></div>
        <div className="relative z-10">
           <h1 className="text-3xl font-black mb-2">{activity.title}</h1>
           <div className="flex flex-wrap gap-3 items-center text-indigo-100 font-medium">
             <span>{activity.date}</span> • <span className="px-2 py-1 bg-white/20 rounded-lg text-sm font-bold">{activity.type}</span> • <span>Target: {activity.groups.join(', ')}</span>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
            <tr><th className="p-5">Nama</th><th className="p-5">Grup</th><th className="p-5">Kehadiran</th><th className="p-5">Catatan/Alasan</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {targetMembers.map(m => {
              const att = activity.attendance[m.id] || { status: 'Belum diisi', reason: '' };
              const isEditable = activeUser.role === 'super_admin' || (activeUser.role === 'leader' && m.group === activeUser.group);
              return (
                <tr key={m.id} className={isEditable ? 'hover:bg-slate-50 transition-colors' : 'bg-slate-50/50 opacity-80'}>
                  <td className="p-5 font-bold text-slate-800">{m.name}</td>
                  <td className="p-5 text-sm font-bold text-slate-500">{GROUPS.find(g=>g.id===m.group)?.name}</td>
                  <td className="p-5">
                    <select 
                      disabled={!isEditable}
                      value={att.status} 
                      onChange={(e) => handleStatusChange(m.id, e.target.value, att.reason)}
                      className={`p-2.5 text-sm rounded-xl font-bold border-2 outline-none appearance-none cursor-pointer ${
                        att.status === 'Hadir' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        att.status === 'Alfa' ? 'bg-rose-50 text-rose-700 border-rose-200' : 
                        att.status === 'Belum diisi' ? 'bg-white border-slate-200 text-slate-500' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <option>Belum diisi</option><option>Hadir</option><option>Telat</option><option>Izin</option><option>Sakit</option><option>Alfa</option>
                    </select>
                  </td>
                  <td className="p-5">
                    <input 
                      disabled={!isEditable}
                      type="text" placeholder="Ketik alasan jika absen..." value={att.reason} 
                      onChange={(e) => handleStatusChange(m.id, att.status, e.target.value)}
                      className="w-full p-2.5 text-sm border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:bg-slate-50 outline-none font-medium transition-colors disabled:bg-transparent"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Ibadah() {
  const { ibadah, navigateTo } = useContext(AppContext);
  const [filterSession, setFilterSession] = useState('All');

  const filteredIbadah = ibadah.filter(i => filterSession === 'All' || i.session === filterSession);

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          Ibadah Raya <Heart className="text-rose-500" fill="currentColor"/>
        </h1>
      </div>
      
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-8 flex justify-end">
        <select value={filterSession} onChange={e=>setFilterSession(e.target.value)} className="bg-slate-50 px-4 py-3 rounded-2xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto">
          <option value="All">Semua Sesi</option>
          <option value="Pagi">Sesi Pagi</option>
          <option value="Sore">Sesi Sore</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
        {filteredIbadah.map(i => (
          <div key={i.id} className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">{i.date.split('-')[2]}</div>
               <div>
                 <div className="font-extrabold text-slate-900 text-lg">Ibadah Raya - Sesi {i.session}</div>
                 <div className="text-sm font-bold text-slate-400 mt-1">{i.date}</div>
               </div>
            </div>
            <button onClick={() => navigateTo('ibadah_detail_' + i.id)} className="text-indigo-600 font-bold bg-indigo-50 hover:bg-indigo-100 px-5 py-3 rounded-2xl transition-colors whitespace-nowrap">Lihat Kehadiran &rarr;</button>
          </div>
        ))}
        {filteredIbadah.length === 0 && <div className="p-10 text-center font-bold text-slate-400">Tidak ada data ibadah.</div>}
      </div>
    </div>
  );
}

function IbadahDetail({ id }) {
  const { ibadah, setIbadah, members, activeUser, navigateTo } = useContext(AppContext);
  const session = ibadah.find(i => i.id === id);
  if(!session) return null;

  const handleStatusChange = (memberId, status, reason = '') => {
    const updated = ibadah.map(i => i.id === id ? { ...i, attendance: { ...i.attendance, [memberId]: { status, reason } } } : i);
    setIbadah(updated);
  };

  return (
    <div className="p-5 md:p-10">
       <button onClick={() => navigateTo('ibadah')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-bold transition-colors"><div className="p-1.5 bg-slate-100 rounded-lg"><ChevronLeft size={20} /></div> Kembali</button>
       
       <div className="mb-8">
         <h1 className="text-3xl font-black text-slate-900">Absensi Ibadah</h1>
         <p className="text-lg font-bold text-indigo-600 mt-2">{session.date} • Sesi {session.session}</p>
       </div>

       <div className="bg-blue-50/50 border border-blue-100 text-blue-800 p-5 rounded-2xl mb-8 text-sm flex gap-4 items-start shadow-sm">
          <AlertCircle size={24} className="flex-shrink-0 text-blue-600 mt-0.5"/>
          <p className="font-medium leading-relaxed">Sebagai <strong>{activeUser.role}</strong>, Anda {activeUser.role === 'super_admin' ? 'bisa mengedit absensi semua orang.' : `hanya bisa mengedit absensi kelompok Anda (${activeUser.group}). Kelompok lain bersifat view-only.`}</p>
       </div>

       <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
               <tr><th className="p-5">Nama</th><th className="p-5">Grup</th><th className="p-5">Kehadiran</th></tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {members.map(m => {
                  const att = session.attendance[m.id] || { status: 'Belum diisi' };
                  const isEditable = activeUser.role === 'super_admin' || (activeUser.role === 'leader' && m.group === activeUser.group);
                  return (
                    <tr key={m.id} className={isEditable ? 'hover:bg-slate-50 transition-colors' : 'bg-slate-50/50 opacity-70'}>
                      <td className="p-5 font-bold text-slate-800">{m.name}</td>
                      <td className="p-5 text-sm font-bold text-slate-400">{m.group}</td>
                      <td className="p-5">
                        <select 
                          disabled={!isEditable}
                          value={att.status} 
                          onChange={(e) => handleStatusChange(m.id, e.target.value)}
                          className={`p-2.5 text-sm rounded-xl font-bold border-2 outline-none appearance-none ${!isEditable ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-700 cursor-pointer focus:border-indigo-500 focus:bg-slate-50'}`}
                        >
                          <option>Belum diisi</option><option>Hadir</option><option>Alfa</option><option>Izin</option><option>Sakit</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}
             </tbody>
          </table>
       </div>
    </div>
  );
}

function BibleStudy() {
  const { bsCases, setBsCases, navigateTo, showToast, members, activeUser } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddCase, setShowAddCase] = useState(false);
  const [newCase, setNewCase] = useState({ personName: '', teacherId: activeUser.id });

  const filteredBS = bsCases.filter(bs => {
    return bs.personName.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (filterStatus === 'All' || bs.status === filterStatus);
  });

  const handleAddCase = (e) => {
    e.preventDefault();
    const newId = bsCases.length + 1;
    setBsCases([{ id: newId, personName: newCase.personName, teacherId: Number(newCase.teacherId), status: 'Aktif', sessions: [] }, ...bsCases]);
    setShowAddCase(false);
    showToast('Bible Study baru berhasil dibuat!');
  };

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bible Study</h1>
        <button onClick={() => setShowAddCase(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all">
           <Plus size={20}/> Tambah BS Baru
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input type="text" placeholder="Cari nama orang..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="bg-slate-50 px-4 py-3 rounded-2xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto">
          <option value="All">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBS.map(bs => (
          <div key={bs.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-2">{bs.personName}</h2>
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg shadow-sm ${bs.status==='Aktif'?'bg-emerald-50 text-emerald-600 border border-emerald-100':'bg-slate-100 text-slate-500 border border-slate-200'}`}>{bs.status}</span>
              </div>
              <div className="text-right bg-indigo-50 p-3 rounded-2xl">
                <div className="text-2xl font-black text-indigo-600 leading-none">M{bs.sessions.length}</div>
              </div>
            </div>
            <button onClick={() => navigateTo('bs_detail_' + bs.id)} className="w-full mt-2 py-3.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold rounded-2xl transition-colors border border-slate-100 hover:border-indigo-100">Buka Detail Sesi</button>
          </div>
        ))}
      </div>

      {showAddCase && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-fade-in-up">
            <h2 className="text-2xl font-extrabold mb-6 text-slate-900">Mulai BS Baru</h2>
            <form onSubmit={handleAddCase} className="space-y-5">
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Nama Orang (Studi-an)</label><input required type="text" value={newCase.personName} onChange={e=>setNewCase({...newCase, personName:e.target.value})} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium"/></div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Guru (Leader BS)</label>
                <select value={newCase.teacherId} onChange={e=>setNewCase({...newCase, teacherId:e.target.value})} className="w-full p-3.5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer">
                  {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="pt-4 flex gap-4"><button type="button" onClick={()=>setShowAddCase(false)} className="flex-1 p-3.5 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200">Batal</button><button type="submit" className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700">Simpan</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function BSDetail({ id }) {
  const { bsCases, setBsCases, members, navigateTo, showToast } = useContext(AppContext);
  const bs = bsCases.find(b => b.id === id);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ date: '', location: '', material: bs?.sessions.length + 1 || 1, topic: '', sitIn: [], issue: '', actions: '', notes: '' });
  const [editingSession, setEditingSession] = useState(null);

  if(!bs) return null;

  const toggleSitIn = (mId) => setForm(prev => ({ ...prev, sitIn: prev.sitIn.includes(mId) ? prev.sitIn.filter(x => x !== mId) : [...prev.sitIn, mId] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSession = { ...form, id: Date.now() };
    const updated = bsCases.map(b => b.id === id ? { ...b, sessions: [newSession, ...b.sessions] } : b);
    setBsCases(updated);
    setShowAdd(false);
    showToast('Sesi BS berhasil ditambahkan!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedSessions = bs.sessions.map(s => s.id === editingSession.id ? editingSession : s);
    const updated = bsCases.map(b => b.id === id ? { ...b, sessions: updatedSessions } : b);
    setBsCases(updated);
    setEditingSession(null);
    showToast('Sesi BS berhasil diperbarui!');
  };

  return (
    <div className="p-5 md:p-10">
       <button onClick={() => navigateTo('bs')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-bold transition-colors"><div className="p-1.5 bg-slate-100 rounded-lg"><ChevronLeft size={20} /></div> Kembali</button>
       
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">{bs.personName}</h1>
            <p className="text-slate-500 font-medium">Total {bs.sessions.length} sesi tercatat.</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all">
            <Plus size={20}/> Tambah Sesi
          </button>
       </div>

       <div className="space-y-8 relative before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-indigo-100 before:to-indigo-50">
          {bs.sessions.map((ses) => (
             <div key={ses.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-indigo-500 text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-4 md:ml-0 font-black">
                  M{ses.material}
                </div>
                
                {/* Card */}
                <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all relative">
                  <button 
                    onClick={() => setEditingSession({...ses})} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 p-2 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-colors"
                    title="Edit Sesi"
                  >
                    <Edit3 size={16}/>
                  </button>
                  <div className="text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                    <Calendar size={14}/> {ses.date} <span className="text-slate-300">•</span> <MapPin size={14}/> {ses.location}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-5">{ses.topic}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100"><div className="text-[10px] font-black text-rose-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><AlertCircle size={12}/> Issue</div><p className="text-sm font-medium text-rose-900 leading-relaxed">{ses.issue || '-'}</p></div>
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100"><div className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><CheckSquare size={12}/> Action Items</div><p className="text-sm font-medium text-amber-900 leading-relaxed">{ses.actions || '-'}</p></div>
                    <div className="bg-teal-50/50 p-4 rounded-2xl border border-teal-100"><div className="text-[10px] font-black text-teal-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><FileText size={12}/> Notes</div><p className="text-sm font-medium text-teal-900 leading-relaxed">{ses.notes || '-'}</p></div>
                  </div>

                  <div className="text-sm font-bold text-slate-500 border-t border-slate-100 pt-5 flex items-start gap-2">
                    <Users size={16} className="text-slate-400 mt-0.5"/> 
                    <span className="leading-relaxed">Sit-in: {ses.sitIn.length > 0 ? ses.sitIn.map(sid => members.find(m=>m.id===sid)?.name.split(' ')[0]).join(', ') : '-'}</span>
                  </div>
                </div>
             </div>
          ))}
       </div>

       {showAdd && (
          <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in-up">
                <h2 className="text-2xl font-extrabold mb-8 text-slate-900">Catat Sesi BS Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-2 gap-5">
                     <div><label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label><input required type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"/></div>
                     <div><label className="block text-sm font-bold text-slate-700 mb-2">Lokasi</label><input required type="text" placeholder="Mis. Cafe XYZ" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"/></div>
                   </div>
                   <div className="grid grid-cols-3 gap-5">
                     <div><label className="block text-sm font-bold text-slate-700 mb-2">Materi Ke-</label><input required type="number" value={form.material} onChange={e=>setForm({...form, material:e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"/></div>
                     <div className="col-span-2"><label className="block text-sm font-bold text-slate-700 mb-2">Topik Utama</label><input required type="text" value={form.topic} onChange={e=>setForm({...form, topic:e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"/></div>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-3">Anggota Sit-in (Multi-select)</label>
                     <div className="max-h-40 overflow-y-auto border-2 border-slate-100 rounded-2xl p-4 grid grid-cols-2 gap-3 bg-slate-50 custom-scrollbar">
                       {members.map(m => (
                         <label key={m.id} className={`flex items-center gap-3 cursor-pointer text-sm font-bold p-2 rounded-xl transition-colors ${form.sitIn.includes(m.id)?'bg-indigo-100/50 text-indigo-700':'text-slate-600 hover:bg-slate-100'}`}>
                           <input type="checkbox" checked={form.sitIn.includes(m.id)} onChange={() => toggleSitIn(m.id)} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" /> {m.name}
                         </label>
                       ))}
                     </div>
                   </div>
                   <div><label className="block text-sm font-bold text-slate-700 mb-2 text-rose-500">Issue / Pergumulan</label><textarea rows="2" value={form.issue} onChange={e=>setForm({...form, issue:e.target.value})} className="w-full p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-400 outline-none font-medium text-rose-900 placeholder:text-rose-300" placeholder="Opsional..."></textarea></div>
                   <div><label className="block text-sm font-bold text-slate-700 mb-2 text-amber-500">Action Items</label><textarea rows="2" value={form.actions} onChange={e=>setForm({...form, actions:e.target.value})} className="w-full p-3.5 bg-amber-50/50 border border-amber-100 rounded-2xl focus:ring-2 focus:ring-amber-400 outline-none font-medium text-amber-900 placeholder:text-amber-300" placeholder="Tugas mandiri untuk minggu depan..."></textarea></div>
                   <div><label className="block text-sm font-bold text-slate-700 mb-2 text-teal-500">Summary Notes</label><textarea rows="3" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="w-full p-3.5 bg-teal-50/50 border border-teal-100 rounded-2xl focus:ring-2 focus:ring-teal-400 outline-none font-medium text-teal-900 placeholder:text-teal-300" placeholder="Rangkuman materi..."></textarea></div>
                   
                   <div className="pt-6 flex gap-4"><button type="button" onClick={()=>setShowAdd(false)} className="flex-1 p-3.5 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200">Batal</button><button type="submit" className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700">Simpan Sesi</button></div>
                </form>
             </div>
          </div>
       )}

       {editingSession && (
          <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in-up">
                <h2 className="text-2xl font-extrabold mb-8 text-slate-900">Edit Sesi BS</h2>
                <form onSubmit={handleEditSubmit} className="space-y-6">
                   <div className="grid grid-cols-2 gap-5">
                     <div><label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label><input required type="date" value={editingSession.date} onChange={e=>setEditingSession({...editingSession, date:e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"/></div>
                     <div><label className="block text-sm font-bold text-slate-700 mb-2">Lokasi</label><input required type="text" placeholder="Mis. Cafe XYZ" value={editingSession.location} onChange={e=>setEditingSession({...editingSession, location:e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"/></div>
                   </div>
                   <div className="grid grid-cols-3 gap-5">
                     <div><label className="block text-sm font-bold text-slate-700 mb-2">Materi Ke-</label><input required type="number" value={editingSession.material} onChange={e=>setEditingSession({...editingSession, material:e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"/></div>
                     <div className="col-span-2"><label className="block text-sm font-bold text-slate-700 mb-2">Topik Utama</label><input required type="text" value={editingSession.topic} onChange={e=>setEditingSession({...editingSession, topic:e.target.value})} className="w-full p-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"/></div>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-3">Anggota Sit-in (Multi-select)</label>
                     <div className="max-h-40 overflow-y-auto border-2 border-slate-100 rounded-2xl p-4 grid grid-cols-2 gap-3 bg-slate-50 custom-scrollbar">
                       {members.map(m => (
                         <label key={m.id} className={`flex items-center gap-3 cursor-pointer text-sm font-bold p-2 rounded-xl transition-colors ${editingSession.sitIn.includes(m.id)?'bg-indigo-100/50 text-indigo-700':'text-slate-600 hover:bg-slate-100'}`}>
                           <input type="checkbox" checked={editingSession.sitIn.includes(m.id)} onChange={() => {
                             setEditingSession(prev => ({
                               ...prev,
                               sitIn: prev.sitIn.includes(m.id) ? prev.sitIn.filter(x => x !== m.id) : [...prev.sitIn, m.id]
                             }));
                           }} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600" /> {m.name}
                         </label>
                       ))}
                     </div>
                   </div>
                   <div><label className="block text-sm font-bold text-slate-700 mb-2 text-rose-500">Issue / Pergumulan</label><textarea rows="2" value={editingSession.issue} onChange={e=>setEditingSession({...editingSession, issue:e.target.value})} className="w-full p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-400 outline-none font-medium text-rose-900 placeholder:text-rose-300" placeholder="Opsional..."></textarea></div>
                   <div><label className="block text-sm font-bold text-slate-700 mb-2 text-amber-500">Action Items</label><textarea rows="2" value={editingSession.actions} onChange={e=>setEditingSession({...editingSession, actions:e.target.value})} className="w-full p-3.5 bg-amber-50/50 border border-amber-100 rounded-2xl focus:ring-2 focus:ring-amber-400 outline-none font-medium text-amber-900 placeholder:text-amber-300" placeholder="Tugas mandiri untuk minggu depan..."></textarea></div>
                   <div><label className="block text-sm font-bold text-slate-700 mb-2 text-teal-500">Summary Notes</label><textarea rows="3" value={editingSession.notes} onChange={e=>setEditingSession({...editingSession, notes:e.target.value})} className="w-full p-3.5 bg-teal-50/50 border border-teal-100 rounded-2xl focus:ring-2 focus:ring-teal-400 outline-none font-medium text-teal-900 placeholder:text-teal-300" placeholder="Rangkuman materi..."></textarea></div>
                   
                   <div className="pt-6 flex gap-4"><button type="button" onClick={()=>setEditingSession(null)} className="flex-1 p-3.5 bg-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-200">Batal</button><button type="submit" className="flex-1 p-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700">Update Sesi</button></div>
                </form>
             </div>
          </div>
       )}
    </div>
  );
}
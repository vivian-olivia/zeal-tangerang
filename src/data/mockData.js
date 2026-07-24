export const GROUPS = [
  { id: 'CT', name: 'Core Team', color: 'bg-slate-800' },
  { id: 'RK', name: 'Raymond-Kezia', color: 'bg-red-500' },
  { id: 'MP', name: 'Michael-Putri', color: 'bg-teal-500' },
  { id: 'VY', name: 'Vincent-Yolly', color: 'bg-blue-500' },
  { id: 'AS', name: 'Abraham-Shira', color: 'bg-rose-500' },
  { id: 'JC', name: 'Jeffrey-Chelsea', color: 'bg-violet-500' },
  { id: 'JR', name: 'Jingga-Rosy', color: 'bg-cyan-500' },
];

export const LOVE_LANGUAGES = {
  'Words of Affirmation': 'bg-indigo-500',
  'Acts of Service': 'bg-teal-500',
  'Receiving Gifts': 'bg-amber-500',
  'Quality Time': 'bg-rose-500',
  'Physical Touch': 'bg-violet-500',
  Unknown: 'bg-gray-300',
};

// L = Laki-laki (brother), P = Perempuan (sister) — drives the color strip on member cards
export const GENDER_COLORS = {
  L: 'bg-blue-500',
  P: 'bg-pink-500',
};

export const LIFE_STATUS_COLORS = {
  Kuliah: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
  Kerja: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
  Lainnya: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
};

export const MOCK_MEMBERS = [
  { id: 1, name: 'Christian Jingga', role: 'super_admin', group: 'JR', status: 'Strong', loveLang: 'Quality Time', gender: 'L', bday: '1995-05-15', mentorId: null, phone: '08123456789', service: ['Songmin', 'Multimedia'], lifeStatus: 'Kerja', education: null, job: { role: 'Software Engineer', company: 'PT Teknologi Nusantara' } },
  { id: 2, name: 'Raymond', role: 'leader', group: 'RK', status: 'Strong', loveLang: 'Acts of Service', gender: 'L', bday: '1996-08-20', mentorId: 1, phone: '08123456780', service: ['Ushers'], lifeStatus: 'Kerja', education: null, job: { role: 'Marketing Executive', company: 'Bank Central Asia' } },
  { id: 4, name: 'Vincent', role: 'leader', group: 'VY', status: 'Strong', loveLang: 'Quality Time', gender: 'L', bday: '1997-12-05', mentorId: 1, phone: '08123456782', service: ['Multimedia'], lifeStatus: 'Kerja', education: null, job: { role: 'Business Analyst', company: 'Unilever Indonesia' } },
  { id: 6, name: 'Michael Anggriawan', role: 'leader', group: 'MP', status: 'Strong', loveLang: 'Receiving Gifts', gender: 'L', bday: '1998-11-12', mentorId: 1, phone: '08123456784', service: ['Multimedia'], lifeStatus: 'Kerja', education: null, job: { role: 'Product Manager', company: 'Gojek' } },
  { id: 18, name: 'Abraham Newton', role: 'leader', group: 'AS', status: 'Strong', loveLang: 'Acts of Service', gender: 'L', bday: '1996-03-14', mentorId: 1, phone: '08123456786', service: ['KKK'], lifeStatus: 'Kerja', education: null, job: { role: 'Civil Engineer', company: 'PT Wijaya Karya' } },
  { id: 22, name: 'Jeffrey Adriel', role: 'leader', group: 'JC', status: 'Strong', loveLang: 'Quality Time', gender: 'L', bday: '1997-09-22', mentorId: 1, phone: '08123456787', service: [], lifeStatus: 'Kuliah', education: { univ: 'Universitas Pelita Harapan', jurusan: 'Teknik Informatika', angkatan: 2021 }, job: null },
  { id: 3, name: 'Kezia Natalie', role: 'member', group: 'RK', status: 'Strong', loveLang: 'Words of Affirmation', gender: 'P', bday: new Date().toISOString().split('T')[0], mentorId: 2, phone: '08123456781', service: ['Ushers', 'Songmin'], lifeStatus: 'Kuliah', education: { univ: 'Universitas Multimedia Nusantara', jurusan: 'Manajemen', angkatan: 2022 }, job: null },
  { id: 5, name: 'Yolly Pratiwi', role: 'member', group: 'VY', status: 'Strong', loveLang: 'Acts of Service', gender: 'P', bday: '1999-07-03', mentorId: 4, phone: '08123456783', service: ['Social Media'], lifeStatus: 'Kerja', education: null, job: { role: 'Graphic Designer', company: 'Tokopedia' } },
  { id: 7, name: 'Vionika Clementia', role: 'member', group: 'VY', status: 'Strong', loveLang: 'Quality Time', gender: 'P', bday: '2000-02-28', mentorId: 5, phone: '08123456785', service: ['Multimedia'], lifeStatus: 'Kuliah', education: { univ: 'Universitas Tarumanagara', jurusan: 'Desain Komunikasi Visual', angkatan: 2021 }, job: null },
  { id: 8, name: 'Rosy Lie', role: 'member', group: 'JR', status: 'Strong', loveLang: 'Acts of Service', gender: 'P', bday: '1998-01-15', mentorId: 1, phone: '08111111111', service: ['Ushers'], lifeStatus: 'Kerja', education: null, job: { role: 'Accountant', company: 'KPMG Indonesia' } },
  { id: 9, name: 'Mega Putri', role: 'member', group: 'MP', status: 'Strong', loveLang: 'Receiving Gifts', gender: 'P', bday: '2001-04-12', mentorId: 6, phone: '08111111112', service: ['Social Media'], lifeStatus: 'Kuliah', education: { univ: 'Universitas Bina Nusantara', jurusan: 'Sistem Informasi', angkatan: 2023 }, job: null },
  { id: 10, name: 'Chelsea Wang', role: 'member', group: 'JC', status: 'Strong', loveLang: 'Quality Time', gender: 'P', bday: '2002-09-30', mentorId: 22, phone: '08111111113', service: ['Ushers'], lifeStatus: 'Kuliah', education: { univ: 'Universitas Pelita Harapan', jurusan: 'Psikologi', angkatan: 2024 }, job: null },
  { id: 11, name: 'Shira', role: 'member', group: 'AS', status: 'Strong', loveLang: 'Words of Affirmation', gender: 'P', bday: '2003-11-20', mentorId: 18, phone: '08111111114', service: ['Songmin'], lifeStatus: 'Kuliah', education: { univ: 'Universitas Katolik Atma Jaya', jurusan: 'Hukum', angkatan: 2023 }, job: null },
  { id: 12, name: 'Jafferson', role: 'member', group: 'RK', status: 'Concern', loveLang: 'Unknown', gender: 'L', bday: '2000-06-10', mentorId: 2, phone: '08222222221', service: [], lifeStatus: 'Lainnya', education: null, job: null },
  { id: 13, name: 'William Natan', role: 'member', group: 'RK', status: 'Concern', loveLang: 'Unknown', gender: 'L', bday: '2001-08-05', mentorId: 2, phone: '08222222222', service: [], lifeStatus: 'Kuliah', education: { univ: 'Universitas Trisakti', jurusan: 'Teknik Sipil', angkatan: 2022 }, job: null },
  { id: 14, name: 'Misael Sinaga', role: 'member', group: 'VY', status: 'Weak', loveLang: 'Words of Affirmation', gender: 'L', bday: '1999-12-12', mentorId: 4, phone: '08222222223', service: [], lifeStatus: 'Lainnya', education: null, job: null },
];

export const MOCK_ACTIVITIES = [
  { id: 1, title: 'PDG Gabungan', type: 'PDG', date: '2024-06-15', groups: ['RK', 'VY', 'MP'], attendance: { 2: { status: 'Hadir', reason: '' }, 3: { status: 'Hadir', reason: '' }, 4: { status: 'Izin', reason: 'Kerja' } } },
  { id: 2, title: 'Bible Talk Spesial', type: 'Fellowship', date: '2024-06-20', groups: ['AS', 'JC', 'JR'], attendance: {} },
  { id: 3, title: 'Retreat Youth', type: 'Lainnya', date: '2024-07-01', groups: ['CT', 'RK', 'MP', 'VY', 'AS', 'JC', 'JR'], attendance: {} },
];

export const MOCK_IBADAH = [
  { id: 1, date: '2024-06-16', session: 'Pagi', attendance: { 1: { status: 'Hadir' }, 2: { status: 'Hadir' }, 12: { status: 'Alfa' } } },
  { id: 2, date: '2024-06-23', session: 'Sore', attendance: {} },
  { id: 3, date: '2024-06-30', session: 'Pagi', attendance: {} },
];

export const MOCK_BS = [
  {
    id: 1, personName: 'Budi Santoso', teacherId: 1, status: 'Aktif',
    sessions: [
      { id: 101, date: '2024-06-10', location: 'Starbucks', material: 1, topic: 'Keselamatan', sitIn: [2, 3], issue: 'Masih ragu tentang anugerah', actions: 'Ajak ngobrol personal minggu depan', notes: 'Sesi berjalan lancar, Budi banyak bertanya.' },
    ],
  },
  {
    id: 2, personName: 'Jessica Lin', teacherId: 3, status: 'Aktif',
    sessions: [
      { id: 102, date: '2024-06-12', location: 'Zoom', material: 2, topic: 'Firman Tuhan', sitIn: [4], issue: 'Susah cari waktu', actions: 'Buat plan baca', notes: 'Materi selesai dibahas.' },
    ],
  },
  {
    id: 3, personName: 'Hendra Lim', teacherId: 6, status: 'Selesai',
    sessions: [
      { id: 103, date: '2024-05-20', location: 'Gereja', material: 12, topic: 'Gereja Lokal', sitIn: [9], issue: '', actions: 'Ajak gabung PDG', notes: 'Selesai seluruh seri BS.' },
    ],
  },
];

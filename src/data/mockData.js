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

export const MOCK_MEMBERS = [
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

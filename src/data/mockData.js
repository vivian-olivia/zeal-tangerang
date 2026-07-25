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
  'Kuliah & Kerja': 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900',
  Lainnya: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
};

// Derives the "Kuliah"/"Kerja"/"Kuliah & Kerja"/"Lainnya" badge from whatever
// education/job info is actually filled in, instead of a separately-maintained
// status field that could drift out of sync (e.g. someone who works AND studies).
export function getLifeStatusLabel(member) {
  const hasEdu = !!member.education;
  const hasJob = !!member.job;
  if (hasEdu && hasJob) return 'Kuliah & Kerja';
  if (hasEdu) return 'Kuliah';
  if (hasJob) return 'Kerja';
  return 'Lainnya';
}

export const SERVICE_OPTIONS = ['Songmin', 'Multimedia', 'Ushers', 'Social Media', 'KKK'];

export const MEETING_TYPES = ['Ibadah Minggu', 'PDG', 'Bible Talk', 'Fellowship', 'Lainnya'];

// Shared Tailwind classes per meeting type — reused by the Pertemuan list badges,
// calendar dots, and Dashboard's upcoming-events icons so the palette stays consistent.
export const MEETING_TYPE_STYLES = {
  'Ibadah Minggu': { badge: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400', dot: 'bg-rose-500', iconBg: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' },
  PDG: { badge: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400', dot: 'bg-indigo-500', iconBg: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
  'Bible Talk': { badge: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10 dark:text-violet-400', dot: 'bg-violet-500', iconBg: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10' },
  Fellowship: { badge: 'text-teal-600 bg-teal-50 dark:bg-teal-500/10 dark:text-teal-400', dot: 'bg-teal-500', iconBg: 'text-teal-500 bg-teal-50 dark:bg-teal-500/10' },
  Lainnya: { badge: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300', dot: 'bg-slate-400', iconBg: 'text-slate-500 bg-slate-100 dark:bg-slate-800' },
};

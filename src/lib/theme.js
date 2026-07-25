export function getInitialDarkMode() {
  const stored = localStorage.getItem('zeal-theme');
  if (stored) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyDarkClass(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('zeal-theme', isDark ? 'dark' : 'light');
}

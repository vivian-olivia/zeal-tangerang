import React, { useContext, useState } from 'react';
import { LogIn, Sun, Moon } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import GoogleIcon from '../components/GoogleIcon.jsx';
import zealLogo from '../../assets/Logo Hitam Zeal.png';

export default function Login() {
  const { login, loginWithGoogle, loginAsGuest, isDark, toggleDark } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: loginError } = await login(email, password);
    setSubmitting(false);
    if (loginError) setError('Email atau password salah.');
  };

  const handleGuest = async () => {
    setError('');
    setGuestLoading(true);
    const { error: guestError } = await loginAsGuest();
    setGuestLoading(false);
    if (guestError) setError('Mode Tamu belum tersedia. Coba lagi nanti.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative transition-colors">
      <button
        type="button"
        onClick={toggleDark}
        className="absolute top-6 right-6 p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-300 shadow-sm"
        title={isDark ? 'Mode Terang' : 'Mode Gelap'}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
            <img src={zealLogo} alt="Zeal Tangerang" className="h-10 w-auto object-contain" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">Masuk</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">Khusus leader &amp; admin Zeal Tangerang.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <input
                required type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200"
                placeholder="email@contoh.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input
                required type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-900 rounded-2xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={submitting}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> {submitting ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">atau</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          </div>

          <button
            type="button" onClick={loginWithGoogle}
            className="w-full py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <GoogleIcon /> Masuk dengan Google
          </button>

          <button
            type="button" onClick={handleGuest} disabled={guestLoading}
            className="w-full mt-4 py-3 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-60 transition-colors"
          >
            {guestLoading ? 'Memuat...' : 'Masuk sebagai Tamu (lihat saja) →'}
          </button>
        </div>
      </div>
    </div>
  );
}

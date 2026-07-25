import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Mail, Sun, Moon } from 'lucide-react';
import { supabase } from '../lib/supabaseClient.js';
import { getInitialDarkMode, applyDarkClass } from '../lib/theme.js';
import { GROUPS } from '../data/mockData.js';
import GoogleIcon from '../components/GoogleIcon.jsx';
import zealLogo from '../../assets/Logo Hitam Zeal.png';

// status: loading | invalid | choose | email-form | awaiting-confirmation |
//         complete-profile | already-registered | submitting | success
export default function Register({ token }) {
  const [isDark, setIsDark] = useState(getInitialDarkMode);
  const [status, setStatus] = useState('loading');
  const [invite, setInvite] = useState(null);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', password: '' });
  const [profileForm, setProfileForm] = useState({ phone: '', gender: 'L', bday: '', spiritualBday: '' });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => { applyDarkClass(isDark); }, [isDark]);

  useEffect(() => {
    let cancelled = false;

    async function checkInviteAndSession() {
      const { data: inviteRows, error: inviteErr } = await supabase.rpc('get_invite_by_token', { p_token: token });
      const validInvite = !inviteErr && inviteRows && inviteRows.length > 0;
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;

      if (session) {
        const { data: existingMember } = await supabase
          .from('members').select('id').eq('auth_user_id', session.user.id).maybeSingle();
        if (cancelled) return;
        if (existingMember) { setStatus('already-registered'); return; }
        if (!validInvite) { setStatus('invalid'); return; }
        setInvite(inviteRows[0]);
        setStatus('complete-profile');
        return;
      }

      if (!validInvite) { setStatus('invalid'); return; }
      setInvite(inviteRows[0]);
      setStatus('choose');
    }

    checkInviteAndSession();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) checkInviteAndSession();
    });
    return () => { cancelled = true; sub.subscription.unsubscribe(); };
  }, [token]);

  const redirectUrl = `${window.location.origin}/?register_token=${token}`;

  const handleGoogleRegister = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectUrl } });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('submitting');
    const { data, error } = await supabase.auth.signUp({
      email: emailForm.email,
      password: emailForm.password,
      options: { data: { name: emailForm.name }, emailRedirectTo: redirectUrl },
    });
    if (error) {
      setErrorMsg(error.message || 'Gagal mendaftar.');
      setStatus('email-form');
      return;
    }
    setStatus(data.session ? 'complete-profile' : 'awaiting-confirmation');
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('submitting');
    const { error } = await supabase.rpc('finalize_registration', {
      p_token: token,
      p_phone: profileForm.phone,
      p_gender: profileForm.gender,
      p_bday: profileForm.bday || null,
      p_spiritual_bday: profileForm.spiritualBday || null,
    });
    if (error) {
      if (error.message?.includes('already_registered')) {
        setStatus('already-registered');
      } else {
        setErrorMsg('Link undangan ini sudah digunakan atau tidak valid lagi.');
        setStatus('invalid');
      }
      return;
    }
    setStatus('success');
  };

  const goToApp = () => { window.location.href = window.location.origin + '/'; };

  const groupName = invite ? (GROUPS.find(g => g.id === invite.group_id)?.name || invite.group_id) : '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative transition-colors">
      <button
        type="button"
        onClick={() => setIsDark(prev => !prev)}
        className="absolute top-6 right-6 p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-300 shadow-sm"
        title={isDark ? 'Mode Terang' : 'Mode Gelap'}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
            <img src={zealLogo} alt="Zeal Tangerang" className="h-10 w-auto object-contain" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
          {(status === 'loading' || status === 'submitting') && (
            <p className="text-center text-slate-400 dark:text-slate-500 font-medium py-8">Memuat...</p>
          )}

          {status === 'invalid' && (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center mb-5">
                <XCircle size={28} />
              </div>
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">Link Tidak Valid</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {errorMsg || 'Link undangan ini sudah digunakan atau kedaluwarsa. Hubungi leader kamu untuk mendapatkan link baru.'}
              </p>
            </div>
          )}

          {status === 'already-registered' && (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <CheckCircle2 size={28} />
              </div>
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">Kamu Sudah Terdaftar</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">Akun kamu sudah aktif. Langsung masuk saja ke aplikasi.</p>
              <button onClick={goToApp} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 transition-colors">Masuk ke Aplikasi</button>
            </div>
          )}

          {status === 'choose' && invite && (
            <>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">Daftar Anggota Baru</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">
                Diundang oleh <strong>{invite.invited_by_name}</strong> untuk bergabung di grup <strong>{groupName}</strong>.
              </p>
              <div className="space-y-3">
                <button onClick={() => setStatus('email-form')} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 transition-colors flex items-center justify-center gap-2">
                  <Mail size={18} /> Daftar dengan Email
                </button>
                <button onClick={handleGoogleRegister} className="w-full py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <GoogleIcon /> Daftar dengan Google
                </button>
              </div>
            </>
          )}

          {status === 'email-form' && invite && (
            <>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">Daftar dengan Email</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">Grup: <strong>{groupName}</strong></p>
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
                  <input required type="text" value={emailForm.name} onChange={e => setEmailForm({ ...emailForm, name: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200" placeholder="Ketik nama lengkap..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input required type="email" value={emailForm.email} onChange={e => setEmailForm({ ...emailForm, email: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200" placeholder="email@contoh.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                  <input required type="password" minLength={6} value={emailForm.password} onChange={e => setEmailForm({ ...emailForm, password: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200" placeholder="Minimal 6 karakter" />
                </div>
                {errorMsg && (
                  <div className="text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-900 rounded-2xl px-4 py-3">{errorMsg}</div>
                )}
                <div className="pt-2 flex gap-4">
                  <button type="button" onClick={() => setStatus('choose')} className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Kembali</button>
                  <button type="submit" className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 transition-colors">Daftar</button>
                </div>
              </form>
            </>
          )}

          {status === 'awaiting-confirmation' && (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <Mail size={28} />
              </div>
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">Cek Emailmu</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Kami sudah kirim link konfirmasi ke <strong>{emailForm.email}</strong>. Klik link di email itu untuk melanjutkan pendaftaran.
              </p>
            </div>
          )}

          {status === 'complete-profile' && (
            <>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">Lengkapi Profil</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">Hampir selesai! Isi beberapa info tambahan.</p>
              <form onSubmit={handleCompleteProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nomor WhatsApp</label>
                  <input required type="tel" value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200" placeholder="08xxxxxxxxxx" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Jenis Kelamin</label>
                    <select value={profileForm.gender} onChange={e => setProfileForm({ ...profileForm, gender: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none cursor-pointer text-slate-800 dark:text-slate-200">
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tanggal Lahir</label>
                    <input type="date" value={profileForm.bday} onChange={e => setProfileForm({ ...profileForm, bday: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Ulang Tahun Rohani <span className="text-slate-400 font-medium">(opsional)</span></label>
                  <input type="date" value={profileForm.spiritualBday} onChange={e => setProfileForm({ ...profileForm, spiritualBday: e.target.value })} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 transition-colors">Selesai</button>
              </form>
            </>
          )}

          {status === 'success' && (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5">
                <CheckCircle2 size={28} />
              </div>
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">Pendaftaran Berhasil!</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">Kamu sudah terdaftar di grup {groupName}. Sampai jumpa di pertemuan berikutnya 🎉</p>
              <button onClick={goToApp} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950 transition-colors">Masuk ke Aplikasi</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

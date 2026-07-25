import React, { useContext, useState } from 'react';
import { AppContext, AppProvider } from './context/AppContext.jsx';
import MobileTopBar from './components/MobileTopBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import BottomNav from './components/BottomNav.jsx';
import PageRouter from './components/PageRouter.jsx';
import Toast from './components/Toast.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// A shared invite link looks like /#/register_<token> (checked via the hash).
// The email-confirmation and Google OAuth redirects instead land back on
// /?register_token=<token> — a query param, deliberately not the hash, since
// Supabase's client attaches its own session-restoration data to the URL on
// those redirects and a shared hash slot risks colliding with it. Either form
// renders Register standalone so an invitee with no session never triggers
// AppProvider's authenticated data fetches.
function getRegisterToken() {
  const fromQuery = new URLSearchParams(window.location.search).get('register_token');
  if (fromQuery) return fromQuery;
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash.startsWith('register_')) return hash.slice('register_'.length);
  if (hash.startsWith('register/')) return hash.slice('register/'.length);
  return null;
}

function FullScreenSpinner() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-10 h-10 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
}

function NotLinkedScreen({ onLogout }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-center">
      <div>
        <h1 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">Akun Belum Terhubung</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 max-w-sm">
          Login kamu berhasil, tapi belum terhubung ke data anggota manapun. Hubungi super admin untuk menghubungkan akunmu.
        </p>
        <button onClick={onLogout} className="px-5 py-2.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-bold text-sm">Keluar</button>
      </div>
    </div>
  );
}

function AppShell() {
  const { toast, authLoading, dataLoading, session, activeUser, logout } = useContext(AppContext);

  if (authLoading) return <FullScreenSpinner />;
  if (!session) return <Login />;
  if (dataLoading) return <FullScreenSpinner />;
  if (!activeUser) return <NotLinkedScreen onLogout={logout} />;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans overflow-hidden relative transition-colors">
      {/* Decorative background blur elements for youthful feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-rose-200/20 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <MobileTopBar />
      <Sidebar />

      {/* Added pb-24 for mobile to avoid content being hidden under the BottomNav */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth custom-scrollbar pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto">
           <PageRouter />
        </div>
        <Toast toast={toast} />
      </main>

      <BottomNav />
    </div>
  );
}

export default function App() {
  const [registerToken] = useState(getRegisterToken);
  if (registerToken) return <Register token={registerToken} />;

  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

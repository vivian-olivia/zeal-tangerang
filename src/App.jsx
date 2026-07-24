import React, { useContext } from 'react';
import { AppContext, AppProvider } from './context/AppContext.jsx';
import MobileTopBar from './components/MobileTopBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import BottomNav from './components/BottomNav.jsx';
import PageRouter from './components/PageRouter.jsx';
import Toast from './components/Toast.jsx';

function AppShell() {
  const { toast } = useContext(AppContext);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden relative">
      {/* Decorative background blur elements for youthful feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>

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
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

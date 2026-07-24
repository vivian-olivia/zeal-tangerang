import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Directory from '../pages/Directory.jsx';
import Profile from '../pages/Profile.jsx';
import DTree from '../pages/DTree.jsx';
import Pertemuan from '../pages/Pertemuan.jsx';
import ActivityDetail from '../pages/ActivityDetail.jsx';
import BibleStudy from '../pages/BibleStudy.jsx';
import BSDetail from '../pages/BSDetail.jsx';

export default function PageRouter() {
  const { currentPage } = useContext(AppContext);

  if (currentPage === 'dashboard') return <Dashboard />;
  if (currentPage === 'members') return <Directory />;
  if (currentPage.startsWith('profile_')) return <Profile id={parseInt(currentPage.split('_')[1])} />;
  if (currentPage === 'dtree') return <DTree />;
  if (currentPage === 'pertemuan') return <Pertemuan />;
  if (currentPage.startsWith('activity_detail_')) return <ActivityDetail id={parseInt(currentPage.split('_')[2])} />;
  if (currentPage === 'bs') return <BibleStudy />;
  if (currentPage.startsWith('bs_detail_')) return <BSDetail id={parseInt(currentPage.split('_')[2])} />;

  return <div className="p-12 text-center text-slate-400 font-medium text-lg">Halaman tidak ditemukan.</div>;
}

import React, { createContext, useEffect, useState } from 'react';
import { GROUPS, LOVE_LANGUAGES, GENDER_COLORS, LIFE_STATUS_COLORS, SERVICE_OPTIONS, MOCK_MEMBERS, MOCK_ACTIVITIES, MOCK_IBADAH, MOCK_BS } from '../data/mockData.js';

export const AppContext = createContext();

function getInitialDarkMode() {
  const stored = localStorage.getItem('zeal-theme');
  if (stored) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function AppProvider({ children }) {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [ibadah, setIbadah] = useState(MOCK_IBADAH);
  const [bsCases, setBsCases] = useState(MOCK_BS);

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeUser, setActiveUser] = useState(MOCK_MEMBERS[0]);
  const [toast, setToast] = useState(null);
  const [isDark, setIsDark] = useState(getInitialDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('zeal-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDark = () => setIsDark(prev => !prev);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Keeps activeUser in sync when a member edits their own profile
  const updateMember = (updatedMember) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    setActiveUser(prev => prev.id === updatedMember.id ? updatedMember : prev);
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

  const contextValue = {
    members, setMembers, updateMember, GROUPS, LOVE_LANGUAGES, GENDER_COLORS, LIFE_STATUS_COLORS, SERVICE_OPTIONS,
    activities, setActivities,
    ibadah, setIbadah,
    bsCases, setBsCases,
    currentPage, setCurrentPage,
    activeUser, setActiveUser,
    showToast,
    navigateTo,
    isDark, toggleDark,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

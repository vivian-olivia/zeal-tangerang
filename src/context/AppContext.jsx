import React, { createContext, useEffect, useMemo, useState } from 'react';
import { GROUPS, LOVE_LANGUAGES, GENDER_COLORS, LIFE_STATUS_COLORS, SERVICE_OPTIONS, MEETING_TYPES, MEETING_TYPE_STYLES } from '../data/mockData.js';
import { supabase } from '../lib/supabaseClient.js';
import { getInitialDarkMode, applyDarkClass } from '../lib/theme.js';

export const AppContext = createContext();

function memberFromRow(r) {
  return {
    id: r.id, name: r.name, role: r.role, group: r.group_id, status: r.status,
    loveLang: r.love_lang, gender: r.gender, bday: r.bday, spiritualBday: r.spiritual_bday,
    mentorId: r.mentor_id, partnerId: r.partner_id, phone: r.phone, service: r.service || [], education: r.education,
    job: r.job, email: r.email, authUserId: r.auth_user_id,
  };
}

function memberToRow(m) {
  return {
    name: m.name, role: m.role, group_id: m.group, status: m.status, love_lang: m.loveLang,
    gender: m.gender, bday: m.bday || null, spiritual_bday: m.spiritualBday || null,
    mentor_id: m.mentorId || null, partner_id: m.partnerId || null, phone: m.phone, service: m.service || [],
    education: m.education, job: m.job,
  };
}

function bsCaseFromRow(r) {
  return { id: r.id, personName: r.person_name, teacherId: r.teacher_id, status: r.status, sessions: r.sessions || [] };
}

export function AppProvider({ children }) {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  const [members, setMembers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [bsCases, setBsCases] = useState([]);

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pertemuanView, setPertemuanView] = useState('list');
  const [toast, setToast] = useState(null);
  const [isDark, setIsDark] = useState(getInitialDarkMode);

  useEffect(() => { applyDarkClass(isDark); }, [isDark]);
  const toggleDark = () => setIsDark(prev => !prev);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ---- Auth session lifecycle ----
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  // ---- Fetch members/activities/bsCases once a session exists ----
  useEffect(() => {
    if (!session) {
      setMembers([]);
      setActivities([]);
      setBsCases([]);
      setDataLoading(false);
      return;
    }
    let cancelled = false;
    setDataLoading(true);
    (async () => {
      const [mRes, aRes, bRes] = await Promise.all([
        supabase.from('members').select('*'),
        supabase.from('activities').select('*'),
        supabase.from('bs_cases').select('*'),
      ]);
      if (cancelled) return;
      if (mRes.error || aRes.error || bRes.error) {
        showToast('Gagal memuat data dari server.', 'error');
      }
      setMembers((mRes.data || []).map(memberFromRow));
      setActivities(aRes.data || []);
      setBsCases((bRes.data || []).map(bsCaseFromRow));
      setDataLoading(false);
    })();
    return () => { cancelled = true; };
  }, [session]);

  // Anonymous (guest) sessions never have a matching members row by design —
  // they get a synthetic read-only stand-in instead of the NotLinkedScreen,
  // with id -1 (never a real member id) and a role no permission check
  // anywhere in the app grants write access to, so every existing
  // leader/self-only gate stays correctly closed for guests automatically.
  const GUEST_USER = { id: -1, name: 'Tamu', role: 'guest', group: null, status: null, loveLang: null, gender: null, bday: null, spiritualBday: null, mentorId: null, partnerId: null, phone: null, service: [], education: null, job: null, email: null, authUserId: null };

  const activeUser = useMemo(() => {
    if (!session) return null;
    if (session.user.is_anonymous) return GUEST_USER;
    return members.find(m => m.authUserId === session.user.id) || null;
  }, [members, session]);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/' } });
  };

  const loginAsGuest = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    return { error };
  };

  const logout = async () => { await supabase.auth.signOut(); };

  // Keeps the local roster in sync (optimistic) while the write persists in the background.
  const updateMember = async (updatedMember) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    const { error } = await supabase.from('members').update(memberToRow(updatedMember)).eq('id', updatedMember.id);
    if (error) showToast('Gagal menyimpan perubahan ke server.', 'error');
  };

  const deleteMember = async (memberId) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
    const { error } = await supabase.from('members').delete().eq('id', memberId);
    if (error) { showToast('Gagal menghapus anggota.', 'error'); return { error }; }
    showToast('Anggota berhasil dihapus.');
    return {};
  };

  const addActivity = async ({ title, type, date, groups }) => {
    const { data, error } = await supabase.from('activities').insert({ title, type, date, groups, attendance: {} }).select().single();
    if (error) { showToast('Gagal menambahkan pertemuan.', 'error'); return { error }; }
    setActivities(prev => [data, ...prev]);
    return { data };
  };

  const updateActivityAttendance = async (activityId, memberId, status, reason = '') => {
    const target = activities.find(a => a.id === activityId);
    if (!target) return;
    const attendance = { ...target.attendance, [memberId]: { status, reason } };
    setActivities(prev => prev.map(a => a.id === activityId ? { ...a, attendance } : a));
    const { error } = await supabase.from('activities').update({ attendance }).eq('id', activityId);
    if (error) showToast('Gagal menyimpan kehadiran.', 'error');
  };

  const deleteActivity = async (activityId) => {
    setActivities(prev => prev.filter(a => a.id !== activityId));
    const { error } = await supabase.from('activities').delete().eq('id', activityId);
    if (error) { showToast('Gagal menghapus pertemuan.', 'error'); return { error }; }
    showToast('Pertemuan berhasil dihapus.');
    return {};
  };

  const addBsCase = async (personName, teacherId) => {
    const { data, error } = await supabase.from('bs_cases').insert({ person_name: personName, teacher_id: teacherId, status: 'Aktif', sessions: [] }).select().single();
    if (error) { showToast('Gagal membuat Bible Study baru.', 'error'); return { error }; }
    setBsCases(prev => [bsCaseFromRow(data), ...prev]);
    return { data };
  };

  const addBsSession = async (caseId, sessionForm) => {
    const target = bsCases.find(b => b.id === caseId);
    if (!target) return;
    const sessions = [{ ...sessionForm, id: Date.now() }, ...target.sessions];
    setBsCases(prev => prev.map(b => b.id === caseId ? { ...b, sessions } : b));
    const { error } = await supabase.from('bs_cases').update({ sessions }).eq('id', caseId);
    if (error) showToast('Gagal menyimpan sesi BS.', 'error');
  };

  const updateBsSession = async (caseId, updatedSession) => {
    const target = bsCases.find(b => b.id === caseId);
    if (!target) return;
    const sessions = target.sessions.map(s => s.id === updatedSession.id ? updatedSession : s);
    setBsCases(prev => prev.map(b => b.id === caseId ? { ...b, sessions } : b));
    const { error } = await supabase.from('bs_cases').update({ sessions }).eq('id', caseId);
    if (error) showToast('Gagal memperbarui sesi BS.', 'error');
  };

  const deleteBsSession = async (caseId, sessionId) => {
    const target = bsCases.find(b => b.id === caseId);
    if (!target) return;
    const sessions = target.sessions.filter(s => s.id !== sessionId);
    setBsCases(prev => prev.map(b => b.id === caseId ? { ...b, sessions } : b));
    const { error } = await supabase.from('bs_cases').update({ sessions }).eq('id', caseId);
    if (error) showToast('Gagal menghapus sesi BS.', 'error');
  };

  const deleteBsCase = async (caseId) => {
    setBsCases(prev => prev.filter(b => b.id !== caseId));
    const { error } = await supabase.from('bs_cases').delete().eq('id', caseId);
    if (error) { showToast('Gagal menghapus Bible Study.', 'error'); return { error }; }
    showToast('Bible Study berhasil dihapus.');
    return {};
  };

  const createInvite = async ({ groupId, note }) => {
    if (!activeUser) return { error: new Error('not authenticated') };
    const { data, error } = await supabase.from('invites').insert({ group_id: groupId, invited_by: activeUser.id, note }).select().single();
    if (error) { showToast('Gagal membuat undangan.', 'error'); return { error }; }
    return { data };
  };

  // Helper for hash routing within components
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash) {
        setCurrentPage(hash.replace('/', '_'));
      } else {
        // No hash yet (fresh load, or landed here straight from login) — reflect
        // the default page in the URL instead of leaving the address bar blank/bare.
        window.history.replaceState(null, '', '/#/dashboard');
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
    members, updateMember, deleteMember, GROUPS, LOVE_LANGUAGES, GENDER_COLORS, LIFE_STATUS_COLORS, SERVICE_OPTIONS,
    MEETING_TYPES, MEETING_TYPE_STYLES,
    activities, addActivity, updateActivityAttendance, deleteActivity,
    bsCases, addBsCase, addBsSession, updateBsSession, deleteBsSession, deleteBsCase,
    createInvite,
    currentPage, setCurrentPage,
    pertemuanView, setPertemuanView,
    session, authLoading, dataLoading, activeUser, login, loginWithGoogle, loginAsGuest, logout,
    showToast,
    navigateTo,
    isDark, toggleDark,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

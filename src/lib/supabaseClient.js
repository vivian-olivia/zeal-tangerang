import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn(
    'Supabase belum dikonfigurasi. Buat file .env.local (lihat .env.example) dengan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.'
  );
}

// Falls back to harmless placeholder values so createClient() doesn't throw during
// local dev before .env.local exists; every call will simply fail gracefully instead.
export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder');

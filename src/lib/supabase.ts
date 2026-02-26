import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Only initialize if we have a valid URL. 
// If missing, we'll export a mock client that doesn't crash the UI.
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } })
        })
    } as any;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. The site will load, but some dynamic features (like the ChatBot knowledge) may be limited.');
}

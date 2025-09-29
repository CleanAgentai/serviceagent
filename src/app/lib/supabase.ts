import { createClient } from '@supabase/supabase-js';
import { store } from '@/app/store/store' 

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  nodeEnv: import.meta.env.MODE,
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'present' : 'missing',
    key: supabaseAnonKey ? 'present' : 'missing',
  });
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}
const rememberMe = store.getState().remember.rememberMe
// console.log('Initializing Supabase client with rememberMe:', rememberMe)
// console.log('Initializing Supabase client with URL:', supabaseUrl);
// console.log(rememberMe)

export let supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  }
});

export const createSupabaseClient = () => {
  const rememberMe = store.getState().remember.rememberMe
  console.log('Creating Supabase with rememberMe:', rememberMe)
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: rememberMe ? localStorage : sessionStorage,
    },
  })
}

// helper to re-initialize if rememberMe changes later
export const reInitSupabase = () => {
  supabase = createSupabaseClient()
}

// Export auth-related functions
export const signOut = async () => {
  localStorage.removeItem('sb-sngxzcoviqrfsxqzbbmv-auth-token');
  sessionStorage.removeItem('sb-sngxzcoviqrfsxqzbbmv-auth-token');
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}; 
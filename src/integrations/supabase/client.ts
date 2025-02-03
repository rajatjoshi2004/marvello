import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://joxolpszmnvzflwdcfxy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveG9scHN6bW52emZsd2RjZnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTgxNzYsImV4cCI6MjA1NDA5NDE3Nn0.AQ8RU6dRUFudC8aQQl3K8u3L-P4B6zOxS8s1GGsML0g";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});
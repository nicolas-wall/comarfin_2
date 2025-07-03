import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a fallback client if environment variables are missing
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export type LoanApplication = {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  loan_amount: number;
  loan_term_months: number;
  message?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
};
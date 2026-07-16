import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://acotiiqjxoayzcoevusy.supabase.co';
const supabaseAnonKey = 'sb_publishable_WliEIHH9A58_N9W8ltp0wg_z2_RvyIQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sign up a new user with a role (patient or physio)
export async function signUpUser(email: string, password: string, role: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error };

  // Save their role and name into the profiles table
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: data.user.id, role, full_name: fullName });

    if (profileError) return { error: profileError };
  }

  return { data };
}

// Sign in an existing user
export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

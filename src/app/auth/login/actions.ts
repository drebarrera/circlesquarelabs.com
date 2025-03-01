'use server';

import { createClient } from '@/utils/supabase/server'

export async function login(username: string, password: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  })

  if (error) {
    return {ok: false, error: error}
  }

  return {ok: true, error: null}
}
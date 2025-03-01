"use server";

import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  "use server"; // Ensure it's a server function

  const supabase = await createClient();

  await supabase.auth.signOut();

  const cookieStore = await cookies();

  // Clear session cookies
  cookieStore.set("sb-access-token", "", { maxAge: -1 });
  cookieStore.set("sb-refresh-token", "", { maxAge: -1 });

  // Redirect user to login or home
  redirect("/");
}

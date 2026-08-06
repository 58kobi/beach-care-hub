import { supabase } from "@/integrations/supabase/client";

/**
 * Checks the signed-in user's admin role by reading their own role rows.
 * RLS only lets a user see their own roles, so this cannot be spoofed, and the
 * authoritative check still happens in the database policies on every query.
 */
export async function isCurrentUserAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  return Boolean(data);
}

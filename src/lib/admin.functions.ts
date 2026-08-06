import { createServerFn } from "@tanstack/react-start";

/**
 * Idempotently provisions the single allowed admin account from server-side
 * secrets. There is no UI or database policy that lets anyone else become an
 * admin: role rows are writable only by the service role.
 */
export const ensureAdminAccount = createServerFn({ method: "POST" }).handler(async () => {
  const email = process.env["ADMIN_EMAIL"];
  const password = process.env["ADMIN_PASSWORD"];
  if (!email || !password) return { ok: false as const };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
  let user = list?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase()) ?? null;

  if (!user) {
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: "OnTheBeachCare Admin" },
    });
    if (error) return { ok: false as const };
    user = created.user;
  }

  if (!user) return { ok: false as const };

  await supabaseAdmin
    .from("user_roles")
    .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });

  // Only this account may hold the admin role.
  await supabaseAdmin.from("user_roles").delete().eq("role", "admin").neq("user_id", user.id);

  return { ok: true as const };
});

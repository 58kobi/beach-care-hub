import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { ensureAdminAccount } from "@/lib/admin.functions";
import { isCurrentUserAdmin } from "@/lib/roles";


const title = "Admin sign in — OnTheBeachCare";
const description = "Restricted admin console access for the OnTheBeachCare claims team.";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const seedAdmin = useServerFn(ensureAdminAccount);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await seedAdmin();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signInError || !data.user) {
        setError("Invalid credentials.");
        return;
      }
      const isAdmin = await isCurrentUserAdmin(data.user.id);

      if (!isAdmin) {
        await supabase.auth.signOut();
        setError("This account does not have admin access.");
        return;
      }
      router.navigate({ to: "/admin", replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-sans">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="font-display text-xl font-bold text-navy">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-500">
          Restricted to the OnTheBeachCare claims team.
        </p>

        <label className="mt-5 block text-xs font-semibold text-slate-700">
          Email
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-normal outline-none focus:border-navy"
          />
        </label>
        <label className="mt-3 block text-xs font-semibold text-slate-700">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-normal outline-none focus:border-navy"
          />
        </label>

        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-2 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <Link to="/" className="mt-4 block text-center text-xs text-slate-500 hover:text-navy">
          ← Back to the site
        </Link>
      </form>
    </div>
  );
}

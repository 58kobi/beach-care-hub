import { createFileRoute, redirect, Outlet, Link, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin-login" });

    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: data.user.id,
      _role: "admin",
    });
    if (!isAdmin) throw redirect({ to: "/admin-login" });

    return { adminEmail: data.user.email ?? "" };
  },
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/claims", label: "Claims", exact: false },
  { to: "/admin/agents", label: "Agents", exact: false },
] as const;

function AdminLayout() {
  const { adminEmail } = Route.useRouteContext();
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/admin-login", replace: true });
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 font-sans text-slate-900">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="px-5 py-6">
          <p className="font-display text-lg font-bold text-navy">OnTheBeachCare</p>
          <p className="mt-0.5 text-xs text-slate-500">Admin console</p>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              activeProps={{ className: "bg-navy text-white hover:bg-navy" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-slate-200 p-4">
          <p className="truncate text-xs text-slate-500">{adminEmail}</p>
          <button
            onClick={signOut}
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-slate-600"
              activeProps={{ className: "bg-navy text-white" }}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={signOut} className="ml-auto text-xs font-semibold text-slate-500">
            Sign out
          </button>
        </header>
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

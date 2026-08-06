import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import {
  CLAIM_STATUSES,
  ISSUE_LABELS,
  ISSUE_TYPES,
  STATUS_LABELS,
  type ClaimStatus,
  type IssueType,
} from "@/lib/claims";

export const Route = createFileRoute("/admin/_auth/")({
  head: () => ({ meta: [{ title: "Overview — OnTheBeachCare Admin" }] }),
  component: Overview,
});

const STATUS_COLORS: Record<ClaimStatus, string> = {
  submitted: "#94a3b8",
  in_review: "#f59e0b",
  assigned: "#0ea5e9",
  in_progress: "#6366f1",
  resolved: "#10b981",
  rejected: "#f43f5e",
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
function daysAgo(n: number) {
  const d = startOfToday();
  d.setDate(d.getDate() - n);
  return d;
}

async function loadOverview() {
  const [claimsRes, profilesRes] = await Promise.all([
    supabase.from("claims").select("status, issue_type, created_at"),
    supabase.from("profiles").select("created_at"),
  ]);
  if (claimsRes.error) throw claimsRes.error;
  if (profilesRes.error) throw profilesRes.error;
  return { claims: claimsRes.data ?? [], profiles: profilesRes.data ?? [] };
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[12px] border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-navy">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[12px] border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
      <div className="mt-4 h-64">{children}</div>
    </div>
  );
}

function Overview() {
  const { data, isLoading } = useQuery({ queryKey: ["admin-overview"], queryFn: loadOverview });

  if (isLoading || !data) {
    return <p className="text-sm text-slate-500">Loading analytics…</p>;
  }

  const today = startOfToday().getTime();
  const weekAgo = daysAgo(7).getTime();

  const claims = data.claims;
  const totalClaims = claims.length;
  const newToday = claims.filter((c) => new Date(c.created_at).getTime() >= today).length;
  const inProgress = claims.filter((c) =>
    ["in_review", "assigned", "in_progress"].includes(c.status),
  ).length;
  const resolvedThisWeek = claims.filter(
    (c) => c.status === "resolved" && new Date(c.created_at).getTime() >= weekAgo,
  ).length;
  const totalAccounts = data.profiles.length;
  const newAccounts = data.profiles.filter(
    (p) => new Date(p.created_at).getTime() >= weekAgo,
  ).length;

  const accountSeries = Array.from({ length: 30 }, (_, i) => {
    const day = daysAgo(29 - i);
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    return {
      day: day.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      accounts: data.profiles.filter((p) => {
        const t = new Date(p.created_at).getTime();
        return t >= day.getTime() && t < next.getTime();
      }).length,
    };
  });

  const statusSeries = CLAIM_STATUSES.map((s) => ({
    status: STATUS_LABELS[s],
    key: s,
    count: claims.filter((c) => c.status === s).length,
  }));

  const issueSeries = ISSUE_TYPES.map((t) => ({
    type: ISSUE_LABELS[t],
    count: claims.filter((c) => c.issue_type === t).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Overview</h1>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <Kpi label="Total claims" value={totalClaims} />
        <Kpi label="New claims today" value={newToday} />
        <Kpi label="Claims in progress" value={inProgress} />
        <Kpi label="Resolved this week" value={resolvedThisWeek} />
        <Kpi label="Registered accounts" value={totalAccounts} />
        <Kpi label="New accounts this week" value={newAccounts} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Accounts created (last 30 days)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accountSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="accounts" stroke="#0f2f4f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Claims by status">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="status" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {statusSeries.map((entry) => (
                  <Cell key={entry.key} fill={STATUS_COLORS[entry.key as ClaimStatus]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="rounded-[12px] border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-700">Claims by issue type</h2>
        <ul className="mt-4 space-y-2">
          {issueSeries.map((row) => {
            const max = Math.max(1, ...issueSeries.map((r) => r.count));
            return (
              <li key={row.type} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-xs text-slate-600">{row.type}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span
                    className="block h-full rounded-full bg-navy"
                    style={{ width: `${(row.count / max) * 100}%` }}
                  />
                </span>
                <span className="w-8 text-right text-xs font-semibold text-slate-700">
                  {row.count}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export type { IssueType };

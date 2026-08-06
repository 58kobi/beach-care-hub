import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  CLAIM_STATUSES,
  ISSUE_LABELS,
  ISSUE_TYPES,
  STATUS_BADGE,
  STATUS_LABELS,
  nextStatus,
  type ClaimStatus,
  type IssueType,
} from "@/lib/claims";

export const Route = createFileRoute("/admin/_auth/claims/")({
  head: () => ({ meta: [{ title: "Claims — OnTheBeachCare Admin" }] }),
  component: ClaimsPage,
});

type ClaimRow = {
  id: string;
  reference: string;
  full_name: string;
  email: string;
  issue_type: IssueType;
  location: string;
  status: ClaimStatus;
  created_at: string;
  assigned_agent_id: string | null;
};

async function loadClaims() {
  const { data, error } = await supabase
    .from("claims")
    .select("id, reference, full_name, email, issue_type, location, status, created_at, assigned_agent_id")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ClaimRow[];
}

async function loadAgents() {
  const { data, error } = await supabase
    .from("agents")
    .select("id, name")
    .eq("active", true)
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function ClaimsPage() {
  const qc = useQueryClient();
  const { data: claims, isLoading } = useQuery({ queryKey: ["admin-claims"], queryFn: loadClaims });
  const { data: agents } = useQuery({ queryKey: ["admin-agents"], queryFn: loadAgents });

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [pickerFor, setPickerFor] = useState<string | null>(null);
  const [pickedAgent, setPickedAgent] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (claims ?? []).filter((c) => {
      if (statusFilter && c.status !== statusFilter) return false;
      if (typeFilter && c.issue_type !== typeFilter) return false;
      if (
        q &&
        !`${c.reference} ${c.full_name} ${c.email}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [claims, statusFilter, typeFilter, search]);

  async function applyUpdate(
    claim: ClaimRow,
    patch: { status: ClaimStatus; assigned_agent_id?: string },
    label: string,
  ) {
    setBusyId(claim.id);
    const { error } = await supabase.from("claims").update(patch).eq("id", claim.id);
    setBusyId(null);
    if (error) {
      toast.error("Couldn't update this claim.");
      return;
    }
    await qc.invalidateQueries({ queryKey: ["admin-claims"] });
    qc.invalidateQueries({ queryKey: ["admin-overview"] });
    setFlashId(claim.id);
    setTimeout(() => setFlashId(null), 1500);
    toast.success(`${claim.reference} → ${label}`);
  }

  function advance(claim: ClaimRow) {
    const next = nextStatus(claim.status);
    if (!next) return;
    void applyUpdate(claim, { status: next }, STATUS_LABELS[next]);
  }

  async function confirmAssign(claim: ClaimRow) {
    if (!pickedAgent) return;
    await applyUpdate(
      claim,
      { status: "assigned", assigned_agent_id: pickedAgent },
      STATUS_LABELS.assigned,
    );
    setPickerFor(null);
  }

  const selectClass =
    "rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-navy";

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-bold text-navy">Claims</h1>

      <div className="flex flex-wrap gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
        >
          <option value="">All statuses</option>
          {CLAIM_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={selectClass}
        >
          <option value="">All issue types</option>
          {ISSUE_TYPES.map((t) => (
            <option key={t} value={t}>
              {ISSUE_LABELS[t]}
            </option>
          ))}
        </select>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reference, name or email"
          className={`${selectClass} min-w-[240px] flex-1`}
        />
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-slate-200 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Full name</th>
              <th className="px-4 py-3">Issue type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-slate-500">
                  Loading claims…
                </td>
              </tr>
            )}
            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-slate-500">
                  No claims match these filters.
                </td>
              </tr>
            )}
            {rows.map((c) => {
              const next = nextStatus(c.status);
              return (
                <tr
                  key={c.id}
                  className={`border-b border-slate-100 transition-colors last:border-0 ${
                    flashId === c.id ? "bg-emerald-50" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold">
                    <Link
                      to="/admin/claims/$id"
                      params={{ id: c.id }}
                      className="text-navy underline-offset-2 hover:underline"
                    >
                      {c.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{c.full_name}</td>
                  <td className="px-4 py-3">{ISSUE_LABELS[c.issue_type]}</td>
                  <td className="px-4 py-3">{c.location}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {next ? (
                      <button
                        disabled={busyId === c.id}
                        onClick={() => advance(c)}
                        className="rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-2 disabled:opacity-50"
                      >
                        Advance →
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">Complete</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  CLAIM_STATUSES,
  ISSUE_LABELS,
  STATUS_BADGE,
  STATUS_LABELS,
  type ClaimStatus,
  type IssueType,
} from "@/lib/claims";

export const Route = createFileRoute("/admin/claims/$id")({
  head: () => ({ meta: [{ title: "Claim detail — OnTheBeachCare Admin" }] }),
  component: ClaimDetail,
});

type Claim = {
  id: string;
  reference: string;
  full_name: string;
  email: string;
  phone: string | null;
  issue_type: IssueType;
  location: string;
  description: string;
  status: ClaimStatus;
  assigned_agent_id: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

function ClaimDetail() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const [notes, setNotes] = useState("");
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data: claim, isLoading } = useQuery({
    queryKey: ["admin-claim", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("claims").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data as Claim | null;
    },
  });

  const { data: agents } = useQuery({
    queryKey: ["admin-agents-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("agents").select("id, name").order("name");
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: history } = useQuery({
    queryKey: ["admin-claim-history", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("claim_status_history")
        .select("id, from_status, to_status, created_at")
        .eq("claim_id", id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: attachments } = useQuery({
    queryKey: ["admin-claim-files", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("claim_attachments")
        .select("id, file_name, file_path")
        .eq("claim_id", id);
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    if (claim && !notesLoaded) {
      setNotes(claim.admin_notes ?? "");
      setNotesLoaded(true);
    }
  }, [claim, notesLoaded]);

  if (isLoading) return <p className="text-sm text-slate-500">Loading claim…</p>;
  if (!claim) return <p className="text-sm text-slate-500">Claim not found.</p>;

  async function update(patch: {
    status?: ClaimStatus;
    assigned_agent_id?: string | null;
    admin_notes?: string | null;
  }) {
    setSaving(true);
    const { error } = await supabase.from("claims").update(patch).eq("id", id);
    setSaving(false);
    if (error) {
      toast.error("Couldn't save changes.");
      return;
    }
    await qc.invalidateQueries({ queryKey: ["admin-claim", id] });
    qc.invalidateQueries({ queryKey: ["admin-claims"] });
    qc.invalidateQueries({ queryKey: ["admin-claim-history", id] });
    qc.invalidateQueries({ queryKey: ["admin-overview"] });
    toast.success("Claim updated");
  }

  const label = "block text-xs font-semibold text-slate-700";
  const field =
    "mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-navy";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/admin/claims" className="text-sm text-slate-500 hover:text-navy">
          ← Claims
        </Link>
        <h1 className="font-display text-2xl font-bold text-navy">{claim.reference}</h1>
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[claim.status]}`}
        >
          {STATUS_LABELS[claim.status]}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-[12px] border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-700">Customer report</h2>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ["Full name", claim.full_name],
                ["Email", claim.email],
                ["Phone", claim.phone ?? "—"],
                ["Issue type", ISSUE_LABELS[claim.issue_type]],
                ["Location", claim.location],
                ["Submitted", new Date(claim.created_at).toLocaleString()],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-slate-500">{k}</dt>
                  <dd className="text-sm text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm text-slate-700">
              {claim.description}
            </p>
          </section>

          <section className="rounded-[12px] border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-700">
              Internal notes{" "}
              <span className="font-normal text-slate-400">(never shown to the customer)</span>
            </h2>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${field} resize-none`}
              placeholder="Add context for the team…"
            />
            <button
              disabled={saving}
              onClick={() => void update({ admin_notes: notes.trim() || null })}
              className="mt-3 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-2 disabled:opacity-60"
            >
              Save notes
            </button>
          </section>

          <section className="rounded-[12px] border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-700">Attachments</h2>
            {(attachments ?? []).length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">No attachments on this claim.</p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {(attachments ?? []).map((a) => (
                  <li key={a.id}>{a.file_name ?? a.file_path}</li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-[12px] border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-700">Manage</h2>
            <label className={`${label} mt-3`}>
              Status
              <select
                value={claim.status}
                onChange={(e) => void update({ status: e.target.value as ClaimStatus })}
                className={field}
              >
                {CLAIM_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>
            <label className={`${label} mt-3`}>
              Assigned agent
              <select
                value={claim.assigned_agent_id ?? ""}
                onChange={(e) => void update({ assigned_agent_id: e.target.value || null })}
                className={field}
              >
                <option value="">Unassigned</option>
                {(agents ?? []).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="rounded-[12px] border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-700">Status history</h2>
            <ol className="mt-3 space-y-2 text-xs text-slate-600">
              {(history ?? []).map((h) => (
                <li key={h.id}>
                  <span className="font-semibold text-slate-800">
                    {h.from_status ? `${STATUS_LABELS[h.from_status as ClaimStatus]} → ` : ""}
                    {STATUS_LABELS[h.to_status as ClaimStatus]}
                  </span>
                  <span className="ml-2 text-slate-400">
                    {new Date(h.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

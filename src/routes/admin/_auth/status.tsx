import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/_auth/status")({
  head: () => ({ meta: [{ title: "Service status — OnTheBeachCare Admin" }] }),
  component: StatusAdmin,
});

type Row = Tables<"service_status">;

const STATES = [
  { value: "operational", label: "Operational" },
  { value: "degraded", label: "Degraded" },
  { value: "outage", label: "Outage" },
] as const;

function StatusAdmin() {
  const qc = useQueryClient();
  const [newName, setNewName] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, { status?: string; note?: string }>>({});

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-service-status"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_status")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  function refresh() {
    void qc.invalidateQueries({ queryKey: ["admin-service-status"] });
  }

  async function save(row: Row) {
    const edit = edits[row.id];
    if (!edit) return;
    setBusyId(row.id);
    const { error } = await supabase
      .from("service_status")
      .update({
        status: edit.status ?? row.status,
        note: (edit.note ?? row.note ?? "").trim() || null,
      })
      .eq("id", row.id);
    setBusyId(null);
    if (error) {
      toast.error("Couldn't update this service.");
      return;
    }
    setEdits((prev) => {
      const next = { ...prev };
      delete next[row.id];
      return next;
    });
    toast.success(`${row.name} updated`);
    refresh();
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const nextOrder = Math.max(0, ...(rows ?? []).map((r) => r.sort_order)) + 1;
    const { error } = await supabase
      .from("service_status")
      .insert({ name, sort_order: nextOrder });
    if (error) {
      toast.error(error.code === "23505" ? "That service already exists." : "Couldn't add it.");
      return;
    }
    setNewName("");
    toast.success("Service added");
    refresh();
  }

  async function remove(row: Row) {
    if (!window.confirm(`Remove "${row.name}" from the status page?`)) return;
    const { error } = await supabase.from("service_status").delete().eq("id", row.id);
    if (error) {
      toast.error("Couldn't remove this service.");
      return;
    }
    refresh();
  }

  const field =
    "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-navy";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Service status</h1>
        <p className="mt-1 text-sm text-slate-500">
          What you set here shows on the public status page and the banner on the home page.
        </p>
      </div>

      <div className="space-y-3">
        {isLoading && <p className="text-sm text-slate-500">Loading…</p>}
        {(rows ?? []).map((row) => {
          const edit = edits[row.id];
          const dirty = Boolean(edit);
          return (
            <div
              key={row.id}
              className="grid gap-3 rounded-[12px] border border-slate-200 bg-white p-4 md:grid-cols-[200px_160px_1fr_auto_auto] md:items-center"
            >
              <p className="text-sm font-semibold text-slate-800">{row.name}</p>
              <select
                value={edit?.status ?? row.status}
                onChange={(e) =>
                  setEdits((p) => ({ ...p, [row.id]: { ...p[row.id], status: e.target.value } }))
                }
                className={field}
              >
                {STATES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <input
                placeholder="Note shown to the public (optional)"
                value={edit?.note ?? row.note ?? ""}
                onChange={(e) =>
                  setEdits((p) => ({ ...p, [row.id]: { ...p[row.id], note: e.target.value } }))
                }
                className={field}
              />
              <button
                disabled={!dirty || busyId === row.id}
                onClick={() => void save(row)}
                className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-2 disabled:opacity-40"
              >
                Save
              </button>
              <button
                onClick={() => void remove(row)}
                className="rounded-md border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={add}
        className="flex flex-wrap items-end gap-3 rounded-[12px] border border-slate-200 bg-white p-4"
      >
        <label className="min-w-[220px] flex-1 text-xs font-semibold text-slate-700">
          Add a service
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            className={`mt-1.5 font-normal ${field}`}
          />
        </label>
        <button className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-2">
          Add
        </button>
      </form>
    </div>
  );
}

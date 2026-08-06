import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/_auth/agents")({
  head: () => ({ meta: [{ title: "Agents — OnTheBeachCare Admin" }] }),
  component: AgentsPage,
});

type Agent = { id: string; name: string; email: string | null; active: boolean };

function AgentsPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: agents, isLoading } = useQuery({
    queryKey: ["admin-agents-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("id, name, email, active")
        .order("name");
      if (error) throw error;
      return (data ?? []) as Agent[];
    },
  });

  function refresh() {
    qc.invalidateQueries({ queryKey: ["admin-agents-list"] });
    qc.invalidateQueries({ queryKey: ["admin-agents"] });
    qc.invalidateQueries({ queryKey: ["admin-agents-all"] });
  }

  async function addAgent(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from("agents")
      .insert({ name: name.trim(), email: email.trim() || null });
    setSaving(false);
    if (error) {
      toast.error("Couldn't add this agent.");
      return;
    }
    setName("");
    setEmail("");
    refresh();
    toast.success("Agent added");
  }

  async function toggle(agent: Agent) {
    const { error } = await supabase
      .from("agents")
      .update({ active: !agent.active })
      .eq("id", agent.id);
    if (error) {
      toast.error("Couldn't update this agent.");
      return;
    }
    refresh();
  }

  const field =
    "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-navy";

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Agents</h1>

      <form
        onSubmit={addAgent}
        className="flex flex-wrap items-end gap-3 rounded-[12px] border border-slate-200 bg-white p-4"
      >
        <label className="min-w-[180px] flex-1 text-xs font-semibold text-slate-700">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`mt-1.5 font-normal ${field}`}
          />
        </label>
        <label className="min-w-[180px] flex-1 text-xs font-semibold text-slate-700">
          Email (optional)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1.5 font-normal ${field}`}
          />
        </label>
        <button
          disabled={saving}
          className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-2 disabled:opacity-60"
        >
          Add agent
        </button>
      </form>

      <div className="overflow-x-auto rounded-[12px] border border-slate-200 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-slate-500">
                  Loading agents…
                </td>
              </tr>
            )}
            {!isLoading && (agents ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-slate-500">
                  No agents yet.
                </td>
              </tr>
            )}
            {(agents ?? []).map((a) => (
              <tr key={a.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium">{a.name}</td>
                <td className="px-4 py-3 text-slate-600">{a.email ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      a.active
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-100 text-slate-600"
                    }`}
                  >
                    {a.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => void toggle(a)}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {a.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

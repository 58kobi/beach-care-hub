import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/_auth/articles")({
  head: () => ({ meta: [{ title: "Help articles — OnTheBeachCare Admin" }] }),
  component: ArticlesAdmin,
});

type ArticleRow = Tables<"articles">;

type Draft = {
  id: string | null;
  title: string;
  slug: string;
  summary: string;
  body: string; // paragraphs separated by a blank line
  sort_order: string;
  published: boolean;
};

const emptyDraft: Draft = {
  id: null,
  title: "",
  slug: "",
  summary: "",
  body: "",
  sort_order: "0",
  published: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function ArticlesAdmin() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data: articles, isLoading } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ArticleRow[];
    },
  });

  function edit(a: ArticleRow) {
    setDraft({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary,
      body: a.body.join("\n\n"),
      sort_order: String(a.sort_order),
      published: a.published,
    });
    setSlugTouched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setDraft(emptyDraft);
    setSlugTouched(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const slug = draft.slug.trim();
    if (!SLUG_RE.test(slug)) {
      toast.error("The URL slug can only use lowercase letters, numbers and hyphens.");
      return;
    }
    const body = draft.body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (body.length === 0) {
      toast.error("Please write at least one paragraph.");
      return;
    }
    const payload = {
      title: draft.title.trim(),
      slug,
      summary: draft.summary.trim(),
      body,
      sort_order: Number.parseInt(draft.sort_order, 10) || 0,
      published: draft.published,
    };

    setSaving(true);
    const { error } = draft.id
      ? await supabase.from("articles").update(payload).eq("id", draft.id)
      : await supabase.from("articles").insert(payload);
    setSaving(false);

    if (error) {
      toast.error(
        error.code === "23505" ? "That URL slug is already used." : "Couldn't save this article.",
      );
      return;
    }
    toast.success(draft.id ? "Article updated" : "Article created");
    reset();
    void qc.invalidateQueries({ queryKey: ["admin-articles"] });
  }

  async function togglePublished(a: ArticleRow) {
    const { error } = await supabase
      .from("articles")
      .update({ published: !a.published })
      .eq("id", a.id);
    if (error) {
      toast.error("Couldn't update this article.");
      return;
    }
    void qc.invalidateQueries({ queryKey: ["admin-articles"] });
  }

  async function remove(a: ArticleRow) {
    if (!window.confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("articles").delete().eq("id", a.id);
    if (error) {
      toast.error("Couldn't delete this article.");
      return;
    }
    toast.success("Article deleted");
    if (draft.id === a.id) reset();
    void qc.invalidateQueries({ queryKey: ["admin-articles"] });
  }

  const label = "block text-xs font-semibold text-slate-700";
  const field =
    "mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-navy";

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-navy">Help articles</h1>

      <form
        onSubmit={save}
        className="space-y-4 rounded-[12px] border border-slate-200 bg-white p-4"
      >
        <h2 className="text-sm font-semibold text-slate-700">
          {draft.id ? "Edit article" : "New article"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Title
            <input
              required
              value={draft.title}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  title: e.target.value,
                  slug: slugTouched ? d.slug : slugify(e.target.value),
                }))
              }
              className={field}
            />
          </label>
          <label className={label}>
            URL slug
            <input
              required
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setDraft((d) => ({ ...d, slug: e.target.value }));
              }}
              className={field}
            />
          </label>
        </div>
        <label className={label}>
          Short summary
          <input
            value={draft.summary}
            onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
            className={field}
          />
        </label>
        <label className={label}>
          Article text <span className="font-normal text-slate-400">(leave a blank line between paragraphs)</span>
          <textarea
            required
            rows={10}
            value={draft.body}
            onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
            className={`${field} resize-y`}
          />
        </label>
        <div className="flex flex-wrap items-end gap-6">
          <label className={`${label} w-28`}>
            Order
            <input
              type="number"
              value={draft.sort_order}
              onChange={(e) => setDraft((d) => ({ ...d, sort_order: e.target.value }))}
              className={field}
            />
          </label>
          <label className="flex items-center gap-2 pb-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => setDraft((d) => ({ ...d, published: e.target.checked }))}
            />
            Published
          </label>
        </div>
        <div className="flex gap-3">
          <button
            disabled={saving}
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-2 disabled:opacity-60"
          >
            {draft.id ? "Save changes" : "Create article"}
          </button>
          {draft.id && (
            <button
              type="button"
              onClick={reset}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-[12px] border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-slate-500">
                  Loading articles…
                </td>
              </tr>
            )}
            {!isLoading && (articles ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-slate-500">
                  No articles yet.
                </td>
              </tr>
            )}
            {(articles ?? []).map((a) => (
              <tr key={a.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 text-slate-500">{a.sort_order}</td>
                <td className="px-4 py-3 font-medium">{a.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{a.slug}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      a.published
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-100 text-slate-600"
                    }`}
                  >
                    {a.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="space-x-2 px-4 py-3 text-right">
                  <button
                    onClick={() => edit(a)}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => void togglePublished(a)}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {a.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => void remove(a)}
                    className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50"
                  >
                    Delete
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

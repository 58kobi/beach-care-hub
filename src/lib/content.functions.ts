import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Article } from "./articles";

export type ServiceState = "operational" | "degraded" | "outage";

export type ServiceRow = {
  id: string;
  name: string;
  status: ServiceState;
  note: string | null;
};

export type ServiceSnapshot = {
  rows: ServiceRow[];
  updatedAt: string | null;
};

/** Published help articles, in the order staff set in the admin console. */
export const listArticles = createServerFn({ method: "POST" }).handler(
  async (): Promise<Article[]> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("articles")
        .select("slug, title, summary, body")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error || !data) return [];
      return data;
    } catch (err) {
      // Keep public pages up even if the database is unreachable or misconfigured.
      console.error("listArticles failed", err);
      return [];
    }
  },
);

export const getArticleBySlug = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().trim().min(1).max(200) }).parse(input))
  .handler(async ({ data }): Promise<Article | null> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: row } = await supabaseAdmin
        .from("articles")
        .select("slug, title, summary, body")
        .eq("slug", data.slug)
        .eq("published", true)
        .maybeSingle();
      return row ?? null;
    } catch (err) {
      console.error("getArticleBySlug failed", err);
      return null;
    }
  });

/** Live service status rows, editable by staff in the admin console. */
export const getServiceStatus = createServerFn({ method: "POST" }).handler(
  async (): Promise<ServiceSnapshot> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("service_status")
        .select("id, name, status, note, updated_at")
        .order("sort_order", { ascending: true });
      if (error || !data) return { rows: [], updatedAt: null };

      const rows: ServiceRow[] = data.map((r) => ({
        id: r.id,
        name: r.name,
        status: (["operational", "degraded", "outage"].includes(r.status)
          ? r.status
          : "operational") as ServiceState,
        note: r.note,
      }));
      const updatedAt = data.reduce<string | null>(
        (latest, r) => (latest === null || r.updated_at > latest ? r.updated_at : latest),
        null,
      );
      return { rows, updatedAt };
    } catch (err) {
      console.error("getServiceStatus failed", err);
      return { rows: [], updatedAt: null };
    }
  },
);

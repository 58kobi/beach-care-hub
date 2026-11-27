import type { ServiceSnapshot, ServiceState } from "./content.functions";

export const STATE_LABELS: Record<ServiceState, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};

export type StatusSummary = {
  tone: ServiceState;
  headline: string;
  detail: string;
};

const stamp = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function summarizeStatus(snapshot: ServiceSnapshot): StatusSummary {
  const hasOutage = snapshot.rows.some((r) => r.status === "outage");
  const hasDegraded = snapshot.rows.some((r) => r.status === "degraded");
  const tone: ServiceState = hasOutage ? "outage" : hasDegraded ? "degraded" : "operational";

  const headline =
    tone === "outage"
      ? "Service status: Some systems are down"
      : tone === "degraded"
        ? "Service status: Some systems are running slowly"
        : "Service status: All systems operational";

  const updated = snapshot.updatedAt ? ` · Last updated ${stamp.format(new Date(snapshot.updatedAt))} UTC` : "";
  const detail = (tone === "operational" ? "No known issues" : "We're working on it") + updated;

  return { tone, headline, detail };
}

export const TONE_CLASSES: Record<ServiceState, { box: string; dot: string; link: string }> = {
  operational: { box: "border-green/30 bg-green-bg", dot: "bg-green", link: "text-green" },
  degraded: {
    box: "border-amber-300 bg-amber-50",
    dot: "bg-amber-500",
    link: "text-amber-700",
  },
  outage: { box: "border-rose-300 bg-rose-50", dot: "bg-rose-500", link: "text-rose-700" },
};

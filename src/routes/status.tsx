import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { getServiceStatus } from "@/lib/content.functions";
import { STATE_LABELS, TONE_CLASSES, summarizeStatus } from "@/lib/status";

const title = "Service status — OnTheBeachCare";
const description = "Live operational status for OnTheBeachCare claim submission and tracking.";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/status" }],
  }),
  loader: () => getServiceStatus(),
  component: StatusPage,
});

function StatusPage() {
  const snapshot = Route.useLoaderData();
  const summary = summarizeStatus(snapshot);
  const tone = TONE_CLASSES[summary.tone];

  return (
    <PageShell
      title="Service status"
      intro={
        summary.tone === "operational"
          ? "All systems operational — no known issues."
          : "Some systems are affected. See the details below."
      }
    >
      <div className={`rounded-[12px] border px-5 py-4 ${tone.box}`}>
        <div className="flex items-center gap-3">
          <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />
          <p className="font-display text-sm font-semibold text-navy">
            {summary.headline.replace("Service status: ", "")}
          </p>
        </div>
        <p className="mt-1 pl-[22px] text-xs text-ink-soft">{summary.detail}</p>
      </div>

      <ul className="mt-6 overflow-hidden rounded-[12px] border border-line">
        {snapshot.rows.map((r, i) => {
          const t = TONE_CLASSES[r.status];
          return (
            <li
              key={r.id}
              className={"px-5 py-4 text-sm " + (i > 0 ? "border-t border-line" : "")}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-ink">{r.name}</span>
                <span className={`inline-flex items-center gap-2 text-xs font-semibold ${t.link}`}>
                  <span className={`h-2 w-2 rounded-full ${t.dot}`} /> {STATE_LABELS[r.status]}
                </span>
              </div>
              {r.note && <p className="mt-1 text-xs text-ink-soft">{r.note}</p>}
            </li>
          );
        })}
        {snapshot.rows.length === 0 && (
          <li className="px-5 py-4 text-sm text-ink-soft">No status information is available.</li>
        )}
      </ul>

      <p className="mt-6 text-sm text-ink-soft">
        Seeing something that doesn't look right?{" "}
        <Link to="/contact" className="font-semibold text-navy-3 hover:underline">
          Let us know
        </Link>
        .
      </p>
    </PageShell>
  );
}

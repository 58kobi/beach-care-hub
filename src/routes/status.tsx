import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";

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
  component: StatusPage,
});

const systems = [
  "Claim submission",
  "Claim tracking",
  "Email notifications",
  "Admin console",
];

function StatusPage() {
  return (
    <PageShell title="Service status" intro="All systems operational — no known issues.">
      <div className="rounded-[12px] border border-green/30 bg-green-bg px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-green" />
          <p className="font-display text-sm font-semibold text-navy">All systems operational</p>
        </div>
      </div>

      <ul className="mt-6 overflow-hidden rounded-[12px] border border-line">
        {systems.map((s, i) => (
          <li
            key={s}
            className={
              "flex items-center justify-between px-5 py-4 text-sm " +
              (i > 0 ? "border-t border-line" : "")
            }
          >
            <span className="text-ink">{s}</span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-green">
              <span className="h-2 w-2 rounded-full bg-green" /> Operational
            </span>
          </li>
        ))}
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

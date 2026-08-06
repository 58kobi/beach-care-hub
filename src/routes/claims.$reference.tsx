import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PageShell } from "@/components/landing/PageShell";
import { trackClaim } from "@/lib/claims.functions";
import {
  ISSUE_LABELS,
  STATUS_BADGE,
  STATUS_CHAIN,
  STATUS_LABELS,
  type ClaimStatus,
  type IssueType,
} from "@/lib/claims";

const title = "Claim status — OnTheBeachCare";
const description = "View the live status of your OnTheBeachCare claim.";

export const Route = createFileRoute("/claims/$reference")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search["email"] === "string" ? search["email"] : "",
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ClaimDetailPage,
});

function ClaimDetailPage() {
  const { reference } = Route.useParams();
  const { email: emailFromUrl } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [email, setEmail] = useState(emailFromUrl);
  const lookup = useServerFn(trackClaim);

  const { data, isFetching } = useQuery({
    queryKey: ["claim", reference, emailFromUrl],
    enabled: !!emailFromUrl,
    refetchInterval: 15000,
    queryFn: () => lookup({ data: { reference, email: emailFromUrl } }),
  });

  const claim = data?.found ? data.claim : null;

  return (
    <PageShell title={`Claim ${reference}`} intro="Live progress on your claim.">
      {!emailFromUrl && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { email: email.trim() } });
          }}
          className="grid gap-3 sm:grid-cols-[1fr_auto]"
        >
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email used on the claim"
            className="rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-3"
          />
          <button className="rounded-[8px] bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-2">
            View claim
          </button>
        </form>
      )}

      {emailFromUrl && isFetching && !claim && <p className="text-sm text-ink-soft">Loading…</p>}

      {emailFromUrl && !isFetching && !claim && (
        <div className="rounded-[10px] border border-line bg-paper p-4 text-sm text-ink-soft">
          We couldn't find a claim with that reference and email.{" "}
          <Link to="/track" className="font-semibold text-navy-3 hover:underline">
            Try again
          </Link>
        </div>
      )}

      {claim && (
        <div className="rounded-[14px] border border-line bg-white p-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-sm font-semibold text-navy">{claim.reference}</p>
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                STATUS_BADGE[claim.status as ClaimStatus]
              }`}
            >
              {STATUS_LABELS[claim.status as ClaimStatus]}
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            {ISSUE_LABELS[claim.issue_type as IssueType]} · {claim.location}
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            Submitted {new Date(claim.created_at).toLocaleString()}
          </p>

          <ol className="mt-6 space-y-3">
            {STATUS_CHAIN.map((s, idx) => {
              const currentIndex = STATUS_CHAIN.indexOf(claim.status as ClaimStatus);
              const done = currentIndex >= idx && currentIndex !== -1;
              return (
                <li key={s} className="flex items-center gap-3">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${
                      done ? "bg-navy text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className={done ? "text-sm text-ink" : "text-sm text-ink-soft"}>
                    {STATUS_LABELS[s]}
                  </span>
                </li>
              );
            })}
          </ol>

          <p className="mt-6 text-xs text-ink-soft">
            Last updated {new Date(claim.updated_at).toLocaleString()}
          </p>
        </div>
      )}
    </PageShell>
  );
}

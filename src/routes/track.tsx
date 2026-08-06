import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { trackClaim } from "@/lib/claims.functions";
import {
  ISSUE_LABELS,
  STATUS_BADGE,
  STATUS_CHAIN,
  STATUS_LABELS,
  type ClaimStatus,
  type IssueType,
} from "@/lib/claims";

const title = "Track my claim — OnTheBeachCare";
const description =
  "Enter your claim reference and email to see live progress on your OnTheBeachCare claim.";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/track" }],
  }),
  component: TrackPage,
});

function TrackPage() {
  const lookup = useServerFn(trackClaim);
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState<{ reference: string; email: string } | null>(null);

  const { data, isFetching } = useQuery({
    queryKey: ["track", query?.reference, query?.email],
    enabled: !!query,
    // keeps the status fresh while the page stays open
    refetchInterval: 15000,
    queryFn: () => lookup({ data: query! }),
  });

  const claim = data?.found ? data.claim : null;

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <div className="mx-auto max-w-2xl px-4 py-14">
        <h1 className="font-display text-3xl font-bold text-navy">Track my claim</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Enter the reference we sent you and the email you reported with.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery({ reference: reference.trim(), email: email.trim() });
          }}
          className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
        >
          <input
            required
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="OTB-26-XXXXXX"
            className="rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-3"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-3"
          />
          <button className="rounded-[8px] bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-2">
            Check status
          </button>
        </form>

        {query && !isFetching && !claim && (
          <p className="mt-6 rounded-[8px] border border-line bg-white p-4 text-sm text-ink-soft">
            We couldn't find a claim with that reference and email.
          </p>
        )}

        {claim && (
          <div className="mt-8 rounded-[14px] border border-line bg-white p-6">
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

            <ol className="mt-6 space-y-3">
              {STATUS_CHAIN.map((s) => {
                const currentIndex = STATUS_CHAIN.indexOf(claim.status as ClaimStatus);
                const idx = STATUS_CHAIN.indexOf(s);
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

            {claim.status === "rejected" && (
              <p className="mt-6 rounded-[8px] bg-rose-50 p-3 text-sm text-rose-700">
                This claim was closed as rejected. Reply to our email if you'd like it reviewed
                again.
              </p>
            )}

            <p className="mt-6 text-xs text-ink-soft">
              Last updated {new Date(claim.updated_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

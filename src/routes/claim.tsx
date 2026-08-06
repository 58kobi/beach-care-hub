import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { submitClaim, trackClaim } from "@/lib/claims.functions";
import {
  ISSUE_LABELS,
  ISSUE_TYPES,
  STATUS_BADGE,
  STATUS_LABELS,
  type ClaimStatus,
  type IssueType,
} from "@/lib/claims";

const title = "Submit a Claim — OnTheBeachCare";
const description =
  "Report a booking, refund, flight, hotel or beach safety issue online and track your claim with your reference number.";

export const Route = createFileRoute("/claim")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/claim" }],
  }),
  component: ClaimPage,
});

const fieldClass =
  "mt-1.5 w-full rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm font-normal text-ink outline-none placeholder:text-ink-soft focus:border-navy-3";

type Tab = "report" | "track";

function ClaimPage() {
  const [tab, setTab] = useState<Tab>("report");

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-[12px] border border-yellow-dark/40 bg-yellow/25 px-4 py-3 text-sm text-navy">
          <span className="mr-2">⚠️</span>
          Your claim is saved securely and you'll get a real reference number you can use to track
          progress at any time.
        </div>

        <div className="mt-6 grid grid-cols-2 gap-1 rounded-[10px] border border-line bg-white p-1">
          {(
            [
              ["report", "Report an Issue"],
              ["track", "Track a Claim"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={
                "rounded-[8px] px-4 py-2.5 text-sm font-semibold transition-colors " +
                (tab === key ? "bg-navy text-white" : "text-ink-soft hover:bg-paper")
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[14px] border border-line bg-white p-6">
          {tab === "report" ? <ReportPanel /> : <TrackPanel />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ReportPanel() {
  const send = useServerFn(submitClaim);
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setError(null);
    try {
      const res = await send({
        data: {
          full_name: String(form.get("full_name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          issue_type: String(form.get("issue_type") ?? "other") as IssueType,
          location: String(form.get("location") ?? ""),
          description: String(form.get("description") ?? ""),
        },
      });
      setReference(res.reference);
    } catch {
      setError("We couldn't submit your claim. Please check the details and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (reference) {
    return (
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-bg text-xl font-bold text-green">
          ✓
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold text-navy">Claim submitted</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
          Save this reference number — you'll need it, along with your email, to track your claim.
        </p>
        <div className="mx-auto mt-6 max-w-xs rounded-[10px] border border-line bg-paper p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Claim reference
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-navy">{reference}</p>
        </div>
        <button
          onClick={() => setReference(null)}
          className="mt-6 rounded-[8px] border border-line px-5 py-2.5 text-sm font-semibold text-navy hover:bg-paper"
        >
          Submit another claim
        </button>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-navy">Report an Issue</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Fill in the details below and an agent will follow up with you directly.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-xs font-semibold text-ink">
          Full name
          <input name="full_name" required className={fieldClass} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-ink">
            Email address
            <input
              name="email"
              type="email"
              required
              className={fieldClass}
            />
          </label>
          <label className="block text-xs font-semibold text-ink">
            Phone number
            <input
              name="phone"
              type="tel"
              className={fieldClass}
            />
          </label>
        </div>
        <label className="block text-xs font-semibold text-ink">
          Type of issue
          <select name="issue_type" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select an issue type
            </option>
            {ISSUE_TYPES.map((t) => (
              <option key={t} value={t}>
                {ISSUE_LABELS[t]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-semibold text-ink">
          Beach / location
          <input
            name="location"
            required
            className={fieldClass}
          />
        </label>
        <label className="block text-xs font-semibold text-ink">
          Description
          <textarea
            name="description"
            required
            rows={5}
            className={`resize-none ${fieldClass}`}
          />
        </label>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[8px] bg-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-2 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Report"}
        </button>
      </form>
    </>
  );
}

function TrackPanel() {
  const lookup = useServerFn(trackClaim);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [claim, setClaim] = useState<{
    reference: string;
    full_name: string;
    issue_type: string;
    location: string;
    status: string;
    created_at: string;
  } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setNotFound(false);
    setClaim(null);
    try {
      const res = await lookup({
        data: {
          reference: String(form.get("reference") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
        },
      });
      if (res.found) setClaim(res.claim as typeof claim);
      else setNotFound(true);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-navy">Track a Claim</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Enter your claim reference and the email you used to file it.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-xs font-semibold text-ink">
          Claim reference
          <input name="reference" required className={fieldClass} />
        </label>
        <label className="block text-xs font-semibold text-ink">
          Email address
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldClass}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[8px] bg-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-2 disabled:opacity-60"
        >
          {loading ? "Checking…" : "Track Claim"}
        </button>
      </form>

      {notFound && (
        <p className="mt-6 rounded-[8px] border border-line bg-paper p-4 text-sm text-ink-soft">
          We couldn't find a claim with that reference and email. Double-check both and try again.
        </p>
      )}

      {claim && (
        <dl className="mt-6 divide-y divide-line rounded-[10px] border border-line">
          <Row label="Status">
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                STATUS_BADGE[claim.status as ClaimStatus]
              }`}
            >
              {STATUS_LABELS[claim.status as ClaimStatus]}
            </span>
          </Row>
          <Row label="Reference">
            <span className="font-mono font-semibold text-navy">{claim.reference}</span>
          </Row>
          <Row label="Name">{claim.full_name}</Row>
          <Row label="Issue type">{ISSUE_LABELS[claim.issue_type as IssueType]}</Row>
          <Row label="Location">{claim.location}</Row>
          <Row label="Submitted">{new Date(claim.created_at).toLocaleString()}</Row>
        </dl>
      )}
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 px-4 py-3 text-sm">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/landing/PageShell";

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
  const navigate = useNavigate();
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");

  return (
    <PageShell
      title="Track a claim"
      intro="Enter the reference we sent you and the email you reported with."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({
            to: "/claims/$reference",
            params: { reference: reference.trim().toUpperCase() },
            search: { email: email.trim() },
          });
        }}
        className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
      >
        <input
          required
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Claim reference"
          className="rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-3"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-3"
        />
        <button className="rounded-[8px] bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-2">
          Check status
        </button>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        Lost your reference?{" "}
        <Link to="/contact" className="font-semibold text-navy-3 hover:underline">
          Contact us
        </Link>{" "}
        and we'll look it up for you.
      </p>
    </PageShell>
  );
}

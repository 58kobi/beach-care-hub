import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Prose } from "@/components/landing/PageShell";

const title = "Terms & conditions — OnTheBeachCare";
const description =
  "The terms that apply when you use the OnTheBeachCare claims and support service, including our disclaimer.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell title="Terms & conditions" intro="Last updated: 6 August 2026">
      <Prose>
        <h2>1. Who we are</h2>
        <p>
          OnTheBeachCare ("we", "us", "our") provides a support service for customers who booked
          travel through OnTheBeach.co.uk. We are not affiliated with, endorsed by, or operated by On
          The Beach Ltd.
        </p>
        <h2>2. What this service does</h2>
        <p>
          When you submit a claim through this site, a member of our team reviews it and works with
          you to try to resolve the issue.
        </p>
        <h2>3. Your responsibilities</h2>
        <p>
          You agree to provide accurate information when submitting a claim, including a valid email
          address and, where relevant, your genuine OnTheBeach booking reference. Submitting false or
          misleading claims may result in your claim being closed without further action.
        </p>
        <h2>4. Disclaimer</h2>
        <p>
          This site is an independent service. Nothing here should be read as an official
          communication from On The Beach Ltd, and references to that name are for identification
          only.
        </p>
        <h2>5. Limitation of liability</h2>
        <p>
          We aim to help resolve your issue but cannot guarantee a particular outcome, timeframe, or
          level of compensation. We are not liable for losses arising from your original travel
          booking itself — only for how we handle your claim once submitted to us.
        </p>
        <h2>6. Changes to these terms</h2>
        <p>
          We may update these terms from time to time; continued use of the site after changes means
          you accept the updated terms.
        </p>
        <h2>7. Contact</h2>
        <p>
          Questions about these terms can be sent via our{" "}
          <Link to="/contact" className="font-semibold text-navy-3 hover:underline">
            Contact page
          </Link>
          .
        </p>
        <p className="text-xs text-ink-soft">
          This is a starting template, not legal advice — have a solicitor review and finalise it
          before launch, especially given personal data and complaint information are collected.
        </p>
      </Prose>
    </PageShell>
  );
}

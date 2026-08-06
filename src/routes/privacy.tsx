import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Prose } from "@/components/landing/PageShell";

const title = "Privacy policy — OnTheBeachCare";
const description =
  "What data OnTheBeachCare collects when you submit a claim, how we use it, who can see it, and your rights.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell title="Privacy policy" intro="Last updated: 6 August 2026">
      <Prose>
        <h2>What we collect</h2>
        <p>
          When you submit a claim, we collect your email address, phone number, the issue details you
          provide, and any files you attach (photos, receipts, screenshots). If you create an
          account, we also store your login credentials, handled securely by our authentication
          provider.
        </p>
        <h2>How we use it</h2>
        <p>
          Solely to process and follow up on your claim, communicate with you about its status, and
          improve how we handle future claims. We do not sell your data to third parties.
        </p>
        <h2>Who can see it</h2>
        <p>
          Your claim is visible to you and to the OnTheBeachCare team member(s) assigned to review
          it. We do not share your information with On The Beach Ltd. or any other party without your
          consent, except where necessary to resolve your claim (for example, contacting a hotel on
          your behalf, with your permission).
        </p>
        <h2>How long we keep it</h2>
        <p>
          We retain claim data for as long as needed to resolve your case and for a reasonable period
          afterward for record-keeping, then delete or anonymise it.
        </p>
        <h2>Your rights</h2>
        <p>
          You can request a copy of your data, ask us to correct it, or request deletion by
          contacting us via the{" "}
          <Link to="/contact" className="font-semibold text-navy-3 hover:underline">
            Contact page
          </Link>
          .
        </p>
        <h2>Security</h2>
        <p>
          Data is stored using row-level security so only you and authorised team members can access
          your claim details. Attachments are stored privately and are not publicly accessible.
        </p>
      </Prose>
    </PageShell>
  );
}

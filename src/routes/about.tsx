import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Prose } from "@/components/landing/PageShell";

const title = "About us — OnTheBeachCare";
const description =
  "OnTheBeachCare is a claims and support service helping OnTheBeach customers get real help from a real person when something goes wrong.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      title="About OnTheBeachCare"
      intro="A claims and support service built for one purpose: helping people who booked through OnTheBeach.co.uk get real help from a real person."
    >
      <Prose>
        <p>
          OnTheBeachCare is a claims and support service built for one purpose: helping people who
          booked their holiday through OnTheBeach.co.uk get real help from a real person when
          something goes wrong.
        </p>
        <p>
          We're not a call centre and we're not a chatbot. When you submit a claim, it's reviewed and
          handled by a dedicated member of our team from start to finish — no re-explaining your
          problem to a new person every time you follow up.
        </p>
        <h2>What we help with</h2>
        <p>
          Booking errors, pricing disputes, hotels that don't match what was advertised, flight and
          transfer problems, cancellations, refund delays, and hazards or safety concerns at the
          resort or on the beach itself.
        </p>
        <h2>Disclaimer</h2>
        <p>
          OnTheBeachCare is an independent support service. We are not affiliated with, endorsed by,
          or operated by On The Beach Ltd. OnTheBeach is a trademark of its respective owner.
        </p>
        <p>
          Got a question before filing a claim?{" "}
          <Link to="/contact" className="font-semibold text-navy-3 hover:underline">
            Contact us
          </Link>{" "}
          — we're happy to point you in the right direction even if it turns out we can't help
          directly.
        </p>
      </Prose>
    </PageShell>
  );
}

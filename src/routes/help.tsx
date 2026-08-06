import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { ChevronRightIcon } from "@/components/landing/icons";
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/site";

const title = "Help Centre — OnTheBeachCare";
const description =
  "Guides and answers on filing a claim, tracking a refund, evidence to attach and what happens next.";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/help" }],
  }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <PageShell
      title="Help Centre"
      intro="Answers to the questions we get most, plus the fastest ways to reach a human."
    >
      <div className="flex flex-wrap gap-3">
        <Link
          to="/report"
          className="rounded-[8px] bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-2"
        >
          Report an issue
        </Link>
        <Link
          to="/track"
          className="rounded-[8px] border border-line px-5 py-2.5 text-sm font-semibold text-navy hover:bg-paper"
        >
          Track a claim
        </Link>
        <a
          href={SITE.phoneHref}
          className="rounded-[8px] border border-line px-5 py-2.5 text-sm font-semibold text-navy hover:bg-paper"
        >
          Call {SITE.phoneDisplay}
        </a>
      </div>

      <h2 className="mt-10 font-display text-xl font-bold text-navy">All articles</h2>
      <ul className="mt-4 overflow-hidden rounded-[12px] border border-line">
        {ARTICLES.map((a, i) => (
          <li key={a.slug} className={i > 0 ? "border-t border-line" : ""}>
            <Link
              to="/help/$articleSlug"
              params={{ articleSlug: a.slug }}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper"
            >
              <span className="min-w-0">
                <span className="block font-display text-sm font-semibold text-navy">{a.title}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{a.summary}</span>
              </span>
              <ChevronRightIcon className="h-4 w-4 shrink-0 text-navy-3" />
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Prose } from "@/components/landing/PageShell";
import { ARTICLES, getArticle } from "@/lib/articles";

export const Route = createFileRoute("/help/$articleSlug")({
  loader: ({ params }) => {
    const article = getArticle(params.articleSlug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — OnTheBeachCare" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.article.title} — OnTheBeachCare Help`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.article.summary },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.article.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  errorComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <PageShell title="Article not found" intro="That help article doesn't exist or has moved.">
      <Link to="/help" className="font-semibold text-navy-3 hover:underline">
        ← Back to the Help Centre
      </Link>
    </PageShell>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const others = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 4);

  return (
    <PageShell title={article.title} intro={article.summary}>
      <Prose>
        {article.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Prose>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/report"
          className="rounded-[8px] bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-2"
        >
          Report an issue
        </Link>
        <Link
          to="/contact"
          className="rounded-[8px] border border-line px-5 py-2.5 text-sm font-semibold text-navy hover:bg-paper"
        >
          Contact us
        </Link>
      </div>

      <h2 className="mt-10 font-display text-lg font-bold text-navy">More articles</h2>
      <ul className="mt-4 space-y-2">
        {others.map((a) => (
          <li key={a.slug}>
            <Link
              to="/help/$articleSlug"
              params={{ articleSlug: a.slug }}
              className="text-sm font-medium text-navy-3 hover:underline"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

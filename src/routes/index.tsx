import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { IssueCarousel } from "@/components/landing/IssueCarousel";
import { CategoryTiles } from "@/components/landing/CategoryTiles";
import { ReportedIssues } from "@/components/landing/ReportedIssues";
import { CtaBand } from "@/components/landing/CtaBand";
import { ReportIssueModal } from "@/components/landing/ReportIssueModal";
import { ArticlesContact } from "@/components/landing/ArticlesContact";
import { Faq } from "@/components/landing/Faq";
import { StatusBanner } from "@/components/landing/StatusBanner";
import { Footer } from "@/components/landing/Footer";

const title = "OnTheBeachCare — Independent claims & support";
const description =
  "Report booking problems, track refunds and get help with your OnTheBeach trip. Independent claims and support, handled by a real agent.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />
      <main>
        <Hero />
        <CategoryTiles />
        <ReportedIssues />
        <CtaBand onReport={() => setModalOpen(true)} />
        <ArticlesContact />
        <Faq />
        <StatusBanner />
      </main>
      <Footer />
      <ReportIssueModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import type { ServiceSnapshot } from "@/lib/content.functions";
import { TONE_CLASSES, summarizeStatus } from "@/lib/status";

export function StatusBanner({ snapshot }: { snapshot: ServiceSnapshot }) {
  const summary = summarizeStatus(snapshot);
  const tone = TONE_CLASSES[summary.tone];

  return (
    <section className="px-4 pb-16 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl flex-col gap-3 rounded-[12px] border px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${tone.box}`}
      >
        <div className="flex min-w-0 items-start gap-3">
          <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${tone.dot}`} />
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-navy">{summary.headline}</p>
            <p className="mt-0.5 text-xs text-ink-soft">{summary.detail}</p>
          </div>
        </div>
        <Link to="/status" className={`shrink-0 text-sm font-semibold hover:underline ${tone.link}`}>
          View status page →
        </Link>
      </div>
    </section>
  );
}

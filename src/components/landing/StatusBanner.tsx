export function StatusBanner() {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-[12px] border border-green/30 bg-green-bg px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-green" />
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-navy">
              Service status: All systems operational
            </p>
            <p className="mt-0.5 text-xs text-ink-soft">No known issues · Last updated today, 09:30</p>
          </div>
        </div>
        <a href="#" className="shrink-0 text-sm font-semibold text-green hover:underline">
          View status page →
        </a>
      </div>
    </section>
  );
}

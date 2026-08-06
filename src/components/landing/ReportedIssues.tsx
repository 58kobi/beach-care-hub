const issues = [
  {
    title: "Unexpected price increases at checkout",
    desc: "Final price differs from the price shown in search",
    tag: "Before travel",
    freq: "Very common",
    pct: 88,
  },
  {
    title: "Hard to reach a human agent",
    desc: "Long waits and looping automated support",
    tag: "Support access",
    freq: "Very common",
    pct: 82,
  },
  {
    title: "Hotel doesn't match the listing",
    desc: "Room type, facilities or photos differ on arrival",
    tag: "During travel",
    freq: "Common",
    pct: 74,
  },
  {
    title: "Booking cancelled by supplier after payment",
    desc: "Confirmed booking withdrawn after money was taken",
    tag: "Before travel",
    freq: "Common",
    pct: 61,
  },
  {
    title: "Refund delays after cancellation",
    desc: "Money owed takes far longer than quoted",
    tag: "After travel",
    freq: "Common",
    pct: 57,
  },
  {
    title: "Unclear extra fees",
    desc: "Charges added late in the booking flow",
    tag: "Before travel",
    freq: "Occasional",
    pct: 49,
  },
  {
    title: "Flight time changes with little notice",
    desc: "Schedule moved close to the departure date",
    tag: "Before travel",
    freq: "Occasional",
    pct: 40,
  },
  {
    title: "Broken umbrella stand or sunbed",
    desc: "Damaged beach equipment at the resort",
    tag: "Beach hazard",
    freq: "Occasional",
    pct: 34,
  },
  {
    title: "Trash on the shoreline",
    desc: "Litter and debris left along the beach",
    tag: "Beach hazard",
    freq: "Occasional",
    pct: 31,
  },
];

export function ReportedIssues() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-navy-3">Trends</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
            Most reported issues
          </h2>
        </div>
        <p className="max-w-md text-xs text-ink-soft md:text-right">
          Based on patterns commonly reported by OnTheBeach travellers — not a live count of claims
          filed through this site.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-[12px] border border-line">
        {issues.map((issue, i) => (
          <div
            key={issue.title}
            className={
              "grid gap-3 p-4 sm:grid-cols-[auto_minmax(0,1fr)_160px_110px] sm:items-center sm:gap-5 sm:p-5 " +
              (i > 0 ? "border-t border-line" : "")
            }
          >
            <span className="font-display text-lg font-bold text-line sm:text-2xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-sm font-semibold text-navy sm:text-base">
                {issue.title}
              </h3>
              <p className="mt-0.5 text-xs text-ink-soft">{issue.desc}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                {issue.tag}
              </p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-paper">
                <div className="h-full rounded-full bg-navy-3" style={{ width: `${issue.pct}%` }} />
              </div>
            </div>
            <p className="text-xs font-semibold text-ink sm:text-right">{issue.freq}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

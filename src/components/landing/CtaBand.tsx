export function CtaBand({ onReport }: { onReport: () => void }) {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[14px] bg-yellow px-6 py-12 text-center">
        <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          Spotted something wrong?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-navy/70">
          Whether it's a booking problem or a hazard at the resort, report it in under a minute — a
          real agent picks it up from there.
        </p>
        <button
          onClick={onReport}
          className="mt-6 rounded-[8px] bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-2"
        >
          Report an Issue
        </button>
      </div>
    </section>
  );
}

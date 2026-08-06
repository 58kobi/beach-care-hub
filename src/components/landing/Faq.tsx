import { useState } from "react";
import { PlusIcon } from "./icons";

const faqs = [
  {
    q: "What do I need to file a claim?",
    a: "Your OnTheBeach booking reference, a description of what happened, and any supporting evidence like photos, receipts or screenshots.",
  },
  {
    q: "How long until an agent reviews my claim?",
    a: "Every claim is assigned to a human agent within 24 hours of submission. You'll be able to see who's handling it from your dashboard.",
  },
  {
    q: "Can I track the progress of my claim?",
    a: "Yes — use the 'Track a Claim' link in the navigation, or log in to see all your claims and their current status in one place.",
  },
  {
    q: "Is there a cost to submit a claim?",
    a: "No, submitting a claim through OnTheBeachCare is free. You'll only ever deal with one dedicated agent from submission to resolution.",
  },
  {
    q: "What if I disagree with how my claim was resolved?",
    a: "You can reply directly within your claim thread to request a review, and your agent will follow up with next steps.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-[760px] text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-navy-3">FAQ</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
          Commonly asked questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft">
          Quick answers about filing and tracking a claim. For anything else, see Popular Articles
          above or contact us directly.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-[760px] overflow-hidden rounded-[12px] border border-line">
        {faqs.map((item, i) => (
          <div key={item.q} className={i > 0 ? "border-t border-line" : ""}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-sm font-semibold text-navy sm:text-base">
                {item.q}
              </span>
              <PlusIcon
                className={
                  "h-5 w-5 shrink-0 text-navy-3 transition-transform duration-200 " +
                  (open === i ? "rotate-45" : "")
                }
              />
            </button>
            {open === i && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

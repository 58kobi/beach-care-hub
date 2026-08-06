import { useState } from "react";
import { CloseIcon } from "./icons";

const issueTypes = [
  "Booking issue",
  "Payment / refund",
  "Flight or transfer",
  "Hotel / resort",
  "Cancellation",
  "Beach hazard",
  "Other",
];

const fieldClass =
  "w-full rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-navy-3";

export function ReportIssueModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Report an Issue"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] rounded-[14px] bg-white p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-navy">Report an Issue</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-soft hover:bg-paper"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <p className="mt-6 rounded-[8px] bg-green-bg p-4 text-sm text-green">
            Thanks — your report has been received. An agent will follow up with you directly.
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm text-ink-soft">
              Fill in the details below and an agent will follow up with you directly.
            </p>
            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-ink">
                  Email address
                  <input
                    type="email"
                    required
                    placeholder="careonthebeach@gmail.com"
                    className={`mt-1.5 font-normal ${fieldClass}`}
                  />
                </label>
                <label className="block text-xs font-semibold text-ink">
                  Phone number
                  <input
                    type="tel"
                    required
                    placeholder="+44 7000 000000"
                    className={`mt-1.5 font-normal ${fieldClass}`}
                  />
                </label>
              </div>
              <label className="block text-xs font-semibold text-ink">
                Type of issue
                <select required defaultValue="" className={`mt-1.5 font-normal ${fieldClass}`}>
                  <option value="" disabled>
                    Select an issue type
                  </option>
                  {issueTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-semibold text-ink">
                Beach / location
                <input
                  type="text"
                  required
                  placeholder="e.g. Diani Beach, Kenya"
                  className={`mt-1.5 font-normal ${fieldClass}`}
                />
              </label>
              <label className="block text-xs font-semibold text-ink">
                Description
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what happened…"
                  className={`mt-1.5 resize-none font-normal ${fieldClass}`}
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-[8px] bg-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-2"
              >
                Submit Report
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

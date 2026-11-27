import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CloseIcon } from "./icons";
import { recordEvidence, requestEvidenceUploads, submitClaim } from "@/lib/claims.functions";
import { EVIDENCE_ACCEPT, filesFromForm, uploadEvidence, validateEvidence } from "@/lib/evidence";
import { ISSUE_LABELS, ISSUE_TYPES } from "@/lib/claims";

const fieldClass =
  "w-full rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-navy-3";

export function ReportIssueModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const send = useServerFn(submitClaim);
  const requestUploads = useServerFn(requestEvidenceUploads);
  const recordUploads = useServerFn(recordEvidence);
  const [uploadNote, setUploadNote] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: String(form.get("full_name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      issue_type: String(form.get("issue_type") ?? "other") as (typeof ISSUE_TYPES)[number],
      location: String(form.get("location") ?? "").trim(),
      description: String(form.get("description") ?? "").trim(),
    };
    if (payload.full_name.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (payload.location.length < 2) {
      setError("Please tell us the beach or location.");
      return;
    }
    if (payload.description.length < 10) {
      setError("Please describe what happened in at least 10 characters.");
      return;
    }
    const files = filesFromForm(form);
    const fileProblem = validateEvidence(files);
    if (fileProblem) {
      setError(fileProblem);
      return;
    }
    setLoading(true);
    setError(null);
    setUploadNote(null);
    try {
      const res = await send({ data: payload });
      setReference(res.reference);
      if (files.length > 0) {
        try {
          const saved = await uploadEvidence({
            reference: res.reference,
            email: payload.email,
            files,
            requestUploads,
            recordUploads,
          });
          setUploadNote(`${saved} file${saved === 1 ? "" : "s"} attached.`);
        } catch {
          setUploadNote(
            "Your report was saved, but your files didn't upload. Email them to us quoting your reference.",
          );
        }
      }
    } catch {
      setError("We couldn't submit your report. Please check the details and try again.");
    } finally {
      setLoading(false);
    }
  }


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

        {reference ? (
          <div className="mt-6 rounded-[8px] bg-green-bg p-4 text-sm text-green">
            <p>Thanks — your report has been received.</p>
            <p className="mt-2">
              Your reference is <span className="font-mono font-bold">{reference}</span>. Keep it
              safe — you can track progress any time at <span className="font-semibold">/track</span>
              .
            </p>
            {uploadNote && <p className="mt-2">{uploadNote}</p>}
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-ink-soft">
              Fill in the details below and an agent will follow up with you directly.
            </p>
            <form className="mt-5 space-y-4" onSubmit={onSubmit}>
              <label className="block text-xs font-semibold text-ink">
                Full name
                <input
                  name="full_name"
                  type="text"
                  required
                  className={`mt-1.5 font-normal ${fieldClass}`}
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-ink">
                  Email address
                  <input
                    name="email"
                    type="email"
                    required
                    className={`mt-1.5 font-normal ${fieldClass}`}
                  />
                </label>
                <label className="block text-xs font-semibold text-ink">
                  Phone number
                  <input
                    name="phone"
                    type="tel"
                    className={`mt-1.5 font-normal ${fieldClass}`}
                  />
                </label>
              </div>
              <label className="block text-xs font-semibold text-ink">
                Type of issue
                <select
                  name="issue_type"
                  required
                  defaultValue=""
                  className={`mt-1.5 font-normal ${fieldClass}`}
                >
                  <option value="" disabled>
                    Select an issue type
                  </option>
                  {ISSUE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {ISSUE_LABELS[t]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-semibold text-ink">
                Beach / location
                <input
                  name="location"
                  type="text"
                  required
                  className={`mt-1.5 font-normal ${fieldClass}`}
                />
              </label>
              <label className="block text-xs font-semibold text-ink">
                Description
                <textarea
                  name="description"
                  required minLength={10}
                  rows={4}
                  className={`mt-1.5 resize-none font-normal ${fieldClass}`}
                />
              </label>

              <label className="block text-xs font-semibold text-ink">
                Evidence (optional)
                <input
                  name="evidence"
                  type="file"
                  multiple
                  accept={EVIDENCE_ACCEPT}
                  className={`mt-1.5 font-normal ${fieldClass}`}
                />
                <span className="mt-1 block text-[11px] font-normal text-ink-soft">
                  Photos, receipts or PDFs. Up to 5 files, 10 MB each.
                </span>
              </label>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[8px] bg-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-2 disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Submit Report"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

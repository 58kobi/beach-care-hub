export const CLAIM_STATUSES = [
  "submitted",
  "in_review",
  "assigned",
  "in_progress",
  "resolved",
  "rejected",
] as const;

export type ClaimStatus = (typeof CLAIM_STATUSES)[number];

/** Forward-only progression. `rejected` is deliberately NOT part of this chain. */
export const STATUS_CHAIN: ClaimStatus[] = [
  "submitted",
  "in_review",
  "assigned",
  "in_progress",
  "resolved",
];

export function nextStatus(current: ClaimStatus): ClaimStatus | null {
  const i = STATUS_CHAIN.indexOf(current);
  if (i === -1 || i === STATUS_CHAIN.length - 1) return null;
  return STATUS_CHAIN[i + 1] ?? null;
}

export const STATUS_LABELS: Record<ClaimStatus, string> = {
  submitted: "Submitted",
  in_review: "In Review",
  assigned: "Assigned",
  in_progress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

export const STATUS_BADGE: Record<ClaimStatus, string> = {
  submitted: "bg-slate-100 text-slate-700 border-slate-200",
  in_review: "bg-amber-50 text-amber-700 border-amber-200",
  assigned: "bg-sky-50 text-sky-700 border-sky-200",
  in_progress: "bg-indigo-50 text-indigo-700 border-indigo-200",
  resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

export const ISSUE_TYPES = [
  "booking",
  "payment_refund",
  "flight_transfer",
  "hotel_resort",
  "cancellation",
  "beach_hazard",
  "other",
] as const;

export type IssueType = (typeof ISSUE_TYPES)[number];

export const ISSUE_LABELS: Record<IssueType, string> = {
  booking: "Booking issue",
  payment_refund: "Payment / refund",
  flight_transfer: "Flight or transfer",
  hotel_resort: "Hotel / resort",
  cancellation: "Cancellation",
  beach_hazard: "Beach hazard",
  other: "Other",
};

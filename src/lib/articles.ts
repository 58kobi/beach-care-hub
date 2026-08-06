export type Article = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "how-do-i-file-a-claim",
    title: "How do I file a claim?",
    summary: "What you need before you start, and what happens after you press submit.",
    body: [
      "Filing a claim takes about a minute. Open the Report an Issue page, choose the category that best matches your problem, and describe what happened in your own words.",
      "Before you start, have your OnTheBeach booking reference to hand, along with the email address you booked with. If you have photos, receipts or screenshots, note them down — you can send them to us by email once you have your claim reference.",
      "When you submit, we generate a claim reference that looks like OTB-26-XXXXXX. Save it. That reference plus your email is how you check progress on the Track a Claim page.",
      "A member of our team reviews every new claim, usually within one business day, and contacts you by email with the next step.",
    ],
  },
  {
    slug: "how-long-does-a-refund-take",
    title: "How long does a refund take?",
    summary: "Typical timeframes for refunds and what slows them down.",
    body: [
      "Refund timeframes depend on who is holding the money — the travel provider, the airline, or the card issuer. Most refunds we chase are settled within 14 to 28 days of being approved.",
      "Card refunds can take a further 3 to 5 working days to appear on your statement after they are released.",
      "The most common causes of delay are a mismatch between the name on the booking and the name on the payment card, missing documentation, or a dispute that has been escalated to a supplier.",
      "You can see exactly where your case sits at any time on the Track a Claim page.",
    ],
  },
  {
    slug: "how-do-i-track-my-claim",
    title: "How do I track my claim?",
    summary: "Use your reference and email to see live progress.",
    body: [
      "Go to Track a Claim, enter the reference we gave you when you submitted, and the email address you used. You will see the current status and when it last changed.",
      "Claims move through a fixed sequence: Submitted, In Review, Assigned, In Progress, and Resolved. A claim that cannot be taken forward is marked Rejected, and we always explain why by email.",
      "The status page refreshes automatically while it is open, so you do not need to keep reloading it.",
    ],
  },
  {
    slug: "what-evidence-should-i-attach",
    title: "What evidence should I attach?",
    summary: "The documents that make a claim far more likely to succeed.",
    body: [
      "The strongest claims include the original booking confirmation, the payment receipt or card statement line, and any written communication with the provider.",
      "For hotel or resort problems, dated photographs are extremely useful — a room that does not match the listing, a facility that was closed, or a safety hazard on the property or beach.",
      "For flight and transfer issues, keep boarding passes, delay notices and any receipts for costs you had to cover yourself.",
      "Email anything you have to our support address quoting your claim reference, and it will be attached to your case.",
    ],
  },
  {
    slug: "can-i-add-more-info-after-submitting",
    title: "Can I add more info after submitting?",
    summary: "Yes — here is how to add detail to an open claim.",
    body: [
      "You can add information to a claim at any point before it is resolved. Reply to the email thread for your claim, or email us quoting your reference number.",
      "Anything you send is added to the case notes your assigned agent works from, so there is no need to repeat the background.",
      "If your claim has already been resolved and new evidence appears, contact us anyway — we can reopen a case where it is justified.",
    ],
  },
  {
    slug: "what-counts-as-a-valid-claim",
    title: "What counts as a valid claim?",
    summary: "The kinds of problems we can genuinely help with.",
    body: [
      "We handle booking errors, pricing disputes, hotels that do not match what was advertised, flight and transfer problems, cancellations, refund delays, and safety hazards at the resort or on the beach.",
      "A valid claim describes something that actually went wrong with a booking or stay, includes accurate details, and is submitted by the person who made or travelled on the booking.",
      "We cannot help with disputes that are already in court, and we do not submit claims on your behalf without your agreement to the outcome being sought.",
    ],
  },
  {
    slug: "who-reviews-my-claim",
    title: "Who reviews my claim?",
    summary: "One named person handles your case from start to finish.",
    body: [
      "Every claim is reviewed by a member of the OnTheBeachCare team and then assigned to a single agent who owns it until it is closed.",
      "That means you never have to re-explain your problem to someone new when you follow up.",
      "You will see the Assigned status on your tracking page as soon as an agent has picked up your case.",
    ],
  },
  {
    slug: "what-if-i-disagree-with-the-outcome",
    title: "What if I disagree with the outcome?",
    summary: "How to ask for a case to be reviewed again.",
    body: [
      "If you are not happy with how a claim was resolved, reply to the closing email or contact us with your reference number and tell us what you think was missed.",
      "A different member of the team will look at the case again, including any new evidence you provide.",
      "If we still cannot help, we will tell you plainly and point you to the ombudsman or regulator best placed to take it further.",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

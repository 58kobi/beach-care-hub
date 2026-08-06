# OnTheBeachCare — Landing Page

A single-page site for an independent claims & support service, built exactly to the supplied spec: navy/yellow design system, Poppins headings + Inter body, and eleven stacked sections.

## What gets built

1. **Top accent bar** — 6px yellow strip.
2. **Navigation** — logo mark (yellow rounded square, navy wave icon) + wordmark and "Independent claims & support" subtext; right-side links (Log in, My Claims, Saved Claims) and hamburger; second tab row (Help Centre active, Report an Issue, Manage Claim, Refund Status, Contact Us).
3. **Hero search banner** — 135° navy → navy-3 gradient with two soft blurred circles, centered H1/subtext and white search bar with yellow Search button.
4. **Category tiles** — 8 cards in a 4-col grid (2-col mobile), overlapping the hero by 64px, each with icon chip, title, description.
5. **Most reported issues** — TRENDS eyebrow, heading, right-aligned disclaimer note, and a bordered list of 9 ranked rows with category tag, progress bar (88/82/74/61/57/49/40/34/31%) and frequency label. Tag + frequency stack under the title on mobile.
6. **Yellow CTA band** — rounded inset yellow card with heading, subtext and navy "Report an Issue" button.
7. **Report an Issue modal** — opened by the CTA; email + phone side by side, issue-type select, beach/location, description textarea, all required, full-width navy submit. Submitting shows a success confirmation (no backend).
8. **Popular articles + Contact us** — 60/40 split; 8 chevron article links in two columns; 2x2 contact cards (Call, Live chat, Email, WhatsApp). Stacks to one column on mobile.
9. **FAQ accordion** — 5 questions from the spec, first open, "+" rotating 45° to "×".
10. **Status banner** — green-tinted rounded bar with dot, status text and status-page link.
11. **Footer** — navy, 5 columns (brand + Service / Help / Legal / Company with email, WhatsApp, phone and online-form entries), bottom bar with copyright and disclaimer.

Constraints honoured: no ABTA/ATOL marks, all icons are custom 1.8px-stroke outline SVGs, fully responsive.

## Technical notes

- Rewrite `src/routes/index.tsx` as the landing page with its own `head()` (title, description, og/twitter tags) — the placeholder home page is replaced.
- Add the palette (navy, navy-2, navy-3, yellow, yellow-dark, ink, ink-soft, line, paper, green, green-bg) as oklch tokens in `src/styles.css` under `:root` and register them in `@theme inline`; no hardcoded hex in components.
- Load Poppins and Inter via a `<link>` in `src/routes/__root.tsx`, mapped to `--font-display` / `--font-sans` tokens.
- Split into components under `src/components/landing/` (Nav, Hero, CategoryTiles, ReportedIssues, CtaBand, ReportIssueModal, ArticlesContact, Faq, StatusBanner, Footer) plus a small icon set file.
- Modal and accordion use local React state; no backend or database is involved.

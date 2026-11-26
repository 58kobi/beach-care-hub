# Beach Care Hub

lets build ,OnTheBeachCare --Landing Page Build Prompt

Build a single landing page for "OnTheBeachCare," an independent claims and support website for OnTheBeach. Use React + Tailwind CSS. Match the design system and section order below exactly.

Design System

Colors (use as CSS variables / Tailwind custom colors):

navy: #101B4C (primary dark — headers, footer, hero background start)

navy-2: #182566 (secondary dark)

navy-3: #1F2E80 (hero background end, links, icons, accents)

yellow: #FFD400 (primary CTA color, top accent bar, logo mark background)

yellow-dark: #E8BF00 (yellow hover state)

ink: #16203B (body text)

ink-soft: #5B6478 (secondary/muted text)

line: #E4E6F0 (borders, dividers)

paper: #F6F7FB (light section backgrounds, icon chip backgrounds)

green: #1E8A5F (status "operational" indicator)

green-bg: #EAF7F1 (status banner background)

Base page background: white (#FFFFFF)

Typography:

Headings: "Poppins" (weights 500/600/700/800), uppercase not required except accents

Body: "Inter" (weights 400/500/600/700)

Border radius: 8px standard, 10-14px for tiles/cards/CTA band

Page Structure (top to bottom)

1. Top accent bar

A thin 6px solid yellow bar spanning the full width at the very top of the page.

2. Navigation

White background, bottom border (1px, line color)

Left: logo mark (40x40px, rounded square, yellow background, simple wave/beach icon in navy) + wordmark "OnTheBeachCare" (bold, navy) with small subtext underneath: "Independent claims & support" (muted gray)

Right: text links "Log in", "My Claims", "Saved Claims", plus a hamburger icon (3 lines, navy)

Below the main nav: a second row of tab-style links: "Help Centre" (active/underlined in navy), "Report an Issue", "Manage Claim", "Refund Status", "Contact Us". Active tab has a navy bottom border and light paper background.

3. Hero search banner

Diagonal gradient background from navy to navy-3 (135deg)

Two large soft circular blur shapes in the background (subtle, low-opacity yellow and white) for texture

Centered content, max-width ~680px:

H1 in white: "How can we help you today?"

Subtext in light gray/white-70%: "Search for answers, check a claim, or report something that went wrong with your OnTheBeach trip."

A white rounded search bar with a text input ("Search help articles, claim status, or a topic…") and a yellow "Search" button (navy text) on the right

Generous vertical padding (~64px top, ~100px bottom so the next section can overlap it)

4. Category tiles (overlaps hero by ~64px using negative margin)

A 4-column grid (2-column on mobile) of 8 white cards with light borders and soft shadow, each containing:

A small rounded icon chip (paper background, navy-3 icon, ~44px)

Bold title, small muted description

Tiles, in order:

Booking Issues — "Errors, mismatches or pricing disputes"

Payments & Refunds — "Failed payments, delays and refund status"

Flights & Transfers — "Delays, changes and airport transport"

Hotels & Resorts — "Doesn't match listing or safety concerns"

Cancellations — "Date changes and cancellation disputes"

Claim Status — "Check progress on an open claim"

Contact Us — "Reach a support agent directly"

Other Help — "Travel docs, baggage, insurance and more"

5. Most Reported Issues

Section eyebrow label "TRENDS" (navy-3, uppercase, small, bold) + heading "Most reported issues"

Right-aligned note: "Based on patterns commonly reported by OnTheBeach travellers — not a live count of claims filed through this site."

A bordered, rounded list container with 9 rows, each row divided by a top border, containing:

Large muted rank number (01–09)

Title (bold, navy) + one-line description (muted)

A category tag (small caps label like "Before travel", "During travel", "After travel", "Support access", "Beach hazard") with a thin horizontal progress bar underneath (navy-3 fill) representing relative frequency

Right-aligned frequency label ("Very common" / "Common" / "Occasional")

Rows in order:

Unexpected price increases at checkout — Before travel — Very common (88%)

Hard to reach a human agent — Support access — Very common (82%)

Hotel doesn't match the listing — During travel — Common (74%)

Booking cancelled by supplier after payment — Before travel — Common (61%)

Refund delays after cancellation — After travel — Common (57%)

Unclear extra fees — Before travel — Occasional (49%)

Flight time changes with little notice — Before travel — Occasional (40%)

Broken umbrella stand or sunbed — Beach hazard — Occasional (34%)

Trash on the shoreline — Beach hazard — Occasional (31%)

6. Yellow "Report an Issue" CTA band

Full-width rounded card (14px radius) with solid yellow background, inset margin from page edges

Centered: H2 "Spotted something wrong?", muted-navy subtext "Whether it's a booking problem or a hazard at the resort, report it in under a minute — a real agent picks it up from there."

A solid navy button with white text: "Report an Issue"

Clicking the button opens a modal (see below)

7. Report an Issue modal

Triggered by the CTA button. White rounded modal (max-width ~480px), centered overlay with dark navy semi-transparent backdrop.

Header: "Report an Issue" + small circular close (✕) button

Subtext: "Fill in the details below and an agent will follow up with you directly."

Form fields, in order:

Email address (input, type email) and Phone number (input, type tel) — side by side

Type of issue — dropdown/select with options: Booking issue, Payment / refund, Flight or transfer, Hotel / resort, Cancellation, Beach hazard, Other

Beach / location — text input (placeholder: "e.g. Diani Beach, Kenya")

Description — textarea (placeholder: "Tell us what happened…")

Full-width solid navy "Submit Report" button at the bottom

All fields required

8. Popular articles + Contact us (two-column split, ~60/40 width)

Left panel — "Popular articles" heading + "View all articles →" link, two-column list of 8 article links with chevron arrows:

How do I file a claim?

How long does a refund take?

How do I track my claim?

What evidence should I attach?

Can I add more info after submitting?

What counts as a valid claim?

Who reviews my claim?

What if I disagree with the outcome?

Right panel — "Contact us" heading + "Our team is here to help" subtext, 2x2 grid of contact method cards (bordered, rounded), each with icon, title, one-line description, and a link:

Call us — "Lines open 7 days a week" — View numbers

Live chat — "Chat with our support team" — Start chat

Email us — "We reply within one business day" — Send email

WhatsApp — "Message us directly" — Message us

9. FAQ (accordion)

Centered eyebrow "FAQ" + heading "Commonly asked questions" + subtext "Quick answers about filing and tracking a claim. For anything else, see Popular Articles above or contact us directly."

Bordered rounded list container, max-width ~760px, centered

6 expandable accordion items (click question to expand/collapse; a "+" icon rotates 45° to become "×" when open). First item open by default.

Questions:

What do I need to file a claim? — "Your OnTheBeach booking reference, a description of what happened, and any supporting evidence like photos, receipts or screenshots."

How long until an agent reviews my claim? — "Every claim is assigned to a human agent within 24 hours of submission. You'll be able to see who's handling it from your dashboard."

Can I track the progress of my claim? — "Yes — use the 'Track a Claim' link in the navigation, or log in to see all your claims and their current status in one place."

Is there a cost to submit a claim? — "No, submitting a claim through OnTheBeachCare is free. You'll only ever deal with one dedicated agent from submission to resolution."

What if I disagree with how my claim was resolved? — "You can reply directly within your claim thread to request a review, and your agent will follow up with next steps."

10. Status banner

Full-width rounded bar, light green background (green-bg), green border, with a green dot + bold text "Service status: All systems operational" and muted subtext "No known issues · Last updated today, 09:30". Right-aligned link "View status page →".

11. Footer

Solid navy background, white/muted text

5-column grid: brand column (logo + tagline + short description: support and claims service for OnTheBeach customers. Not affiliated with, endorsed by, or operated by On The Beach Ltd.") + four link columns:

Service: Report an issue, Track my claim, Report types

Help: Help Centre, Contact us, Status page

Legal: Terms & conditions, Privacy policy, Disclaimer

Company: About us, Contact,,,add company email,whatApp ,phone call or submit and online form 

Bottom bar (divider above): "© 2026 OnTheBeachCare. All rights reserved." on the left, small muted disclaimer on the right: 

Important constraints



Do NOT include ABTA or ATOL logos/badges anywhere on the page for now 

All icons should be simple outline/line-style SVGs (stroke, not filled), consistent 1.8px stroke weight.

Fully responsive: tiles collapse to 2 columns on mobile, the popular articles/contact split stacks to 1 column, the reported-issues rows stack their tag/frequency under the title on small screens.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://beach-care-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/229117e0-d64f-41bc-9589-c1d1010bee2e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

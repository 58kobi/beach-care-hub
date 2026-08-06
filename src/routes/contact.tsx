import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { ChatIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/landing/icons";
import { SITE } from "@/lib/site";

const title = "Contact us — OnTheBeachCare";
const description =
  "Call, email, WhatsApp or message the OnTheBeachCare support team about a booking, refund or claim.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const channels = [
  {
    Icon: PhoneIcon,
    title: "Call us",
    desc: "Lines open 7 days a week, 9am–7pm UK time",
    label: SITE.phoneDisplay,
    href: SITE.phoneHref,
  },
  {
    Icon: MailIcon,
    title: "Email us",
    desc: "We reply within one business day",
    label: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    Icon: WhatsAppIcon,
    title: "WhatsApp",
    desc: "Message us directly with photos or receipts",
    label: SITE.phoneDisplay,
    href: SITE.whatsapp,
  },
];

function ContactPage() {
  return (
    <PageShell
      title="Contact us"
      intro="Got a question before filing a claim? We're happy to point you in the right direction."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {channels.map(({ Icon, title: t, desc, label, href }) => (
          <a
            key={t}
            href={href}
            className="rounded-[12px] border border-line p-4 transition-shadow hover:shadow-md"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-paper text-navy-3">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-3 font-display text-sm font-semibold text-navy">{t}</h2>
            <p className="mt-1 text-xs text-ink-soft">{desc}</p>
            <p className="mt-2 break-words text-xs font-semibold text-navy-3">{label}</p>
          </a>
        ))}
      </div>

      <div
        id="chat"
        className="mt-8 rounded-[12px] border border-line bg-paper p-5 scroll-mt-24"
      >
        <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white text-navy-3">
          <ChatIcon className="h-5 w-5" />
        </span>
        <h2 className="mt-3 font-display text-base font-semibold text-navy">Live chat</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Our live chat team is available 9am–7pm UK time. Outside those hours, WhatsApp is the
          fastest way to reach us and we'll reply first thing.
        </p>
        <a
          href={SITE.whatsapp}
          className="mt-4 inline-block rounded-[8px] bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-2"
        >
          Start a chat on WhatsApp
        </a>
      </div>

      <div className="mt-8 rounded-[12px] border border-line p-5">
        <h2 className="font-display text-base font-semibold text-navy">Reporting a problem?</h2>
        <p className="mt-1 text-sm text-ink-soft">
          The quickest route is the online form — you'll get a reference number straight away.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/report"
            className="rounded-[8px] bg-yellow px-5 py-2.5 text-sm font-semibold text-navy hover:bg-yellow-dark"
          >
            Report an issue
          </Link>
          <Link
            to="/track"
            className="rounded-[8px] border border-line px-5 py-2.5 text-sm font-semibold text-navy hover:bg-paper"
          >
            Track a claim
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

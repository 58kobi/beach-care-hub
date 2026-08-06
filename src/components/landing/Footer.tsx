import { Link } from "@tanstack/react-router";
import { WaveIcon } from "./icons";
import { SITE } from "@/lib/site";

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Service",
    links: [
      { label: "Report an issue", to: "/report" },
      { label: "Track my claim", to: "/track" },
      { label: "Report types", to: "/help" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help Centre", to: "/help" },
      { label: "Contact us", to: "/contact" },
      { label: "Status page", to: "/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & conditions", to: "/terms" },
      { label: "Privacy policy", to: "/privacy" },
      { label: "Disclaimer", to: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy px-4 py-14 text-white sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-yellow text-navy">
              <WaveIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold leading-tight">
                OnTheBeachCare
              </span>
              <span className="block text-xs text-white/60">claims &amp; support</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Support and claims service for OnTheBeach customers. Not affiliated with, endorsed by, or
            operated by On The Beach Ltd.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display text-sm font-semibold">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            <li>
              <Link to="/about" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.whatsapp} className="hover:text-white">
                WhatsApp: {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref} className="hover:text-white">
                Call: {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <Link to="/claim" className="hover:text-white">
                Submit an online form
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-white">
                Staff login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 OnTheBeachCare. All rights reserved.</p>
        <p className="sm:text-right">
          An independent service. OnTheBeach is a trademark of its respective owner.
        </p>
      </div>
    </footer>
  );
}

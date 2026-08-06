import { WaveIcon } from "./icons";

const columns = [
  { title: "Service", links: ["Report an issue", "Track my claim", "Report types"] },
  { title: "Help", links: ["Help Centre", "Contact us", "Status page"] },
  { title: "Legal", links: ["Terms & conditions", "Privacy policy", "Disclaimer"] },
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
              <span className="block text-xs text-white/60">Independent claims &amp; support</span>
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
                <li key={l}>
                  <a href="#" className="text-sm text-white/60 hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display text-sm font-semibold">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            <li>
              <a href="#" className="hover:text-white">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="mailto:support@onthebeachcare.com" className="hover:text-white">
                support@onthebeachcare.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/447000000000" className="hover:text-white">
                WhatsApp: +44 7000 000000
              </a>
            </li>
            <li>
              <a href="tel:+441610000000" className="hover:text-white">
                Call: +44 161 000 0000
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Submit an online form
              </a>
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

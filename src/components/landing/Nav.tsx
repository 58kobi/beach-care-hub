import { MenuIcon } from "./icons";
import logoAsset from "@/assets/logo-onthebeach.png.asset.json";

const tabs: { label: string; href: string }[] = [
  { label: "Help Centre", href: "/" },
  { label: "Report an Issue", href: "/claim" },
  { label: "Manage Claim", href: "/claim" },
  { label: "Refund Status", href: "/track" },
  { label: "Contact Us", href: "mailto:careonthebeach@gmail.com" },
];

export function Nav() {
  return (
    <header className="bg-white">
      <div className="h-1.5 w-full bg-yellow" />
      <div className="border-b border-line">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 py-3 sm:px-4">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <img
              src={logoAsset.url}
              alt="On the Beach"
              className="h-12 w-auto shrink-0 sm:h-16"
              width={176}
              height={64}
              fetchPriority="high"
            />
            <span className="min-w-0">
              <span className="block truncate font-display text-lg font-bold leading-tight text-navy">
                OnTheBeachCare
              </span>
              <span className="block truncate text-xs text-ink-soft">
                claims &amp; support
              </span>
            </span>
          </a>
          <nav className="flex shrink-0 items-center gap-5">
            <a href="#" className="hidden text-sm font-medium text-ink hover:text-navy-3 sm:block">
              Log in
            </a>
            <a href="#" className="hidden text-sm font-medium text-ink hover:text-navy-3 sm:block">
              My Claims
            </a>
            <a href="#" className="hidden text-sm font-medium text-ink hover:text-navy-3 md:block">
              Saved Claims
            </a>
            <button aria-label="Open menu" className="text-navy">
              <MenuIcon className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </div>
      <div className="border-b border-line">
        <div className="flex w-full gap-1 overflow-x-auto px-3 sm:px-4">
          {tabs.map((tab, i) => (
            <a
              key={tab.label}
              href={tab.href}
              className={
                "whitespace-nowrap px-3 py-3 text-sm font-medium " +
                (i === 0
                  ? "border-b-2 border-navy bg-paper text-navy"
                  : "border-b-2 border-transparent text-ink-soft hover:text-navy")
              }
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

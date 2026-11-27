import { Link } from "@tanstack/react-router";
import { MenuIcon } from "./icons";
import logoUrl from "@/assets/logo-onthebeach.png";
import { SITE } from "@/lib/site";

const tabs = [
  { label: "Help Centre", to: "/help" },
  { label: "Report an Issue", to: "/report" },
  { label: "Manage Claim", to: "/track" },
  { label: "Refund Status", to: "/track" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function Nav() {
  return (
    <header className="bg-white">
      <div className="h-1.5 w-full bg-yellow" />
      <div className="border-b border-line">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 py-3 sm:px-4">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={logoUrl}
              alt="On the Beach"
              className="h-12 w-auto shrink-0 sm:h-16"
              width={117}
              height={64}
              fetchPriority="high"
            />
            <span className="min-w-0">
              <span className="block truncate font-display text-lg font-bold leading-tight text-navy">
                OnTheBeachCare
              </span>
              <span className="block truncate text-xs text-ink-soft">claims &amp; support</span>
            </span>
          </Link>
          <nav className="flex shrink-0 items-center gap-5">
            <Link
              to="/admin/login"
              className="hidden text-sm font-medium text-ink hover:text-navy-3 sm:block"
            >
              Log in
            </Link>
            <Link
              to="/track"
              className="hidden text-sm font-medium text-ink hover:text-navy-3 sm:block"
            >
              My Claims
            </Link>
            <Link
              to="/track"
              className="hidden text-sm font-medium text-ink hover:text-navy-3 md:block"
            >
              Saved Claims
            </Link>
            <a
              href={SITE.phoneHref}
              aria-label="Call support"
              className="text-sm font-medium text-ink hover:text-navy-3 lg:hidden"
            >
              <MenuIcon className="h-6 w-6 text-navy" />
            </a>
          </nav>
        </div>
      </div>
      <div className="border-b border-line">
        <div className="flex w-full gap-1 overflow-x-auto px-3 sm:px-4">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.to}
              activeOptions={{ exact: tab.to === "/help" }}
              className="whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-sm font-medium text-ink-soft hover:text-navy"
              activeProps={{ className: "border-b-2 border-navy bg-paper text-navy" }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

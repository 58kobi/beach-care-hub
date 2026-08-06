import { MenuIcon, WaveIcon } from "./icons";

const tabs = ["Help Centre", "Report an Issue", "Manage Claim", "Refund Status", "Contact Us"];

export function Nav() {
  return (
    <header className="bg-white">
      <div className="h-1.5 w-full bg-yellow" />
      <div className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-yellow text-navy">
              <WaveIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg font-bold leading-tight text-navy">
                OnTheBeachCare
              </span>
              <span className="block truncate text-xs text-ink-soft">
                Independent claims &amp; support
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
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6">
          {tabs.map((tab, i) => (
            <a
              key={tab}
              href="#"
              className={
                "whitespace-nowrap px-3 py-3 text-sm font-medium " +
                (i === 0
                  ? "border-b-2 border-navy bg-paper text-navy"
                  : "border-b-2 border-transparent text-ink-soft hover:text-navy")
              }
            >
              {tab}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

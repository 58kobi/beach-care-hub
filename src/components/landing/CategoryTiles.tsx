import {
  CalendarIcon,
  CardIcon,
  ClipboardIcon,
  HeadsetIcon,
  HelpIcon,
  HotelIcon,
  PlaneIcon,
  XCircleIcon,
} from "./icons";

const tiles = [
  { Icon: CalendarIcon, title: "Booking Issues", desc: "Errors, mismatches or pricing disputes" },
  { Icon: CardIcon, title: "Payments & Refunds", desc: "Failed payments, delays and refund status" },
  { Icon: PlaneIcon, title: "Flights & Transfers", desc: "Delays, changes and airport transport" },
  { Icon: HotelIcon, title: "Hotels & Resorts", desc: "Doesn't match listing or safety concerns" },
  { Icon: XCircleIcon, title: "Cancellations", desc: "Date changes and cancellation disputes" },
  { Icon: ClipboardIcon, title: "Claim Status", desc: "Check progress on an open claim" },
  { Icon: HeadsetIcon, title: "Contact Us", desc: "Reach a support agent directly" },
  { Icon: HelpIcon, title: "Other Help", desc: "Travel docs, baggage, insurance and more" },
];

export function CategoryTiles() {
  return (
    <section className="relative z-10 px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map(({ Icon, title, desc }) => (
          <a
            key={title}
            href="#"
            className="rounded-[12px] border border-line bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-[10px] bg-paper text-navy-3">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-sm font-semibold text-navy">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

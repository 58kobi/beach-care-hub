import { useCallback, useEffect, useRef, useState } from "react";
import bookingImg from "@/assets/issue-booking.jpg";
import flightsImg from "@/assets/issue-flights.jpg";
import refundsImg from "@/assets/issue-refunds.jpg";
import resortImg from "@/assets/issue-resort.jpg";
import beachAsset from "@/assets/beach1.jpeg.asset.json";
import trashAsset from "@/assets/trash_on_the_beach.jpg.asset.json";

const slides = [
  {
    eyebrow: "Before you travel",
    title: "Booking & Pricing Issues",
    desc: "Price changes, errors, or unclear fees at checkout.",
    img: bookingImg,
    alt: "Traveller booking a holiday on a laptop",
  },
  {
    eyebrow: "On arrival",
    title: "Hotel & Resort Problems",
    desc: "Room or resort not matching what was advertised.",
    img: resortImg,
    alt: "Resort pool area with sun loungers and parasols",
  },
  {
    eyebrow: "Getting there",
    title: "Flights & Transfers",
    desc: "Delays, changes, or transport issues to and from the airport.",
    img: flightsImg,
    alt: "Airport terminal window with a plane on the runway",
  },
  {
    eyebrow: "After your trip",
    title: "Refunds & Compensation",
    desc: "Delayed refunds or unresolved compensation claims.",
    img: refundsImg,
    alt: "Person reviewing booking paperwork and a phone",
  },
  {
    eyebrow: "At the beach",
    title: "Beach Hazards & Safety",
    desc: "Broken equipment, litter, or safety concerns on the sand.",
    img: beachAsset.url,
    alt: "Shoreline with palm trees and breaking waves",
  },
  {
    eyebrow: "Environment",
    title: "Litter & Shoreline Pollution",
    desc: "Plastic bottles, waste and debris washed up along the shore.",
    img: trashAsset.url,
    alt: "Plastic bottle washed up in the surf on a beach",
  },
];

function Chevron({ className, dir }: { className?: string; dir: "left" | "right" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === "right" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
    </svg>
  );
}

export function IssueCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slideWidth = el.scrollWidth / slides.length;
    setActive(Math.min(slides.length - 1, Math.round(el.scrollLeft / slideWidth)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slideWidth = el.scrollWidth / slides.length;
    el.scrollTo({ left: i * slideWidth, behavior: "smooth" });
  };

  return (
    <section aria-label="Types of issues you can report" className="relative py-8">
      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-1 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((s, i) => (
            <article
              key={s.title}
              className="relative aspect-[16/7] w-[calc(100%-20px)] shrink-0 snap-start overflow-hidden rounded-[14px] sm:w-[calc(87%-1rem)] lg:w-[calc(71%-1rem)]"
            >
              <img
                src={s.img}
                alt={s.alt}
                loading={i <= 1 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "auto"}
                className="absolute inset-0 h-full w-full object-cover [image-rendering:auto] [transform:translateZ(0)]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top_right,color-mix(in_oklab,var(--navy)_82%,transparent),color-mix(in_oklab,var(--navy)_35%,transparent)_55%,transparent)]" />
              <div className="absolute bottom-0 left-0 max-w-[85%] p-5 sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-widest text-yellow">
                  {s.eyebrow}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-bold text-white sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs text-white/70 sm:text-sm">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {active > 0 && (
          <button
            aria-label="Previous issue type"
            onClick={() => goTo(active - 1)}
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-navy text-white shadow-lg transition-colors hover:bg-navy-2 min-[600px]:grid"
          >
            <Chevron dir="left" className="h-5 w-5" />
          </button>
        )}
        {active < slides.length - 1 && (
          <button
            aria-label="Next issue type"
            onClick={() => goTo(active + 1)}
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-navy text-white shadow-lg transition-colors hover:bg-navy-2 min-[600px]:grid"
          >
            <Chevron dir="right" className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Go to ${s.title}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={
              "h-2 w-2 rounded-full transition-colors " + (i === active ? "bg-navy" : "bg-line")
            }
          />
        ))}
      </div>
    </section>
  );
}

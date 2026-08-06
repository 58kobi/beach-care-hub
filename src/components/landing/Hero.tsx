import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "./icons";

export function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--navy),var(--navy-3))] px-4 pb-[100px] pt-16 sm:px-6">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-[680px] text-center">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          How can we help you today?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 sm:text-base">
          Search for answers, check a claim, or report something that went wrong with your OnTheBeach
          trip.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/help" });
          }}
          className="mt-8 flex items-center gap-2 rounded-[12px] bg-white p-2 shadow-lg"
        >
          <SearchIcon className="ml-2 hidden h-5 w-5 shrink-0 text-ink-soft sm:block" />
          <input
            type="search"
            aria-label="Search help"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search help articles, claim status, or a topic…"
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-ink-soft"
          />
          <button
            type="submit"
            className="shrink-0 rounded-[8px] bg-yellow px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-yellow-dark"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

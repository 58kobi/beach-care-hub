import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />
      <div className="bg-[linear-gradient(135deg,var(--navy),var(--navy-3))] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {intro && <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">{intro}</p>}
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">{children}</main>
      <Footer />
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-ink [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-navy">
      {children}
    </div>
  );
}

import Link from "next/link";

import { homeLearnCards } from "@/lib/content/learn";

export function LearnCardsSection() {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-bold tracking-[0.24em] text-[#93A4B8]">APRENDE</p>
        <h2 className="text-3xl font-extrabold text-[#F7FAFC]">Aprende sobre sismos</h2>
        <p className="text-sm leading-7 text-[#93A4B8] md:text-base">
          Conceptos esenciales para leer mejor la actividad sísmica reciente de Chile sin perder claridad ni contexto.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
  {homeLearnCards.map((card) => {
    const isHistory = card.href === "/aprende/historia-sismica-chile";

    return (
      <article
        className={`rounded-3xl border p-5 shadow-[0_20px_50px_rgba(0,0,0,0.20)] transition ${
          isHistory
            ? "border-[#55C2FF]/30 bg-[#55C2FF]/5 hover:border-[#55C2FF]/45"
            : "border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[#55C2FF]/20"
        }`}
        key={card.href}
      >
        {isHistory && (
          <span className="mb-3 inline-flex rounded-full border border-[#55C2FF]/25 bg-[#55C2FF]/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#55C2FF]">
            HISTORIA DE CHILE
          </span>
        )}

        <h3 className="text-xl font-extrabold text-[#F7FAFC]">
          {card.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#93A4B8]">
          {card.description}
        </p>

        <Link
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#55C2FF] transition hover:opacity-90"
          href={card.href}
        >
          Leer más <span aria-hidden>→</span>
        </Link>
      </article>
    );
  })}
</div>
    </section>
  );
}

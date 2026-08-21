import Link from "next/link";

import { homeLearnCards } from "@/lib/content/learn";

export function LearnCardsSection() {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-bold tracking-[0.24em] text-[#93A4B8]">
          APRENDE
        </p>

        <h2 className="text-3xl font-extrabold text-[#F7FAFC]">
          Aprende sobre sismos
        </h2>

        <p className="text-sm leading-7 text-[#93A4B8] md:text-base">
          Conceptos esenciales para leer mejor la actividad sísmica reciente
          de Chile sin perder claridad ni contexto.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {homeLearnCards.map((card) => {
          const isHistory =
            card.href === "/aprende/historia-sismica-chile";

          return (
            <Link
              href={card.href}
              key={card.href}
              className={`group relative block rounded-3xl border p-5 shadow-[0_20px_50px_rgba(0,0,0,0.20)]
                transition-all duration-200 ease-out
                hover:-translate-y-1
                hover:shadow-[0_24px_60px_rgba(0,0,0,0.30)]
                active:scale-[0.985]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#55C2FF]/60
                ${
                  isHistory
                    ? "border-[#55C2FF]/30 bg-[#55C2FF]/5 hover:border-[#55C2FF]/55 hover:bg-[#55C2FF]/8 active:border-[#55C2FF]/60"
                    : "border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[#55C2FF]/35 hover:bg-[var(--surface-elevated)] active:border-[#55C2FF]/45"
                }`}
            >
              <article className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {isHistory && (
                      <span className="mb-3 inline-flex rounded-full border border-[#55C2FF]/25 bg-[#55C2FF]/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#55C2FF]">
                        HISTORIA DE CHILE
                      </span>
                    )}

                    <h3 className="text-xl font-extrabold text-[#F7FAFC] transition-colors duration-200 group-hover:text-[#55C2FF]">
                      {card.title}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-lg text-[#55C2FF] transition-all duration-200 group-hover:translate-x-1 group-hover:border-[#55C2FF]/40 group-hover:bg-[#55C2FF]/10 group-active:scale-90"
                  >
                    →
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#93A4B8]">
                  {card.description}
                </p>

                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#55C2FF]">
                    Leer más
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

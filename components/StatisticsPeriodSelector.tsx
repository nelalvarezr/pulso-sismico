import Link from "next/link";

import {
  statisticsPeriods,
  type StatisticsPeriod,
} from "@/lib/api/statistics";

interface StatisticsPeriodSelectorProps {
  period: StatisticsPeriod;
}

function getPeriodHref(
  period: StatisticsPeriod,
) {
  if (period === "30d") {
    return "/estadisticas";
  }

  return `/estadisticas?periodo=${period}`;
}

export function StatisticsPeriodSelector({
  period,
}: StatisticsPeriodSelectorProps) {
  return (
    <section className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 md:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#93A4B8]">
            PERÍODO
          </p>

          <p className="mt-1 text-sm text-[#C4D0DF]">
            Selecciona el rango que quieres analizar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          {statisticsPeriods.map((option) => {
            const isActive =
              option.value === period;

            return (
              <Link
                className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 text-sm font-bold transition-all duration-200 active:scale-[0.96] ${
                  isActive
                    ? "border-[#55C2FF]/60 bg-[#55C2FF] text-[#07111F]"
                    : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[#C4D0DF] hover:border-[#55C2FF]/40 hover:text-[#F7FAFC]"
                }`}
                href={getPeriodHref(option.value)}
                key={option.value}
                prefetch={false}
                scroll={false}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

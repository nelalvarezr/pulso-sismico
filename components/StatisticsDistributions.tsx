import type {
  StatisticsDistributionItem,
  StatisticsDistributionsData,
} from "@/lib/api/statistics";

interface StatisticsDistributionsProps {
  distributions: StatisticsDistributionsData;
}

interface DistributionCardProps {
  description: string;
  eyebrow: string;
  items: StatisticsDistributionItem[];
  title: string;
}

function formatPercentage(
  percentage: number,
) {
  return new Intl.NumberFormat("es-CL", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }).format(percentage);
}

function DistributionCard({
  description,
  eyebrow,
  items,
  title,
}: DistributionCardProps) {
  const total = items.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return (
    <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] md:p-6">
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC] md:text-2xl">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#93A4B8]">
          {description}
        </p>
      </div>

      <div className="mt-7 space-y-6">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-end justify-between gap-4">
              <p className="text-sm font-bold text-[#F7FAFC]">
                {item.label}
              </p>

              <div className="flex shrink-0 items-baseline gap-2">
                <span className="text-xs text-[#72849A]">
                  {item.count.toLocaleString(
                    "es-CL",
                  )}
                </span>

                <span className="min-w-[42px] text-right text-sm font-extrabold text-[#55C2FF]">
                  {formatPercentage(
                    item.percentage,
                  )}
                  %
                </span>
              </div>
            </div>

            <div
              aria-label={`${item.label}: ${formatPercentage(
                item.percentage,
              )}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={Math.round(
                item.percentage,
              )}
              className="h-2.5 overflow-hidden rounded-full bg-[var(--surface-elevated)]"
              role="progressbar"
            >
              <div
                className="h-full rounded-full bg-[#55C2FF] transition-[width] duration-500"
                style={{
                  width: `${Math.min(
                    item.percentage,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
        <span className="text-xs text-[#72849A]">
          Total considerado
        </span>

        <span className="text-xs font-bold text-[#93A4B8]">
          {total.toLocaleString("es-CL")}{" "}
          {total === 1 ? "evento" : "eventos"}
        </span>
      </div>
    </article>
  );
}

export function StatisticsDistributions({
  distributions,
}: StatisticsDistributionsProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <DistributionCard
        description="Cómo se distribuyen los eventos según su magnitud dentro del período seleccionado."
        eyebrow="MAGNITUD"
        items={distributions.magnitude}
        title="Distribución por magnitud"
      />

      <DistributionCard
        description="Cómo se distribuyen los eventos según la profundidad de su hipocentro."
        eyebrow="PROFUNDIDAD"
        items={distributions.depth}
        title="Distribución por profundidad"
      />
    </section>
  );
}

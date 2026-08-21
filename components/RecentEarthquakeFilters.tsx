import Link from "next/link";

interface RecentEarthquakeFiltersProps {
  feltOnly: boolean;
  minMagnitude?: number;
}

const magnitudeOptions = [
  { label: "Todos", value: undefined },
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
  { label: "5+", value: 5 },
] as const;

function buildFilterHref(
  minMagnitude: number | undefined,
  feltOnly: boolean,
) {
  const params = new URLSearchParams();

  if (typeof minMagnitude === "number") {
    params.set("magnitud", String(minMagnitude));
  }

  if (feltOnly) {
    params.set("percibidos", "1");
  }

  const query = params.toString();

  return query ? `/?${query}` : "/";
}

export function RecentEarthquakeFilters({
  feltOnly,
  minMagnitude,
}: RecentEarthquakeFiltersProps) {
  const hasActiveFilters =
    typeof minMagnitude === "number" || feltOnly;

  return (
    <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#93A4B8]">
            FILTRAR
          </p>
        </div>

        {hasActiveFilters && (
          <Link
            className="text-xs font-bold text-[#55C2FF] transition-colors hover:text-[#8CD7FF]"
            href="/"
            prefetch={false}
            scroll={false}
          >
            Limpiar filtros
          </Link>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.12em] text-[#93A4B8]">
            MAGNITUD MÍNIMA
          </p>

          <div className="flex flex-wrap gap-2">
            {magnitudeOptions.map((option) => {
              const isActive = option.value === minMagnitude;

              return (
                <Link
                  aria-label={
                    option.value
                      ? `Mostrar sismos de magnitud ${option.value} o superior`
                      : "Mostrar sismos de cualquier magnitud"
                  }
                  className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 text-sm font-bold transition-all duration-200 active:scale-[0.96] ${
                    isActive
                      ? "border-[#55C2FF]/60 bg-[#55C2FF] text-[#07111F]"
                      : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[#C4D0DF] hover:border-[#55C2FF]/40 hover:text-[#F7FAFC]"
                  }`}
                  href={buildFilterHref(option.value, feltOnly)}
                  key={option.label}
                  prefetch={false}
                  scroll={false}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          aria-label={
            feltOnly
              ? "Desactivar filtro de sismos percibidos"
              : "Mostrar solo sismos percibidos"
          }
          className={`group inline-flex min-h-10 items-center gap-2.5 self-start rounded-xl border px-4 text-sm font-bold transition-all duration-200 active:scale-[0.97] sm:self-auto ${
            feltOnly
              ? "border-[#55C2FF]/50 bg-[#55C2FF]/10 text-[#55C2FF]"
              : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[#C4D0DF] hover:border-[#55C2FF]/35 hover:text-[#F7FAFC]"
          }`}
          href={buildFilterHref(minMagnitude, !feltOnly)}
          prefetch={false}
          scroll={false}
        >
          <span
            aria-hidden="true"
            className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] transition-colors ${
              feltOnly
                ? "border-[#55C2FF] bg-[#55C2FF] text-[#07111F]"
                : "border-[#60748D] group-hover:border-[#55C2FF]"
            }`}
          >
            {feltOnly ? "✓" : ""}
          </span>

          Solo percibidos
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

interface HeaderProps {
  updatedAt?: string;
}

function formatUpdatedAt(updatedAt?: string) {
  if (!updatedAt) {
    return null;
  }

  const date = new Date(updatedAt);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Santiago",
  })
    .format(date)
    .replace(".", "");
}

export function Header({
  updatedAt,
}: HeaderProps) {
  const formattedUpdatedAt =
    formatUpdatedAt(updatedAt);

  return (
    <header className="rounded-[28px] border border-[var(--border-subtle)] bg-[color:rgba(19,35,58,0.92)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C2FF]/60"
            href="/"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#55C2FF]/25 bg-[#55C2FF]/10">
              <span
                aria-hidden="true"
                className="text-lg text-[#55C2FF]"
              >
                ≋
              </span>
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight text-[#F7FAFC] transition-colors group-hover:text-[#55C2FF]">
                Pulso Sísmico
              </p>

              <p className="text-xs text-[#93A4B8]">
                Actividad sísmica de Chile
              </p>
            </div>
          </Link>
        </div>

        {formattedUpdatedAt && (
          <div className="flex items-center gap-2 text-xs text-[#72849A]">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#55C2FF]"
            />

            <span>
              Actualizado {formattedUpdatedAt}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

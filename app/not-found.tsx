import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-12 md:px-6">
      <section className="w-full rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#55C2FF]/25 bg-[#55C2FF]/10">
          <span className="text-3xl" aria-hidden>
            〰️
          </span>
        </div>

        <p className="mt-6 text-xs font-bold tracking-[0.24em] text-[#55C2FF]">
          ERROR 404
        </p>

        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:text-3xl">
          No encontramos esta página
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#93A4B8] md:text-base">
          La página que buscas no existe, cambió de dirección o el evento
          sísmico ya no se encuentra disponible.
        </p>

        <div className="mt-7 flex justify-center">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-[#55C2FF]/30 bg-[#55C2FF]/12 px-5 py-2.5 text-sm font-semibold text-[#55C2FF] transition hover:bg-[#55C2FF]/18 active:scale-[0.98]"
            href="/"
          >
            <span aria-hidden>←</span>
            Ver últimos sismos
          </Link>
        </div>
      </section>
    </main>
  );
}

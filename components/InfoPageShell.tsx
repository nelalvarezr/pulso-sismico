import Link from "next/link";
import type { ReactNode } from "react";

interface InfoPageShellProps {
  children: ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
}

export function InfoPageShell({ children, description, eyebrow = "PULSO SÍSMICO", title }: InfoPageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 md:px-6">
      <Link
        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#55C2FF]/25 bg-[#55C2FF]/8 px-3.5 py-1.5 text-sm font-semibold text-[#55C2FF] transition hover:bg-[#55C2FF]/15 active:scale-[0.98]"
        href="/"
      >
        <span
          aria-hidden="true"
          className="flex h-4 items-center text-base leading-none"
        >          ←
        </span>

        <span className="leading-none">
          Volver al inicio
        </span>
      </Link>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.26)] md:p-7">
        <p className="mb-2 text-xs font-bold tracking-[0.24em] text-[#93A4B8]">
          {eyebrow}
        </p>

        <h1 className="max-w-4xl text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:text-3xl">
          {title}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#C4D0DF] md:text-base md:leading-7">
          {description}
        </p>
      </section>

      {children}
    </main>
  );
}

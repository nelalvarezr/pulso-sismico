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
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#F7FAFC]" href="/">
        <span>←</span>
        <span>Volver al inicio</span>
      </Link>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.26)] md:p-8">
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-[#93A4B8]">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-[#F7FAFC] md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#C4D0DF] md:text-lg">{description}</p>
      </section>

      {children}
    </main>
  );
}

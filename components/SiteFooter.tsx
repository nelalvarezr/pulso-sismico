import Link from "next/link";

import { footerLinks } from "@/lib/content/learn";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[var(--border-subtle)] bg-[color:rgba(7,17,31,0.92)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-6">
        <div className="space-y-2">
          <p className="text-lg font-extrabold text-[#F7FAFC]">Pulso Sísmico</p>
          <p className="max-w-2xl text-sm leading-7 text-[#93A4B8]">
            Información reciente y contenido educativo para entender mejor la actividad sísmica en Chile.
          </p>
        </div>

        <nav aria-label="Enlaces del sitio" className="flex flex-wrap gap-x-5 gap-y-3">
          {footerLinks.map((link) => (
            <Link className="text-sm font-medium text-[#C4D0DF] transition hover:text-[#55C2FF]" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/estadisticas",
    label: "Estadísticas",
  },
] as const;

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="flex items-center gap-1 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface)] p-1.5"
    >
      {navigationItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            href={item.href}
            key={item.href}
            className={`inline-flex min-h-10 flex-1 items-center justify-center rounded-[13px] px-4 text-sm font-bold transition-all duration-200 active:scale-[0.97] sm:flex-none ${
              isActive
                ? "bg-[#55C2FF]/12 text-[#55C2FF]"
                : "text-[#93A4B8] hover:bg-[var(--surface-elevated)] hover:text-[#F7FAFC]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

import { formatUpdatedAtLabel } from "@/lib/utils/earthquake-formatters";

interface HeaderProps {
  updatedAt: string;
}

export function Header({ updatedAt }: HeaderProps) {
  return (
    <header className="flex flex-col gap-2 rounded-[28px] border border-[var(--border-subtle)] bg-[color:rgba(19,35,58,0.92)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur">
      <h1 className="text-2xl font-bold text-[#F7FAFC]">
        Últimos sismos en Chile
      </h1>

      <p className="text-[14px] text-[#93A4B8]">
        Pulso Sísmico muestra la actividad sísmica reciente de Chile con magnitud, profundidad, ubicación y mapa.
      </p>

    </header>
  );
}

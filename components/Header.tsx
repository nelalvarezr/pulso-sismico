import { formatUpdatedAtLabel } from "@/lib/utils/earthquake-formatters";

interface HeaderProps {
  updatedAt: string;
}

export function Header({ updatedAt }: HeaderProps) {
  return (
    <header className="flex flex-col gap-2 rounded-[28px] border border-[var(--border-subtle)] bg-[color:rgba(19,35,58,0.92)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#F7FAFC]">Pulso Sísmico</h1>
      <p className="text-base text-[#93A4B8]">Actividad sísmica reciente en Chile</p>
      <p className="text-sm text-[#93A4B8]">{formatUpdatedAtLabel(updatedAt)}</p>
    </header>
  );
}

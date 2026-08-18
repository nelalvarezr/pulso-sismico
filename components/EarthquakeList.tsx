import type { Earthquake } from "@/lib/types/earthquake";

import { EarthquakeListItem } from "./EarthquakeListItem";

interface EarthquakeListProps {
  earthquakes: Earthquake[];
}

export function EarthquakeList({ earthquakes }: EarthquakeListProps) {
  return (
    <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
      <h2 className="mb-4 text-2xl font-extrabold text-[#F7FAFC]">Sismos recientes</h2>
      <ul className="space-y-3">
        {earthquakes.map((earthquake) => (
          <EarthquakeListItem earthquake={earthquake} key={earthquake.id} />
        ))}
      </ul>
    </section>
  );
}

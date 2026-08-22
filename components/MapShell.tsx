"use client";

import dynamic from "next/dynamic";

import type { Earthquake } from "@/lib/types/earthquake";

const DynamicMap = dynamic(() => import("./EarthquakeMap").then((mod) => mod.EarthquakeMap), {
  loading: () => (
    <div className="grid h-[560px] place-items-center rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-sm text-[#93A4B8]">
      Cargando mapa…
    </div>
  ),
  ssr: false,
});

interface MapShellProps {
  earthquakes: Earthquake[];
  focusEarthquakeId?: string;
  height?: number;
  interactive?: boolean;
  showDetailLink?: boolean;
  focusZoom?: number;
  showPopup?: boolean;
}

export function MapShell(props: MapShellProps) {
  return <DynamicMap {...props} />;
}

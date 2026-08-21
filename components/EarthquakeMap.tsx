"use client";

import "leaflet/dist/leaflet.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CHILE_MAP_CENTER } from "@/lib/config";
import type { Earthquake } from "@/lib/types/earthquake";
import { getMagnitudeGradient } from "@/lib/utils/magnitude";

import { MapEventPopup } from "./MapEventPopup";

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  focusEarthquakeId?: string;
  height?: number;
  interactive?: boolean;
  showDetailLink?: boolean;
  focusZoom?: number;
  showPopup?: boolean;
}

type ReactLeafletModule = typeof import("react-leaflet");
type LeafletModule = typeof import("leaflet");

interface FitBoundsProps {
  earthquakes: Earthquake[];
  focusId?: string;
  focusZoom: number;
  useMapHook: ReactLeafletModule["useMap"];
}

function MapLoadingState({ height }: { height: number }) {
  return (
    <div className="grid place-items-center rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-sm text-[#93A4B8]" style={{ height }}>
      Cargando mapa…
    </div>
  );
}

function FitBounds({
  earthquakes,
  focusId,
  focusZoom,
  useMapHook,
}: FitBoundsProps) {
  const map = useMapHook();

  useEffect(() => {
    if (earthquakes.length === 0) {
      map.setView(
        [CHILE_MAP_CENTER.lat, CHILE_MAP_CENTER.lng],
        CHILE_MAP_CENTER.zoom,
      );
      return;
    }

    const focused = focusId
      ? earthquakes.find((item) => item.id === focusId)
      : null;

    if (focused) {
      map.setView(
        [focused.latitude, focused.longitude],
        focusZoom,
      );
      return;
    }

    if (earthquakes.length === 1) {
      const earthquake = earthquakes[0];

      map.setView(
        [earthquake.latitude, earthquake.longitude],
        7,
      );
      return;
    }

    const bounds = earthquakes.map(
      (item) => [item.latitude, item.longitude],
    ) as [number, number][];

    map.fitBounds(bounds, {
      padding: [32, 32],
    });
  }, [earthquakes, focusId, focusZoom, map]);

  return null;
}

export function EarthquakeMap({
  earthquakes,
  focusEarthquakeId,
  height = 560,
  interactive = true,
  showDetailLink = true,
  focusZoom = 5,
  showPopup = true,
}: EarthquakeMapProps) {
  const [modules, setModules] = useState<{
    reactLeaflet: ReactLeafletModule;
    leaflet: LeafletModule;
  } | null>(null);

  useEffect(() => {
    let active = true;

    const loadMapModules = async () => {
      const [reactLeaflet, leaflet] = await Promise.all([import("react-leaflet"), import("leaflet")]);

      if (active) {
        setModules({ reactLeaflet, leaflet });
      }
    };

    void loadMapModules();

    return () => {
      active = false;
    };
  }, []);

  if (!modules) {
    return <MapLoadingState height={height} />;
  }

  const { MapContainer, Marker, Popup, TileLayer, useMap } = modules.reactLeaflet;
  const { divIcon } = modules.leaflet;

  const createMagnitudeIcon = (magnitude: number) => {
    const [from, to] = getMagnitudeGradient(magnitude);

    return divIcon({
      className: "earthquake-marker",
      html: `
        <div style="
          width:40px;height:40px;border-radius:999px;display:grid;place-items:center;
          color:#F7FAFC;font-weight:800;font-size:13px;
          background:linear-gradient(135deg, ${from}, ${to});
          border:2px solid rgba(255,255,255,0.55);
          box-shadow:0 8px 18px rgba(0,0,0,0.28);
        ">${magnitude.toFixed(1)}</div>`,
      iconAnchor: [20, 20],
      iconSize: [40, 40],
      popupAnchor: [0, -20],
    });
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
      <MapContainer
        attributionControl={false}
        center={[CHILE_MAP_CENTER.lat, CHILE_MAP_CENTER.lng]}
        className="z-0"
        dragging={interactive}
        doubleClickZoom={interactive}
        scrollWheelZoom={interactive}
        style={{ height }}
        zoom={CHILE_MAP_CENTER.zoom}
        zoomControl={interactive}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <FitBounds
          earthquakes={earthquakes}
          focusId={focusEarthquakeId}
          focusZoom={focusZoom}
          useMapHook={useMap}
        />

        {earthquakes.map((earthquake) => (
          <Marker icon={createMagnitudeIcon(earthquake.magnitude)} key={earthquake.id} position={[earthquake.latitude, earthquake.longitude]}>
             {showPopup ? (
              <Popup closeButton={false} minWidth={270}>
                <MapEventPopup earthquake={earthquake} />
              </Popup>
            ) : null}
          </Marker>
        ))}
      </MapContainer>

      {!interactive && focusEarthquakeId && showDetailLink ? (
        <div className="flex items-center justify-end border-t border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-3 text-sm">
          <Link className="font-semibold text-[#55C2FF]" href={`/sismo/${focusEarthquakeId}`}>
            Ver detalle
          </Link>
        </div>
      ) : null}
    </div>
  );
}

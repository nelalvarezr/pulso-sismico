export const SITE_NAME = "Pulso Sísmico";
export const SITE_DESCRIPTION = "Consulta los últimos sismos registrados en Chile, con magnitud, profundidad, ubicación, hora y mapa de la actividad sísmica reciente.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pulsosismico.cl";

export const COLORS = {
  background: "#07111F",
  surface: "#0E1A2B",
  surfaceElevated: "#142238",
  border: "rgba(255,255,255,0.08)",
  textPrimary: "#F7FAFC",
  textSecondary: "#93A4B8",
  accent: "#55C2FF",
  success: "#5DD6A2",
  warning: "#F6C85F",
  orange: "#F59E5B",
  danger: "#F46B6B",
} as const;

export const CHILE_MAP_CENTER = {
  lat: -33.5,
  lng: -71.0,
  zoom: 4.4,
};

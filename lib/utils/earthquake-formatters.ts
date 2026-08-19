import type { Earthquake } from "@/lib/types/earthquake";

const shortDateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "short",
  timeZone: "America/Santiago",
});

const longDateFormatter = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Santiago",
});

function getChileDateString(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Santiago",
  }).format(date);
}

function floatingDateToUtc(date: string, hour: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = hour.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hours, minutes));
}

export function formatEarthquakeDate(earthquake: Pick<Earthquake, "date" | "hour">) {
  const date = floatingDateToUtc(earthquake.date, earthquake.hour);
  const formatted = longDateFormatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatRelativeEarthquakeTime(earthquake: Pick<Earthquake, "date" | "hour">) {
  const now = new Date();
  const today = getChileDateString(now);
  const yesterday = getChileDateString(new Date(now.getTime() - 24 * 60 * 60 * 1000));
  const shortHour = earthquake.hour.slice(0, 5);

  if (earthquake.date === today) return `Hoy, ${shortHour}`;
  if (earthquake.date === yesterday) return `Ayer, ${shortHour}`;
  return `${shortDateFormatter.format(floatingDateToUtc(earthquake.date, earthquake.hour))}, ${shortHour}`;
}

export function formatUpdatedAtLabel(updatedAt: string) {
  const updatedDate = new Date(updatedAt);
  const elapsedMinutes = Math.max(0, Math.round((Date.now() - updatedDate.getTime()) / 60000));
  if (elapsedMinutes < 1) return "Actualizado hace instantes";
  if (elapsedMinutes < 60) return `Actualizado hace ${elapsedMinutes} min`;
  const elapsedHours = Math.round(elapsedMinutes / 60);
  return `Actualizado hace ${elapsedHours} h`;
}

export function buildEarthquakeTitle(earthquake: Earthquake) {
  return `Sismo de magnitud ${earthquake.magnitude.toFixed(1)} en ${earthquake.place} | Pulso Sísmico`;
}

export function buildEarthquakeDescription(earthquake: Earthquake) {
  return `Sismo de magnitud ${earthquake.magnitude.toFixed(1)} registrado en ${earthquake.place}, con una profundidad de ${earthquake.depthKm} km. Consulta hora, ubicación y mapa del evento en Chile.`;
}

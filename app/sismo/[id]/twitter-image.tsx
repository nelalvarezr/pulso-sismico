import { ImageResponse } from "next/og";

import { fetchEarthquakeById } from "@/lib/api/earthquakes";
import { EarthquakeOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og";

export const alt = "Resumen visual del sismo en Pulso Sísmico";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const revalidate = 60;

interface EarthquakeTwitterImageProps {
  params: Promise<{ id: string }>;
}

export default async function EarthquakeTwitterImage({ params }: EarthquakeTwitterImageProps) {
  const { id } = await params;
  const earthquake = await fetchEarthquakeById(id);

  return new ImageResponse(
    <EarthquakeOgImage
      depthKm={earthquake?.depthKm ?? 0}
      magnitude={earthquake?.magnitude ?? 0}
      place={earthquake?.place ?? "Sismo no disponible"}
    />,
    size,
  );
}

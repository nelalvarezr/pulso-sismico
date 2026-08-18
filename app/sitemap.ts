import type { MetadataRoute } from "next";

import { fetchRecentEarthquakes } from "@/lib/api/earthquakes";
import { SITE_URL } from "@/lib/config";
import { staticSiteRoutes } from "@/lib/content/learn";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const earthquakes = await fetchRecentEarthquakes().catch(() => []);

  return [
    ...staticSiteRoutes.map((path) => ({
      changeFrequency: path === "/" ? ("hourly" as const) : ("monthly" as const),
      lastModified: new Date(),
      priority: path === "/" ? 1 : 0.7,
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    })),
    ...earthquakes.map((earthquake) => ({
      changeFrequency: "hourly" as const,
      lastModified: new Date(earthquake.occurredAt),
      priority: 0.8,
      url: `${SITE_URL}/sismo/${earthquake.id}`,
    })),
  ];
}

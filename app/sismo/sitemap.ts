import type { MetadataRoute } from "next";

import {
  fetchEarthquakeSitemapYears,
  fetchEarthquakesForSitemapByYear,
} from "@/lib/api/earthquakes";
import { SITE_URL } from "@/lib/config";

export const revalidate = 3600;

export async function generateSitemaps() {
  const years =
    await fetchEarthquakeSitemapYears();

  return years.map((year) => ({
    id: year,
  }));
}

export default async function sitemap({
  id,
}: {
  id: Promise<number>;
}): Promise<MetadataRoute.Sitemap> {
  const year = Number(await id);

  if (
    !Number.isInteger(year) ||
    year < 1900 ||
    year > 2100
  ) {
    return [];
  }

  const earthquakes =
    await fetchEarthquakesForSitemapByYear(year);

  return earthquakes.map((earthquake) => ({
    url: `${SITE_URL}/sismo/${earthquake.id}`,

    lastModified: earthquake.occurredAt,

    changeFrequency:
      "monthly" as const,

    priority: 0.6,
  }));
}

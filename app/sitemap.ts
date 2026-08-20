import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/config";
import { staticSiteRoutes } from "@/lib/content/learn";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  return staticSiteRoutes.map((path) => ({
    changeFrequency:
      path === "/"
        ? ("hourly" as const)
        : ("monthly" as const),

    lastModified: new Date(),

    priority:
      path === "/"
        ? 1
        : 0.7,

    url:
      path === "/"
        ? SITE_URL
        : `${SITE_URL}${path}`,
  }));
}

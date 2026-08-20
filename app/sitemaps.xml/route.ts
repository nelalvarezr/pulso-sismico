import { fetchEarthquakeSitemapYears } from "@/lib/api/earthquakes";
import { SITE_URL } from "@/lib/config";

export const revalidate = 3600;

export async function GET() {
  const years = await fetchEarthquakeSitemapYears();

  const sitemapUrls = [
    `${SITE_URL}/sitemap.xml`,
    ...years.map(
      (year) => `${SITE_URL}/sismo/sitemap/${year}.xml`,
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "@/lib/config";

interface BuildPageMetadataInput {
  description: string;
  path: string;
  title: string;
}

export function buildPageMetadata({ description, path, title }: BuildPageMetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  const url = canonical === "/" ? SITE_URL : `${SITE_URL}${canonical}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      siteName: SITE_NAME,
      title: fullTitle,
      type: "article",
      url,
    },
    title: fullTitle,
    twitter: {
      card: "summary_large_image",
      description,
      title: fullTitle,
    },
  };
}

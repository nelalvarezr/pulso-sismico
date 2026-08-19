import { ImageResponse } from "next/og";

import { HomeOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og";

export const alt = "Pulso Sísmico — Últimos sismos en Chile";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function TwitterImage() {
  return new ImageResponse(<HomeOgImage />, size);
}

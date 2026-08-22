import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pulso Sísmico",
    short_name: "Pulso Sísmico",
    description:
      "Actividad sísmica reciente de Chile, magnitud, profundidad, ubicación y estadísticas.",

    start_url: "/",

    display: "standalone",

    background_color: "#07111F",
    theme_color: "#07111F",

    orientation: "portrait-primary",

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

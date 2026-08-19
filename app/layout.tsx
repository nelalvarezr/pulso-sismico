import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Últimos sismos de Chile`,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    description: SITE_DESCRIPTION,
    images: [
      {
        alt: "Pulso Sísmico — Últimos sismos en Chile",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Últimos sismos de Chile`,
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
    title: `${SITE_NAME} | Últimos sismos de Chile`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[#07111F] text-[#F7FAFC]"
      >
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

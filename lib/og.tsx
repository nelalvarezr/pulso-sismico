import type { CSSProperties, ReactNode } from "react";

import { COLORS, SITE_NAME } from "@/lib/config";

export const OG_IMAGE_SIZE = {
  height: 630,
  width: 1200,
} as const;

export const OG_IMAGE_CONTENT_TYPE = "image/png";

const baseText: CSSProperties = {
  color: COLORS.textPrimary,
  display: "flex",
  fontFamily: "sans-serif",
};

function ChileShape() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(85,194,255,0.95), rgba(31,111,174,0.78))",
        border: "2px solid rgba(255,255,255,0.18)",
        borderRadius: "999px",
        boxShadow: "0 0 0 8px rgba(85,194,255,0.08)",
        height: 350,
        position: "absolute",
        right: 190,
        top: 130,
        transform: "rotate(14deg)",
        width: 28,
      }}
    />
  );
}

function SeismicMarker() {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        height: 180,
        justifyContent: "center",
        position: "absolute",
        right: 150,
        top: 230,
        width: 180,
      }}
    >
      {[0, 1, 2].map((ring) => (
        <div
          key={ring}
          style={{
            border: "2px solid rgba(93,214,162,0.28)",
            borderRadius: 999,
            height: 72 + ring * 36,
            position: "absolute",
            width: 72 + ring * 36,
          }}
        />
      ))}
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #2C6FAE, #55C2FF)",
          border: "3px solid rgba(255,255,255,0.28)",
          borderRadius: 999,
          boxShadow: "0 18px 48px rgba(0,0,0,0.28)",
          display: "flex",
          height: 54,
          justifyContent: "center",
          width: 54,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.88)",
            borderRadius: 999,
            height: 12,
            width: 12,
          }}
        />
      </div>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div
        style={{
          background: "radial-gradient(circle, rgba(85,194,255,0.24), transparent 62%)",
          height: 520,
          left: -140,
          position: "absolute",
          top: -100,
          width: 520,
        }}
      />
      <div
        style={{
          background: "radial-gradient(circle, rgba(93,214,162,0.14), transparent 64%)",
          height: 380,
          position: "absolute",
          right: -40,
          top: 30,
          width: 380,
        }}
      />
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 36,
          bottom: 40,
          left: 40,
          position: "absolute",
          right: 40,
          top: 40,
        }}
      />
    </>
  );
}

export function OgFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${COLORS.background} 0%, #0D1A2C 100%)`,
        display: "flex",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <BackgroundDecor />
      {children}
    </div>
  );
}

export function HomeOgImage() {
  return (
    <OgFrame>
      <div
        style={{
          ...baseText,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "78px 78px 72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              color: COLORS.textSecondary,
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 4,
              marginBottom: 26,
            }}
          >
            PULSO SÍSMICO
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 900, letterSpacing: -2, lineHeight: 1.03 }}>
            {SITE_NAME}
          </div>
          <div
            style={{
              color: "#D6E2EF",
              display: "flex",
              fontSize: 38,
              fontWeight: 500,
              lineHeight: 1.25,
              marginTop: 24,
            }}
          >
            Últimos sismos en Chile
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 14,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 999,
              color: "#C4D0DF",
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              padding: "14px 22px",
            }}
          >
            Actividad sísmica reciente · visual clara · contexto esencial
          </div>
        </div>
      </div>

      <ChileShape />
      <SeismicMarker />
    </OgFrame>
  );
}

interface EarthquakeOgCardProps {
  depthKm: number;
  magnitude: number;
  place: string;
}

export function EarthquakeOgImage({ depthKm, magnitude, place }: EarthquakeOgCardProps) {
  return (
    <OgFrame>
      <div
        style={{
          ...baseText,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 74px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
            <div
              style={{
                color: COLORS.textSecondary,
                display: "flex",
                fontSize: 23,
                fontWeight: 700,
                letterSpacing: 4,
                marginBottom: 20,
              }}
            >
              PULSO SÍSMICO
            </div>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 900, letterSpacing: -2, lineHeight: 1.02 }}>
              {place}
            </div>
            <div
              style={{
                color: "#D6E2EF",
                display: "flex",
                fontSize: 32,
                fontWeight: 500,
                lineHeight: 1.28,
                marginTop: 18,
              }}
            >
              Resumen visual del evento sísmico
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              background: "linear-gradient(135deg, #0F2B47, #1B4469)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 999,
              boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
              display: "flex",
              height: 150,
              justifyContent: "center",
              minWidth: 150,
            }}
          >
            <div style={{ display: "flex", fontSize: 62, fontWeight: 900 }}>{magnitude.toFixed(1)}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 18, width: "100%" }}>
          {[
            ["Magnitud", magnitude.toFixed(1)],
            ["Profundidad", `${depthKm} km`],
            ["Fuente", "Pulso Sísmico"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: "rgba(19,35,58,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 26,
                display: "flex",
                flex: 1,
                flexDirection: "column",
                padding: "22px 24px",
              }}
            >
              <div style={{ color: COLORS.textSecondary, display: "flex", fontSize: 20, fontWeight: 700 }}>{label}</div>
              <div style={{ display: "flex", fontSize: 32, fontWeight: 800, marginTop: 10 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </OgFrame>
  );
}

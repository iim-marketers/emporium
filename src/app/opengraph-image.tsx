import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — Aviation & Hospitality Training`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(140deg, #0d1642 0%, #101a4d 55%, #1d2b79 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <path
              d="M6 33 L27 6 C31 1 39 3 38 10 L34 33 C33.4 36 31 37 28 37 L10 37 C6.5 37 4.5 35 6 33 Z"
              fill="#d91f2a"
            />
            <g stroke="#fff" strokeWidth="1.7" strokeLinecap="round">
              <path d="M26 14 V28 M19 21 H33 M21.5 16.5 L30.5 25.5 M30.5 16.5 L21.5 25.5" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 1 }}>
              EMPORIUM
            </div>
            <div style={{ fontSize: 16, letterSpacing: 6, color: "#9db0ee" }}>
              BUILDING A NEW NATION
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              color: "#9db0ee",
              textTransform: "uppercase",
            }}
          >
            Aviation · Hospitality · Travel
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 700 }}>
            Train for the skies.
          </div>
          <div style={{ fontSize: 30, color: "#c8d2f4", maxWidth: 820 }}>
            Cabin crew, airport ground staff and hospitality training with dedicated
            placement support.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 20,
            color: "#93a2d6",
            borderTop: "1px solid rgba(157,176,238,0.25)",
            paddingTop: 28,
          }}
        >
          <span>6 career-ready programs</span>
          <span>Placement cell on campus</span>
          <span>Admissions open</span>
        </div>
      </div>
    ),
    size,
  );
}

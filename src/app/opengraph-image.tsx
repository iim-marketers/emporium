import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

// Request-independent, so the art is read once at module scope.
const lockup = await readFile(
  join(process.cwd(), "public/images/logo-lockup-inverse.png"),
  "base64",
);
const lockupSrc = `data:image/png;base64,${lockup}`;

export const alt = `${site.name} — Aviation & Hospitality Training`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={lockupSrc} height={98} alt="" />
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

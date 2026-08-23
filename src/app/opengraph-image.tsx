import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0e14",
          backgroundImage:
            "radial-gradient(circle, rgba(63,185,80,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 24,
            color: "#3fb950",
            marginBottom: 16,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {"// backend engineer"}
        </p>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#e6edf3",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {siteConfig.name}
        </h1>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 32,
            color: "#3fb950",
            marginTop: 16,
          }}
        >
          {siteConfig.title}
        </p>
        <p
          style={{
            fontSize: 24,
            color: "#8b949e",
            marginTop: 32,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.tagline}
        </p>
      </div>
    ),
    { ...size },
  );
}

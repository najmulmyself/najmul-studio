import { SITE } from "@/data/site";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The card shown when the site is shared (WhatsApp, LinkedIn, X, Slack…).
// Built once at build time.
export const alt = `${SITE.name}: you bring the idea, I'll ship it to the App Store`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The display font, as a TTF (the image renderer can't read woff2).
async function displayFont() {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700").then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null; // Falls back to the default font rather than failing the build.
  }
}

export default async function OpengraphImage() {
  const [font, avatar] = await Promise.all([displayFont(), readFile(join(process.cwd(), "public/avatar-pixel.png"))]);
  const domain = new URL(SITE.url).hostname.replace(/^www\./, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fafaf9",
          color: "#1a1a1a",
          fontFamily: font ? "Bricolage" : undefined,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(39,71,240,0.16)",
            filter: "blur(80px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img
            src={`data:image/png;base64,${avatar.toString("base64")}`}
            width={112}
            height={112}
            style={{ borderRadius: 9999, border: "5px solid #fff", boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }}
            alt=""
          />
          <div style={{ display: "flex", fontSize: 46, fontWeight: 700, letterSpacing: -1.5 }}>
            najmul<span style={{ color: "#2747f0" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 82, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3.5 }}>
          <span style={{ color: "#a3a39c" }}>You bring the idea.</span>
          <span>I’ll ship it to the App Store.</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#3d3d3a" }}>
            <div style={{ width: 16, height: 16, borderRadius: 9999, background: "#34c759" }} />
            {SITE.status} · iOS apps & AI automation
          </div>
          <div style={{ display: "flex", color: "#2747f0", fontWeight: 700 }}>{domain}</div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Bricolage", data: font, weight: 700, style: "normal" }] : [] },
  );
}

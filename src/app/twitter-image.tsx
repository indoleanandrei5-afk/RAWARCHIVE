import { ImageResponse } from "next/og";

export const alt = "RAW ARCHIVE PHOTOS - Hand-edited cinematic photo retouching";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at 14% 18%, rgba(229,221,206,0.2), transparent 40%), radial-gradient(circle at 88% 80%, rgba(179,169,151,0.16), transparent 44%), #070707",
          color: "#f4f3ef",
        }}
      >
        <div
          style={{
            letterSpacing: "0.32em",
            fontSize: 22,
            textTransform: "uppercase",
            opacity: 0.78,
          }}
        >
          RAW ARCHIVE PHOTOS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 66, lineHeight: 1.06, fontWeight: 600, maxWidth: "90%" }}>
            Hand-Edited Photo Retouching
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.25, opacity: 0.84, maxWidth: "84%" }}>
            Cinematic color, natural skin tones, and consistent professional delivery.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            opacity: 0.78,
          }}
        >
          <div>@rawarchivephotos</div>
          <div style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>Worldwide service</div>
        </div>
      </div>
    ),
    size,
  );
}
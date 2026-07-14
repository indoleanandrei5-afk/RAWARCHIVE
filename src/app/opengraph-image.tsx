import { ImageResponse } from "next/og";

export const alt = "RAW ARCHIVE PHOTOS - Professional hand-edited photo retouching";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "radial-gradient(circle at 20% 15%, rgba(231,223,209,0.22), transparent 40%), radial-gradient(circle at 80% 75%, rgba(193,183,166,0.2), transparent 45%), #040404",
          color: "#f8f7f4",
        }}
      >
        <div
          style={{
            letterSpacing: "0.34em",
            fontSize: 24,
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          RAW ARCHIVE PHOTOS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 600, maxWidth: "90%" }}>
            Professional Photo Editing
          </div>
          <div style={{ fontSize: 32, lineHeight: 1.25, opacity: 0.86, maxWidth: "88%" }}>
            Hand-edited cinematic retouching with natural tone and consistent finishing.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          <div>https://www.rawarchivephotos.com</div>
          <div style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>No AI editing</div>
        </div>
      </div>
    ),
    size,
  );
}
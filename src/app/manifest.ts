import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RAW ARCHIVE PHOTOS",
    short_name: "RAW ARCHIVE",
    description: "Professional hand-edited photo retouching and cinematic color refinement.",
    categories: ["photography", "business", "lifestyle"],
    lang: "en-US",
    start_url: "/",
    display: "standalone",
    background_color: "#040404",
    theme_color: "#040404",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

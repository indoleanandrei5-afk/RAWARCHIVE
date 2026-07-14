import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/locations",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/locations/:slug",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

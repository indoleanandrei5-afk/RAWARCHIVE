import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
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

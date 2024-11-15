import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.pics",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.GITHUB_PAGES === "true" ? "export" : undefined,
  assetPrefix:
    process.env.GITHUB_PAGES === "true" ? "/When-Tomorrow-Remembers" : undefined,
};

export default nextConfig;


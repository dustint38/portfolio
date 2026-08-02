import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json exists in the user home directory; pin the
  // workspace root so Next/Turbopack doesn't infer the wrong one.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import { StatsWriterPlugin } from "webpack-stats-plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, options) => {
    const { dev, isServer } = options;

    // Output webpack stats JSON file only for
    // client-side/production build
    if (!dev && !isServer) {
      config.plugins.push(
        new StatsWriterPlugin({
          filename: "../webpack-stats.json",
          stats: {
            assets: true,
            chunks: true,
            modules: true,
          },
        }),
      );
    }

    return config;
  },
};

export default nextConfig;

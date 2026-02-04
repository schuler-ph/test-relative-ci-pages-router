import { type Config } from "@relative-ci/cli";

export default {
  // Read commit message from the git logs, GitHub Action event data or GitHub API
  includeCommitMessage: true,
  // Save agent payload to disk for debugging
  // @example './relative-ci-payload.json',
  payloadFilepath: undefined,
  // Enable ingest payload compression
  compress: false,
  webpack: {
    // Path to Webpack stats JSON file
    stats: ".next/server/webpack-stats.json",
  },
} satisfies Config;
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const { withSentryConfig } = require("@sentry/nextjs");
const { withAxiom } = require("next-axiom");

const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagsapi.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "icons.duckduckgo.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  sentry: {
    hideSourceMaps: true,
  },
};

const SentryWebpackPluginOptions = {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

module.exports = withAxiom(
  withSentryConfig(withBundleAnalyzer(nextConfig), SentryWebpackPluginOptions),
);

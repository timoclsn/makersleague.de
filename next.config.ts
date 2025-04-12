import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
  basePath: "",
  images: {
    minimumCacheTTL: 2678400,
    formats: ["image/webp"],
    remotePatterns: [
      {
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "makersleague.de",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
      {
        protocol: "https",
        hostname: "st27fwzq2l.ufs.sh",
        pathname: "/f/*",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/bee.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/_hive/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
      // PostHog rewrites
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/haeufige-fragen",
        destination: "/faqs",
        permanent: true,
      },
      {
        source: "/unsere-mitglieder",
        destination: "/mitglieder",
        permanent: true,
      },
      {
        source: "/core-values",
        destination: "/ueber#values",
        permanent: true,
      },
      {
        source: "/2021/04/30/1-aller-anfang-ist-leer",
        destination: "/einblicke/aller-anfang-ist-leer",
        permanent: true,
      },
      {
        source: "/2021/05/18/2-vom-trauen-und-trauern",
        destination: "/einblicke/vom-trauen-und-trauern",
        permanent: true,
      },
      {
        source: "/2021/06/07/3-aufbruchsstimmung/",
        destination: "/einblicke/aufbruchsstimmung",
        permanent: true,
      },
      {
        source: "/2021/07/29/4-home-sweet-home",
        destination: "/einblicke/home-sweet-home",
        permanent: true,
      },
      {
        source: "/2021/12/23/5-noch-einmal-mit-gefuehl/",
        destination: "/einblicke/noch-einmal-mit-gefuehl",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/einblicke",
        permanent: true,
      },
      {
        source: "/blog/aller-anfang-ist-leer",
        destination: "/einblicke/aller-anfang-ist-leer",
        permanent: true,
      },
      {
        source: "/blog/vom-trauen-und-trauern",
        destination: "/einblicke/vom-trauen-und-trauern",
        permanent: true,
      },
      {
        source: "/blog/aller-anfang-ist-leer",
        destination: "/einblicke/aller-anfang-ist-leer",
        permanent: true,
      },
      {
        source: "/blog/aufbruchsstimmung",
        destination: "/einblicke/aller-anfang-ist-leer",
        permanent: true,
      },
      {
        source: "/blog/home-sweet-home",
        destination: "/einblicke/home-sweet-home",
        permanent: true,
      },
      {
        source: "/blog/noch-einmal-mit-gefuehl",
        destination: "/einblicke/noch-einmal-mit-gefuehl",
        permanent: true,
      },
      {
        source: "/blog/endlich-wieder-leben-in-der-bude",
        destination: "/einblicke/endlich-wieder-leben-in-der-bude",
        permanent: true,
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;

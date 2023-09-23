const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "easyverein.com",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
      {
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              typescript: true,
              svgo: true,
              prettier: true,
              replaceAttrValues: {
                "#000": "currentColor",
                "#101F18": "currentColor",
              },
            },
          },
        ],
      }
    );

    return config;
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
        destination: "/blog/aller-anfang-ist-leer",
        permanent: true,
      },
      {
        source: "/2021/05/18/2-vom-trauen-und-trauern",
        destination: "/blog/vom-trauen-und-trauern",
        permanent: true,
      },
      {
        source: "/2021/06/07/3-aufbruchsstimmung/",
        destination: "/blog/aufbruchsstimmung",
        permanent: true,
      },
      {
        source: "/2021/07/29/4-home-sweet-home",
        destination: "/blog/home-sweet-home",
        permanent: true,
      },
      {
        source: "/2021/12/23/5-noch-einmal-mit-gefuehl/",
        destination: "/blog/noch-einmal-mit-gefuehl",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);

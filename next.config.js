const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            typescript: true,
            svgo: true,
            prettier: true,
            replaceAttrValues: {
              '#000': 'currentColor',
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withContentlayer()(nextConfig);

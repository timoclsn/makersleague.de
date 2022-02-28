const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['easyverein.com', 's.gravatar.com'],
  },
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
              '#101F18': 'currentColor',
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withContentlayer()(nextConfig);

/**
 * @type {import('next').NextConfig}
 */

const {
  PrismaPlugin,
} = require('@prisma/nextjs-monorepo-workaround-plugin')

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [
        ...config.plugins,
        new PrismaPlugin(),
      ]
    }

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
    ],
  },
}

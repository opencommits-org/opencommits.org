import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['next-intl/config'] = path.resolve(__dirname, './i18n/request.ts')
    return config
  },
  turbopack: {
    root: __dirname,
    resolveAlias: {
      'next-intl/config': './i18n/request.ts',
    },
  },
}

export default nextConfig

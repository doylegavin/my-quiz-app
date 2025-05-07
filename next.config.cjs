// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
  },
  transpilePackages: ['react-image-crop'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      os: require.resolve('os-browserify'),
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer'),
    };
    return config;
  },
  // Avoid static generation for API routes
  modularizeImports: {
    'next-auth': {
      transform: 'next-auth/{{path}}'
    }
  }
}

module.exports = nextConfig;

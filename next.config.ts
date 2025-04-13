// next.config.js
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/profile',
        has: [{ type: 'query', key: 'mock' }],
        destination: '/profile',
      },
      {
        source: '/api/v1/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
      // Adicione outros padrões se necessário
    ],
  },
}

module.exports = nextConfig
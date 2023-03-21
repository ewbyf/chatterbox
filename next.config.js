/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/app",
        destination: "/app/explore",
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig

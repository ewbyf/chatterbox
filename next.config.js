/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false

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

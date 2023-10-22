/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST: process.env.HOST,
    CANDIDATE_PORT: process.env.CANDIDATE_PORT,
    COMPANY_PORT: process.env.COMPANY_PORT,
    PROJECT_PORT: process.env.PROJECT_PORT,
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

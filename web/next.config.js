/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST: process.env.HOST,
    CANDIDATE_PORT: process.env.CANDIDATE_PORT,
    COMPANY_PORT: process.env.COMPANY_PORT,
    PROJECT_PORT: process.env.PROJECT_PORT,
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST: process.env.HOST,
    AUTH_PORT: process.env.AUTH_PORT,
    CANDIDATE_PORT: process.env.CANDIDATE_PORT,
    COMPANY_PORT: process.env.COMPANY_PORT,
    PROJECT_PORT: process.env.PROJECT_PORT,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
}

module.exports = nextConfig

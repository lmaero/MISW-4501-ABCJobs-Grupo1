/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST: process.env.HOST,
    CANDIDATE_PORT: process.env.CANDIDATE_PORT,
  },
}

module.exports = nextConfig

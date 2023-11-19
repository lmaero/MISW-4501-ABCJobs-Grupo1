import dotenv from 'dotenv'

dotenv.config()

const isDevEnv = process.env.NODE_ENV === 'development'
export const clientString = isDevEnv
  ? 'postgresql://postgres:postgres@localhost:5432/postgres'
  : process.env.DATABASE_URL

const isDevEnv = process.env.NODE_ENV === 'development'

export const pgClientConfig = {
  user: isDevEnv ? 'postgres' : process.env.POSTGRES_USER,
  host: isDevEnv ? 'postgres' : process.env.POSTGRES_HOST,
  database: isDevEnv ? 'postgres' : process.env.POSTGRES_HOST,
  password: isDevEnv ? 'postgres' : process.env.POSTGRES_HOST,
  port: 5432,
}

import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

export async function generateAccessToken(email: string): Promise<string> {
  if (!process.env.TOKEN_SECRET) throw JsonWebTokenError

  return jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
    expiresIn: '24h',
  })
}

export async function decodeToken(token: string): Promise<string> {
  return jwt_decode(token)
}

export async function tokenExpired(expiredTime: number) {
  let isExpiredToken = false
  const dateNow = new Date()
  if (expiredTime < dateNow.getTime() / 1000) {
    isExpiredToken = true
  }
  return isExpiredToken
}

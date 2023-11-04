import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import jwt_decode, { JwtPayload } from 'jwt-decode'

export async function generateAccessToken(email: string, type: string): Promise<string> {
  if (!process.env.TOKEN_SECRET) throw JsonWebTokenError

  return jwt.sign({ email: email, type: type }, process.env.TOKEN_SECRET, {
    expiresIn: '365d',
  })
}

interface Payload extends JwtPayload {
  email: string
  type: string
}

export async function decodeToken(token: string): Promise<Payload> {
  return jwt_decode(token)
}

export async function tokenExpired(expiredTime: number | undefined) {
  const dateNow = new Date()

  if (!expiredTime) {
    return true
  }

  return expiredTime < dateNow.getTime() / 1000
}

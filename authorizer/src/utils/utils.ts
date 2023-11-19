import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import jwt_decode, { JwtPayload } from 'jwt-decode'

export async function generateAccessToken(
  email: string,
  type: string,
  id_type: string,
  id: number,
): Promise<string> {
  if (!process.env.TOKEN_SECRET) throw JsonWebTokenError
  if (id_type === 'candidateid') {
    return jwt.sign(
      { email: email, type: type, candidateid: id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '365d',
      },
    )
  } else {
    return jwt.sign(
      { email: email, type: type, company_id: id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '365d',
      },
    )
  }
}

interface Payload extends JwtPayload {
  email: string
  type: string
  id_type: string
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

import { JWTPayload, jwtVerify } from 'jose'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export function useJWT() {
  const [payload, setPayload] = useState<JWTPayload | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const tokenSecret = process.env.TOKEN_SECRET

    if (!tokenSecret) throw new Error('Please set the TOKEN_SECRET')

    const secret = new TextEncoder().encode(tokenSecret)

    if (token) {
      jwtVerify(token, secret)
        .then((decodedToken) => {
          setPayload(decodedToken.payload)
        })
        .catch(() => {
          // Token is invalid
          toast.warning('Invalid token. Please login again.')
          localStorage.removeItem('token')
          setPayload(null)
          window.location.href = '/login'
        })
    }
  }, [])

  return payload
}

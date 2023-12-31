import axios from 'axios'
import { Candidate } from '../interfaces/auth'

const getUserInfo = async (token: string): Promise<Candidate> => {
  try {
    const host = process.env.AUTH_HOST
    const port = process.env.AUTH_PORT
    const response = await axios.get<Candidate>(
      `http://${host}:${port}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getUserInfo }

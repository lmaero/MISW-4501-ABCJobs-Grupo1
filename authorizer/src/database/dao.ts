import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { Client } from 'pg'
import { clientString } from './pgClientConfig'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client(clientString)
    this.client.connect()
  }

  async authenticateUser(email: string, password: string) {
    if (!process.env.TOKEN_SECRET) {
      throw JsonWebTokenError
    }

    const token = jwt.sign({ email }, process.env.TOKEN_SECRET)
    // Insert the information
    const query = `
        INSERT INTO "Candidate" ("email", "password",
                                 "token")
        VALUES ($1, $2, $3)
    `

    try {
      await this.client.query(query, [email, password])
      return { msg: '200' }
    } catch (err) {
      console.log(err)
      return { msg: '400' }
    }
  }

  async getUserInfo(email: string) {
    const query = `SELECT *
                   FROM "Candidate"
                   WHERE email = $1`

    try {
      const res = await this.client.query(query, [email])
      const userInfo = res?.rows[0]
      if (userInfo) {
        return {
          personId: userInfo.personId,
          country: userInfo.country,
          languages: userInfo.languages,
          academicalDataId: userInfo.academicalDataId,
          technicalDataId: userInfo.technicalDataId,
          workDataId: userInfo.workDataId,
          isAvailable: userInfo.isAvailable,
          softSkills: userInfo.softSkills,
          interviewId: userInfo.interviewId,
          email: userInfo.email,
          password: userInfo.password,
        }
      } else {
        return { msg: '400' }
      }
    } catch (err) {
      console.log(err)
      return { msg: '400' }
    }
  }
}

export default Dao

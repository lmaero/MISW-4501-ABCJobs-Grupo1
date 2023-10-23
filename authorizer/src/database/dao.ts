import { Client } from 'pg'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB_NAME,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    })
    this.client.connect()
  }

  async authenticateUser(
    personId: number,
    country: string,
    languages: string,
    academicalDataId: number,
    technicalDataId: number,
    workDataId: number,
    isAvailable: boolean,
    softSkills: string,
    interviewId: number,
    email: string,
    password: string,
    token: string,
  ) {
    // Generate token

    // Insert the information
    const query = `
            INSERT INTO "Candidate" ("personId", "country", "languages",
                                     "academicalDataId", "technicalDataId",
                                     "workDataId", "isAvailable", "softSkills",
                                     "interviewId", "email", "password",
                                     "token")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `

    try {
      await this.client.query(query, [
        personId,
        country,
        languages,
        academicalDataId,
        technicalDataId,
        workDataId,
        isAvailable,
        softSkills,
        interviewId,
        email,
        password,
        token,
      ])
      return { msg: '201' }
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

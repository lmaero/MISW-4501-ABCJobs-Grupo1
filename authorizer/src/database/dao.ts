import { Client } from 'pg'
import { clientString } from './pgClientConfig'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client(clientString)
    this.client.connect()
  }

  async authenticateUser(
    email: string,
    password: string,
    token: string,
    isCandidate: boolean,
  ) {
    const candidateQuery = `
      UPDATE "Candidate" set token = $3 where email = $1 and password = $2
    `
    const companyQuery = `
      UPDATE "Company" set token = $3 where email = $1 and password = $2
    `

    const query = isCandidate ? candidateQuery : companyQuery

    try {
      await this.client.query(query, [email, password, token])
      return { msg: '200' }
    } catch (err) {
      console.log(err)
      throw new Error('There was a problem processing the request in the DB')
    }
  }

  async isUserRegistered(email: string, password: string, type: string) {
    const isCandidate = type === 'Candidate'
    const candidateQuery = `
    SELECT email FROM "Candidate" WHERE email = $1 AND password = $2
    `
    const companyQuery = `
    SELECT email FROM "Company" WHERE email = $1 AND password = $2
    `

    const query = isCandidate ? candidateQuery : companyQuery

    try {
      const userInDb = await this.client.query(query, [email, password])
      return { found: userInDb.rowCount > 0, isCandidate }
    } catch (err) {
      console.log(err)
      throw new Error('There was a problem processing the request in the DB')
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
          msg: '200',
          email: userInfo.email,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          candidateid: userInfo.candidateid,
          type: userInfo.type,
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

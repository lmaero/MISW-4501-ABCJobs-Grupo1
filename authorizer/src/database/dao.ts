import { Client } from 'pg'
import { clientString } from './pgClientConfig'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client(clientString)
    void this.client.connect()
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

    const lookForRegistered = `
    SELECT email FROM "Candidate" WHERE email = $1
    UNION SELECT email FROM "Company" WHERE email = $1
    `

    const userRegistered = await this.client.query(lookForRegistered, [email])
    if (userRegistered === undefined || userRegistered.rowCount === 0)
      return { found: false, isCandidate: false }

    const candidateQuery = `
    SELECT email, candidateid FROM "Candidate" WHERE email = $1 AND password = $2
    `
    const companyQuery = `
    SELECT email, company_id FROM "Company" WHERE email = $1 AND password = $2
    `

    const query = isCandidate ? candidateQuery : companyQuery

    try {
      const userInDb = await this.client.query(query, [email, password])
      const id = isCandidate
        ? userInDb.rows[0].candidateid
        : userInDb.rows[0].company_id
      if (!userInDb.rowCount) return { found: 0, isCandidate, id }
      return { found: userInDb?.rowCount > 0, isCandidate, id }
    } catch (err) {
      console.log(err)
      throw new Error('There was a problem processing the request in the DB')
    }
  }

  async getInfo(email: string, type: string) {
    const isCandidate = type === 'Candidate'

    const candidateQuery = `
    SELECT email, first_name, last_name, candidateid FROM "Candidate" WHERE email = $1
    `
    const companyQuery = `SELECT email, company_name, company_id FROM "Company" WHERE email = $1
    `
    const query = isCandidate ? candidateQuery : companyQuery

    try {
      const res = await this.client.query(query, [email])
      const info = res?.rows[0]
      if (info) {
        if (isCandidate) {
          return {
            msg: '200',
            email: info.email,
            first_name: info.first_name,
            last_name: info.last_name,
            candidateid: info.candidateid,
            type: 'Candidate',
          }
        } else {
          return {
            msg: '200',
            email: info.email,
            company_name: info.company_name,
            company_id: info.company_id,
          }
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

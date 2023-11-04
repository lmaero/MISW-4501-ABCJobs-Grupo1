import { Client } from 'pg'
import { clientString } from './pgClientConfig'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client(clientString)
    this.client.connect()
  }

  async authenticateUser(email: string, password: string, token: string) {
    const query = `
       UPDATE "Candidate" set token = $3 where email = $1 and password = $2
       `

    try {
      await this.client.query(query, [email, password, token])
      return { msg: '200' }
    } catch (err) {
      console.log(err)
      return { msg: '400' }
    }
  }

  async isUserRegistered(email: string, password: string) {
    const query = `
       select email from  "Candidate" where email = $1 and password = $2
       `

    try {
      const userInDb = await this.client.query(query, [email, password])
      if (userInDb.rowCount > 0) {
        return { msg: '200' }
      } else {
        return { msg: '400' }
      }
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

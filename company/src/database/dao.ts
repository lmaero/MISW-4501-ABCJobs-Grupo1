import { Client } from 'pg'
import { clientString } from './pgClientConfig'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client(clientString)
    this.client.connect()
  }

  async storeCompany(email: string, password: string, company_name: string) {
    const query = `INSERT INTO "Company" ("email", "password", "company_name")
                       VALUES ($1, $2, $3)`
    try {
      await this.client.query(query, [email, password, company_name])
      return { msg: '201' }
    } catch (err) {
      return { msg: '400' }
    }
  }

  async updateCompanyProfile(
    email: string,
    size: string,
    main_address: string,
    segments: string,
    preferred_language: string,
    main_contact: string,
  ) {
    const query = `UPDATE "Company"
                       SET size               = $2,
                           main_address       = $3,
                           segments           = $4,
                           preferred_language = $5,
                           main_contact       = $6
                       WHERE email = $1`

    try {
      await this.client.query(query, [
        email,
        size,
        main_address,
        segments,
        preferred_language,
        main_contact,
      ])
      console.log('Company updated!')
      return { msg: '201' }
    } catch (err) {
      return { msg: '400' }
    }
  }
}

export default Dao

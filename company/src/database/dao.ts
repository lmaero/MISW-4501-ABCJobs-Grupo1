import { Client } from 'pg'
import { clientString } from './pgClientConfig'
import {Question, QuestionSch} from "../schemas/Question";

class Dao {
  private client: Client

  constructor() {
    //clientString
    this.client = new Client({
      // Remove this connection wehn testing with the containers and put the clientString without the curly braces
      user: "postgres",
      port: 5432,
      host: "localhost",
      password: "postgres",
      database: "postgres",
    })
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

  async storeTest(applicable_to: string[], questions: Question) {
    const query = `INSERT INTO "Test" ("applicable_to", "questions")
                       VALUES ($1, $2)`
    try {
      await this.client.query(query, [applicable_to, {questions}])
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

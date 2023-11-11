import { Client } from 'pg'
import { Question } from '../schemas/Test'
import { clientString } from './pgClientConfig'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client(clientString)
    void this.client.connect()
  }

  async getInterviewsPerCompany(company_id: number) {
    const query = `select * from "Interview" where company_id = $1`
    try {
      const interviews = await this.client.query(query, [company_id])
      if (interviews.rows.length > 0) {
        return { msg: '201', interviews: interviews.rows }
      } else {
        return { msg: '400' }
      }
    } catch (err) {
      return { msg: '400' }
    }
  }

  async getTests() {
    const query = `select * from "Test"`
    try {
      const tests = await this.client.query(query)
      if (tests.rows.length > 0) {
        return { msg: '201', tests: tests.rows }
      } else {
        return { msg: '400' }
      }
    } catch (err) {
      return { msg: '400' }
    }
  }

  async getTestById(id: string) {
    const query = `select * from "Test" where test_id = $1`
    try {
      const test = await this.client.query(query, [id])
      if (test.rows.length > 0) {
        return { msg: '201', tests: test.rows }
      } else {
        return { msg: '400' }
      }
    } catch (err) {
      return { msg: '400' }
    }
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

  async storeInterview(
      candidateid: number,
      company_id: number,
      date: string
  ) {
    const query = `INSERT INTO "Interview" ("candidateid", "company_id","schedule")
                   VALUES ($1, $2, $3)`

    try {
      await this.client.query(query, [candidateid, company_id, date])
      return { msg: '201' }
    } catch (err) {
      return { msg: '400' }
    }
  }


  async storeTest(
    name: string,
    applicable_to: string[],
    questions: Question[],
  ) {
    const query = `INSERT INTO "Test" ("name", "applicable_to", "questions")
                   VALUES ($1, $2, $3)`
    try {
      await this.client.query(query, [
        name,
        applicable_to,
        JSON.stringify(questions),
      ])
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

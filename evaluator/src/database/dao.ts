import { Client } from 'pg'
import { clientString } from './pgClientConfig'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client(clientString)
    void this.client.connect()
  }

  async getTestsResults(candidate_id: number) {
    const query = ` select tp.candidateid as candidate_id,
                               tp.test_id,
                               t.name         as test_name,
                               t.questions,
                               tp.answers
                        from "TestPerformed" tp
                                 left join "Candidate" c on tp.candidateid = c.candidateid
                                 left join "Test" t on tp.test_id = t.test_id
                        where tp.candidateid = $1
        `
    try {
      const tests = await this.client.query(query, [candidate_id])
      if (tests.rows.length > 0) {
        return { msg: '201', tests: tests.rows }
      } else {
        return { msg: '400' }
      }
    } catch (err) {
      return { msg: '400' }
    }
  }

  async getAllTestsResults() {
    const query = `
            SELECT tp.candidateid AS candidateid,
                   c.first_name   AS candidate,
                   'Tech test'    AS test_type,
                   t.name         AS test_name,
                   'Satisfactory' AS result,
                   tp.score       AS score,
                   t.test_id      AS test_id
            FROM "TestPerformed" tp
                     LEFT JOIN "Candidate" c ON tp.candidateid = c.candidateid
                     LEFT JOIN "Test" t ON tp.test_id = t.test_id
        `

    try {
      const tests = await this.client.query(query)
      if (tests.rows.length !== 0) {
        return { msg: '201', tests: tests.rows }
      } else {
        return { msg: '400', tests: [] }
      }
    } catch (err) {
      return { msg: '400' }
    }
  }

  async updateCandidateTestScore(
    candidate_id: number,
    test_id: number,
    score: number,
  ) {
    const query = ` update "TestPerformed"
                        set score = $3
                        where candidateid = $1
                          and test_id = $2
        `
    try {
      const tests = await this.client.query(query, [
        candidate_id,
        test_id,
        score,
      ])
      return { msg: '201', tests }
    } catch (err) {
      return { msg: '400' }
    }
  }
}

export default Dao

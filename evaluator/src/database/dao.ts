import { Client } from 'pg'

class Dao {
  private client: Client

  constructor() {
    //clientString
    this.client = new Client({
      user: 'postgres',
      port: 5432,
      host: 'localhost',
      password: 'postgres',
      database: 'postgres',
    })
    this.client.connect()
  }

  async getTestsResults(candidate_id: string) {
    const query = ` select tp.candidateid as candidate_id, tp.test_id, t.name as test_name, t.questions, tp.answers
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

  async updateCandidateTestScore(
    candidate_id: string,
    test_id: string,
    score: number,
  ) {
    const query = ` update "TestPerfomed" set score = $3  
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

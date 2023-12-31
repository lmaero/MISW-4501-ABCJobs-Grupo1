import { Client } from 'pg'
import { clientString } from './pgClientConfig'

class Dao {
  private client: Client

  constructor() {
    this.client = new Client(clientString)
    void this.client.connect()
  }

  async storeProject(
    budget: number,
    deadline: Date,
    description: string | undefined,
    price: number,
    team: string[],
    stakeholders: string,
  ) {
    const query = `
            INSERT INTO "Project" ("budget", "deadline", "description",
                                   "price",
                                   "team", "stakeholders")
            VALUES ($1, $2, $3, $4, $5, $6)
        `
    try {
      await this.client.query(query, [
        budget,
        deadline,
        description,
        price,
        team,
        stakeholders,
      ])
      return { msg: '201' }
    } catch (err) {
      return { msg: '400' }
    }
  }

  async getProjects() {
    const query = `select * from "Project"`
    try {
      const projects = await this.client.query(query)
      if (projects.rows.length > 0) {
        return { msg: '200', tests: projects.rows }
      } else {
        return { msg: '400' }
      }
    } catch (err) {
      return { msg: '400' }
    }
  }
}

export default Dao

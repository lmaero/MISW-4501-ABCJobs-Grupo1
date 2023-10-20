const { Client } = require('pg')
const bind = require('pg-bind')

class Dao {
  private client

  constructor() {
    // When using the containers use the commented part
    this.client = new Client({
      // user: process.env.POSTGRES_USER,
      // host: process.env.POSTGRES_HOST,
      // database: process.env.POSTGRES_DB_NAME,
      // password: process.env.POSTGRES_PASSWORD,
      // port: process.env.POSTGRES_PORT,
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 5432,
    })
    this.client.connect()
  }

  async storeProject(
    budget: number,
    deadline: Date,
    description: string | undefined,
    price: number,
    team: string[],
    stakeholders: string,
  ) {
    const query = `INSERT INTO "Project" ("budget", "deadline", "description",
                                          "price",
                                          "team", "stakeholders")
                   VALUES (:budget, :deadline, :description, :price, :team,
                           :stakeholders)
    `
    const queryPrepared = bind(query, {
      budget: budget,
      deadline: deadline,
      description: description,
      price: price,
      team: team,
      stakeholders: stakeholders,
    })
    try {
      await this.client.query(queryPrepared)
      return { msg: '201' }
    } catch (err) {
      return { msg: '400' }
    }
  }
}

export default Dao

const { Client } = require('pg')
const bind = require('pg-bind')

class Dao {
  private client

  constructor() {
    this.client = new Client({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB_NAME,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
    })
    this.client.connect()
  }

  async authenticateUser(
    personId: number,
    country: string,
    languages: string,
    academicalDataId: number,
    technicalDataId: number,
    workDataId: number,
    isAvailable: boolean,
    softSkills: string,
    interviewId: number,
    email: string,
    password: string,
    token: string,
  ) {
    // Generate token

    // Insert the information
    const query = `INSERT INTO "Candidate" ("personId", "country", "languages", "academicalDataId", "technicalDataId", 
        "workDataId", "isAvailable", "softSkills", "interviewId", "email", "password", "token")
        VALUES (:personId, :country, :languages, :academicalDataId, :technicalDataId,
         :workDataId, :isAvailable, :softSkills, :interviewId, :email, :password, :token)`

    const queryPrepared = bind(query, {
      personId: personId,
      country: country,
      languages: languages,
      academicalDataId: academicalDataId,
      technicalDataId: technicalDataId,
      workDataId: workDataId,
      isAvailable: isAvailable,
      softSkills: softSkills,
      interviewId: interviewId,
      email: email,
      password: password,
      token: token,
    })

    try {
      await this.client.query(queryPrepared)
      return { msg: '201' }
    } catch (err) {
      console.log(err)
    }
    return { msg: '400' }
  }

  async getUserInfo(email: string) {
    const query = `SELECT *  FROM  "Candidate" WHERE email = :email`

    const queryPrepared = bind(query, {
      email: email,
    })

    try {
      const res = await this.client.query(queryPrepared)
      return {
        personId: res.rows[0].personId,
        country: res.rows[0].country,
        languages: res.rows[0].languages,
        academicalDataId: res.rows[0].academicalDataId,
        technicalDataId: res.rows[0].technicalDataId,
        workDataId: res.rows[0].workDataId,
        isAvailable: res.rows[0].isAvailable,
        softSkills: res.rows[0].softSkills,
        interviewId: res.rows[0].interviewId,
        email: res.rows[0].email,
        password: res.rows[0].password,
      }
    } catch (err) {
      return { msg: '400' }
    }
  }
}

export default Dao

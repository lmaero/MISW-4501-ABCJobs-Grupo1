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
    lenguages: string,
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
    const query = `INSERT INTO "Candidate" ("personId", "country", "lenguages", "academicalDataId", "technicalDataId", 
        "workDataId", "isAvailable", "softSkills", "interviewId", "email", "password", "token")
        VALUES (:personId, :country, :lenguages, :academicalDataId, :technicalDataId,
         :workDataId, :isAvailable, :softSkills, :interviewId, :email, :password, :token)`

    const queryPrepared = bind(query, {
      personId: personId,
      country: country,
      lenguages: lenguages,
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
      const res = await this.client.query(queryPrepared)
      console.log('Token update')
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
      console.log('Email information')
      const info = {
        personId: res.rows[0].personId,
        country: res.rows[0].country,
        lenguages: res.rows[0].lenguages,
        academicalDataId: res.rows[0].academicalDataId,
        technicalDataId: res.rows[0].technicalDataId,
        workDataId: res.rows[0].workDataId,
        isAvailable: res.rows[0].isAvailable,
        softSkills: res.rows[0].softSkills,
        interviewId: res.rows[0].interviewId,
        email: res.rows[0].email,
        password: res.rows[0].password,
      }
      return info
    } catch (err) {
      console.log(err)
    }
    return { msg: '400' }
  }
}

export default Dao

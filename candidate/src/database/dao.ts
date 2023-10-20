import { Client } from 'pg'

class Dao {
  private client

  constructor() {
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

  async storeCandidate(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
  ) {
    const query = `INSERT INTO "Candidate" ("email", "password", "first_name",
                                            "last_name")
                   VALUES ($1, $2, $3, $4)`

    try {
      await this.client.query(query, [email, password, first_name, last_name])
      return { msg: '201' }
    } catch (err) {
      return { msg: '400' }
    }
  }

  async updateCandidateProfile(
    email: string,
    role: string,
    languages: string[],
    soft_skills: string[],
    location: string,
    technical_data: string[],
    academical_data: string[],
    experience: string[],
    work_data: string[],
    is_available: string,
    interview_id: string,
    address: string,
  ) {
    const query = `UPDATE "Candidate"
                   SET role            = $2,
                       languages       = $3,
                       soft_skills     = $4,
                       location        = $5,
                       technical_data  = $6,
                       academical_data = $7,
                       experience      = $8,
                       work_data       = $9,
                       is_available    = $10,
                       interview_id    = $11,
                       address         = $12
                   WHERE email = $1`

    try {
      await this.client.query(query, [
        email,
        role,
        languages,
        soft_skills,
        location,
        technical_data,
        academical_data,
        experience,
        work_data,
        is_available,
        interview_id,
        address,
      ])
      console.log('Candidate updated!')
      return { msg: '201' }
    } catch (err) {
      console.log(err)
    }
    return { msg: '400' }
  }

  async searchCandidate(
    role: string[],
    languages: string[],
    soft_skills: string[],
    spoken_languages: string[],
  ) {
    const query = `SELECT *
                   FROM "Candidate"
                   WHERE 1 = 1
                      or role = any ($1)
                      or $2 = any (technical_data)
                      or $3 = any (soft_skills)
                      or $4 = any (languages)`

    try {
      const res = await this.client.query(query, [
        role,
        languages,
        soft_skills,
        spoken_languages,
      ])
      console.log(res)
      return { msg: '200', res }
    } catch (err) {
      console.log(err)
    }
    return { msg: '400' }
  }
}

export default Dao

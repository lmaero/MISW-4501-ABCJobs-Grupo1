import { Client } from 'pg'
import { AcademicExperience } from '../schemas/AcademicData'
import { Experience } from '../schemas/ExperienceData'
import { TechnicalData } from '../schemas/TechnicalData'

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
    academical_data: AcademicExperience[],
    certifications: string,
    experience: Experience[],
    email: string,
    location: string,
    soft_skills: string,
    role: string,
    languages: string,
    technical_data: TechnicalData,
  ) {
    const query = `UPDATE "Candidate"
                   SET academical_data = $1,
                       certifications  = $2,
                       experience      = $3,
                       email           = $4,
                       location        = $5,
                       soft_skills     = $6,
                       role            = $7,
                       languages       = $8,
                       technical_data  = $9
                   WHERE email = $4`

    try {
      await this.client.query(query, [
        JSON.stringify(academical_data),
        certifications,
        JSON.stringify(experience),
        email,
        location,
        soft_skills,
        role,
        languages,
        JSON.stringify(technical_data),
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

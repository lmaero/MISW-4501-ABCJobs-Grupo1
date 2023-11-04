import { Client } from 'pg'
import { AcademicExperience } from '../schemas/AcademicData'
import { Experience } from '../schemas/ExperienceData'
import { TechnicalData } from '../schemas/TechnicalData'

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

  async storeCandidate(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
  ) {
    const query = `INSERT INTO "Candidate" ("email", "password",
                                            "first_name",
                                            "last_name")
                   VALUES ($1, $2, $3, $4)`

    try {
      await this.client.query(query, [email, password, first_name, last_name])
      return { msg: '201' }
    } catch (err) {
      return { msg: '400' }
    }
  }

  async storeTestPerformedByCandidate(
    candidate_id: string,
    test_id: number,
    answers: string[],
  ) {
    const query = `insert into "TestPerformed"
                    values ($1, $2, $3)
                   `
    try {
      await this.client.query(query, [candidate_id, test_id, answers])
      console.log('Test perfomed by the candidate was saved!')
      return { msg: '200' }
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
    const query = `with result as (with role (col) as (select experience,
                                                              technical_data ->> 'roles' as programming_languages,
                                                              soft_skills,
                                                              languages,
                                                              email
                                                       from "Candidate")
                                   select y.x ->> 'role' "position",
                                          soft_skills,
                                          languages as   spoken_languages,
                                          programming_languages,
                                          email
                                   from role,
                                        lateral (select jsonb_array_elements(role.col) x) y)
                   select *
                   from result
                   where 1 = 1
                      or position in ($1)
                      or programming_languages in ($2)
                      or soft_skills in ($3)
                      or spoken_languages in ($4)`
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
      return { msg: '200' }
    } catch (err) {
      console.log(err)
    }
    return { msg: '400' }
  }
}

export default Dao

import { Client } from 'pg'
import { clientString } from './pgClientConfig'

export const client = new Client(clientString)

async function tableExists(tableName: string) {
  try {
    const result = await client.query(
      `
                SELECT EXISTS (SELECT 1
                               FROM information_schema.tables
                               WHERE table_name = $1);
            `,
      [tableName],
    )
    return result.rows[0].exists
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function createTableIfNotExists() {
  const tableName = 'Candidate'
  const exists = await tableExists(tableName)

  if (!exists) {
    try {
      await client.query(`
                CREATE TABLE IF NOT EXISTS "${tableName}"
                (
                    "academical_data" JSONB,
                    "certifications"  TEXT,
                    "email"           TEXT NOT NULL UNIQUE,
                    "experience"      JSONB,
                    "first_name"      TEXT,
                    "interview_id"    TEXT,
                    "is_available"    BOOLEAN,
                    "languages"       TEXT,
                    "last_name"       TEXT,
                    "location"        TEXT,
                    "password"        TEXT NOT NULL,
                    "role"            TEXT,
                    "soft_skills"     TEXT,
                    "technical_data"  JSONB,
                    "token"           TEXT,
                    "candidateid"     SERIAL PRIMARY KEY
                );
            `)

      console.log(`Table "${tableName}" created.`)
    } catch (error) {
      console.error(error)
      throw error
    }
  } else {
    console.log(`Table "${tableName}" already exists.`)
  }
}

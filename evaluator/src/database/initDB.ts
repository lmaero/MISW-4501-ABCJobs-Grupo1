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
  const tableName = 'TestPerformed'
  const exists = await tableExists(tableName)

  if (!exists) {
    try {
      await client.query(`
                CREATE TABLE IF NOT EXISTS "${tableName}"
                (
                      "candidate_id"       INT,
                      "test_id"            INT,
                      "answers"            TEXT[],
                      "score"              FLOAT
                );
            `)

      await client.query(`
                CREATE TABLE IF NOT EXISTS "Test"
                (
                      "name"               TEXT,
                      "applicable_to"      TEXT[],
                      "type"               TEXT,
                      "result"             INT,
                      "questions"          JSONB,
                      "is_individual_test" BOOLEAN,
                      "is_finished"        BOOLEAN,
                      "has_authorization"  JSONB,
                      "was_supplanted"     BOOLEAN,
                      "minutes_duration"   INT,
                      "test_id"            SERIAL PRIMARY KEY
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

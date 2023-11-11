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

export async function createCompanyTableIfNotExists() {
  const tableName = 'Company'
  const exists = await tableExists(tableName)

  if (!exists) {
    try {
      await client.query(`
                CREATE TABLE IF NOT EXISTS "${tableName}"
                (
                    "company_name"       TEXT,
                    "email"              TEXT NOT NULL unique,
                    "main_address"       TEXT,
                    "main_contact"       TEXT,
                    "password"           TEXT NOT NULL,
                    "preferred_language" TEXT,
                    "segments"           TEXT,
                    "size"               TEXT,
                    "token"              TEXT
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

export async function createTestTableIfNotExists() {
  const tableName = 'Test'
  const exists = await tableExists(tableName)

  if (!exists) {
    try {
      await client.query(`
                CREATE TABLE IF NOT EXISTS "${tableName}"
                (
                        "name"               TEXT,
                        "applicable_to"      TEXT[],
                        "type"               TEXT,
                        "result"             INT,
                        "questions"          JSONB,
                        "is_individual_test" BOOLEAN,
                        "is_finished"        BOOLEAN,
                        "has_authorization"  JSONB[],
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

export async function createInterviewTableIfNotExists() {
  const tableName = 'Interview'
  const exists = await tableExists(tableName)

  if (!exists) {
    try {
      await client.query(`
                CREATE TABLE IF NOT EXISTS "${tableName}"
                (
                            "candidateid"        INT,
                            "company_id"         INT,  
                            "schedule"          TIMESTAMP,
                            "result"            TEXT[],
                            "interview_id"      SERIAL PRIMARY KEY
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
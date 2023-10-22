import http from 'node:http'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import { client, createTableIfNotExists } from './database/initDB'
import companyRouter from './routes/company'

dotenv.config()

const app: Application = express()
const { NODE_ENV, COMPANY_PORT: PORT } = process.env

if (!NODE_ENV || !PORT) {
  console.error('FATAL: NODE_ENV or PORT are not set')
  console.log(`NODE_ENV ${NODE_ENV}`)
  console.log(`PORT ${PORT}`)
  process.exit(1)
}

// Set CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:80',
  'http://localhost:8000',
]
const options: cors.CorsOptions = {
  origin: allowedOrigins,
}
app.use(cors(options))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/company', companyRouter)

const server = http.createServer(app)

client
  .connect()
  .then(() => createTableIfNotExists())
  .then(() => {
    console.info('Table was created successfully')
  })
  .catch((error) => {
    console.error('Error:', error)
  })
  .finally(() => {
    client.end() // Close the database connection
  })

server
  .listen(PORT)
  .on('listening', () => {
    console.log(`Running in ${NODE_ENV.toUpperCase()} mode`)
    console.log(`Listening on port: ${PORT}`)
  })
  .on('error', (err: unknown) => {
    console.error(err)
    process.exit(1)
  })

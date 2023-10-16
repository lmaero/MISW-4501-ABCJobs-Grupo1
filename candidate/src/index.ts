import http from 'node:http'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import candidateRouter from './routes/candidate'

dotenv.config()

const app: Application = express()
const { NODE_ENV, CANDIDATE_PORT: PORT } = process.env

if (!NODE_ENV || !PORT) {
  console.error('FATAL: NODE_ENV or PORT are not set')
  console.log(`NODE_ENV ${NODE_ENV}`)
  console.log(`PORT ${PORT}`)
  process.exit(1)
}

app.use('/candidate', candidateRouter)

const server = http.createServer(app)

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

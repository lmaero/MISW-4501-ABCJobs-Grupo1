import http from 'node:http'
import express, { Application } from 'express'

const app: Application = express()
const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.AUTH_PORT

if (!NODE_ENV || !PORT) {
  console.error('FATAL: NODE_ENV or PORT are not set')
  console.log(`NODE_ENV ${NODE_ENV}`)
  console.log(`PORT ${PORT}`)
  process.exit(1)
}

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

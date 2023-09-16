import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import routes from './routes/routes'

dotenv.config()

const app: Express = express()
const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.AUTH_PORT

if (!NODE_ENV || !PORT) {
  console.error('FATAL: NODE_ENV or PORT are not set')
  console.log(`NODE_ENV ${NODE_ENV}`)
  console.log(`PORT ${PORT}`)
  process.exit(1)
}

// For json data
app.use(express.json())

// Set CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080']
const options: cors.CorsOptions = {
  origin: allowedOrigins,
}
app.use(cors(options))

// Handling routes requests
app.use('/', routes)
app.use('/auth', routes)
app.use('/auth/me', routes)
app.use('/auth/ping', routes)

app
  .listen(PORT)
  .on('listening', () => {
    console.log(`Running in ${NODE_ENV.toUpperCase()} mode`)
    console.log(`Listening on port: ${PORT}`)
  })
  .on('error', (err: unknown) => {
    console.error(err)
    process.exit(1)
  })

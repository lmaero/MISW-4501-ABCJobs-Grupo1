import express from 'express'
import { register, registerProfile } from '../controllers/company'

const companyRouter = express.Router()

companyRouter.post('/register', register)
companyRouter.post('/register/profile', registerProfile)

export default companyRouter

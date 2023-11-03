import express from 'express'
import { createTest, register, registerProfile } from '../controllers/company'

const companyRouter = express.Router()

companyRouter.post('/register', register)
companyRouter.post('/register/profile', registerProfile)
companyRouter.post('/test', createTest)

export default companyRouter

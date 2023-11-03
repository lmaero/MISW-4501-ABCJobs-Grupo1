import express from 'express'
import {createTest, getTestById, getTests, register, registerProfile} from '../controllers/company'

const companyRouter = express.Router()

companyRouter.post('/register', register)
companyRouter.post('/register/profile', registerProfile)
companyRouter.post('/test', createTest)
companyRouter.get('/tests', getTests)
companyRouter.get('/tests/:id', getTestById)

export default companyRouter

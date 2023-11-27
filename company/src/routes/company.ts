import express from 'express'
import {
  createInterview,
  createTest,
  getInterviewsPerCompany,
  getTestById,
  getTests,
  register,
  registerProfile,
  setInterviewResult,
} from '../controllers/company'

const companyRouter = express.Router()

companyRouter.post('/register', register)
companyRouter.post('/register/profile', registerProfile)
companyRouter.post('/test', createTest)
companyRouter.get('/tests', getTests)
companyRouter.get('/tests/:id', getTestById)
companyRouter.get('/interviews', getInterviewsPerCompany)
companyRouter.post('/interviews', createInterview)
companyRouter.post('/interviews/result', setInterviewResult)

export default companyRouter

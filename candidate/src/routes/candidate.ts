import express from 'express'
import candidateControllers from '../controllers/candidate'
import { userValidation } from '../middlewares/auth'

const candidateRouter = express.Router()

candidateRouter.get('/evaluate', userValidation, candidateControllers.getTests)

export default candidateRouter

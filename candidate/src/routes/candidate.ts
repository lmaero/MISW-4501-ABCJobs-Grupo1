import express from 'express'
import candidateControllers from '../controllers/candidate'
import { userValidation } from '../middlewares/auth'

const candidateRouter = express.Router()

candidateRouter.get('/ping', candidateControllers.ping)
candidateRouter.get('/evaluate', userValidation, candidateControllers.getTests)
candidateRouter.post('/register', candidateControllers.register)
candidateRouter.post('/register/profile', candidateControllers.registerProfile)
candidateRouter.post('/register/search', candidateControllers.searchCandidate)
export default candidateRouter

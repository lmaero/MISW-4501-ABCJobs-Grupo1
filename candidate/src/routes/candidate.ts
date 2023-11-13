import express from 'express'
import candidateControllers from '../controllers/candidate'

const candidateRouter = express.Router()

candidateRouter.get('/ping', candidateControllers.ping)
candidateRouter.post('/register', candidateControllers.register)
candidateRouter.post('/register/profile', candidateControllers.registerProfile)
candidateRouter.post('/search', candidateControllers.searchCandidate)
candidateRouter.get('/interviews', candidateControllers.getInterviewsPerCandidate)
candidateRouter.get('/tests', candidateControllers.getAllTests)
candidateRouter.post('/test', candidateControllers.testPerformed)


export default candidateRouter

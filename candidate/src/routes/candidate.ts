import express from 'express'
import candidateControllers from '../controllers/candidate'

const candidateRouter = express.Router()

candidateRouter.post('/ping', candidateControllers.ping)
candidateRouter.post('/register', candidateControllers.register)
candidateRouter.post('/register/profile', candidateControllers.registerProfile)
candidateRouter.post('/search', candidateControllers.searchCandidate)

export default candidateRouter

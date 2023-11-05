import express from 'express'
import resultsControllers from '../controllers/results'

const resultsRouter = express.Router()

resultsRouter.get(
  '/byCandidate/:candidateId',
  resultsControllers.getResultsByUser,
)

export default resultsRouter

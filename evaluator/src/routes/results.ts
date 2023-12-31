import express from 'express'
import resultsControllers from '../controllers/results'

const resultsRouter = express.Router()

resultsRouter.get(
  '/byCandidate/:candidateId',
  resultsControllers.getResultsByUser,
)
resultsRouter.get('/tests', resultsControllers.getAllResults)

export default resultsRouter

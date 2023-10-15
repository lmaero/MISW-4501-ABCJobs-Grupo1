import express from 'express'
import resultsControllers from '../controllers/results'

const resultsRouter = express.Router()

resultsRouter.get('/byCandidate/:personId', resultsControllers.getResultsByUser)

export default resultsRouter

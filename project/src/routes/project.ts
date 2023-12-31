import express from 'express'
import companyController from '../controllers/project'

const projectRouter = express.Router()

projectRouter.post('/register', companyController.register)
projectRouter.get('/', companyController.getProjects)

export default projectRouter

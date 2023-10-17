import express from 'express'
import companyController from '../controllers/company'
import { userValidation } from '../middlewares/auth'

const companyRouter = express.Router()

companyRouter.post('/register', userValidation, companyController.register)

export default companyRouter

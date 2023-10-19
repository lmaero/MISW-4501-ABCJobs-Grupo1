import express from 'express'
import companyController from '../controllers/company'

const companyRouter = express.Router()

companyRouter.post('/register', companyController.register)
companyRouter.post('/register/profile', companyController.registerProfile)

export default companyRouter

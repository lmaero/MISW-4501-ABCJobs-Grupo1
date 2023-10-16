import { Request, Response } from 'express'
import { authenticateUser, getUserInfo } from '../controllers/auth'

// Importing the modules
const express = require('express')

// Creating express Router
const router = express.Router()

router.get('/auth', async (req: Request, res: Response) => {
  const data = req.body
  const userInfo = {
    personId: data.personId,
    country: data.country,
    languages: data.languages,
    academicalDataId: data.academicalDataId,
    technicalDataId: data.technicalDataId,
    workDataId: data.workDataId,
    isAvailable: data.isAvailable,
    softSkills: data.softSkills,
    interviewId: data.interviewId,
    email: data.email,
    password: data.password,
    token: '',
  }

  const userData = await authenticateUser(userInfo)
  res.send({ userData })
})

router.get('/auth/me', async (req: Request, res: Response) => {
  const headersInfo = req.headers
  const token = headersInfo.authorization?.split(' ')[1]
  if (token && token !== '') {
    const userInfo = await getUserInfo(token)
    res.send({ userInfo })
  }
  return { msg: 'Invalid token provided' }
})

router.get('/auth/ping', async (req: Request, res: Response) => {
  res.send({ msg: 'pong' })
})

export default router;

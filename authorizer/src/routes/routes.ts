import { Request, Response } from 'express'
import { authenticateUser, getUserInfo } from '../controllers/auth'
import { LoginSch } from '../schemas/Login'

const express = require('express')

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
  try {
    const safeParse = LoginSch.safeParse(req.body)

    if (safeParse.success) {
      const userInfo = {
        email: safeParse.data.email,
        password: safeParse.data.password,
        type: safeParse.data.type,
      }

      const userData = await authenticateUser(userInfo)
      return res.send({ userData })
    }
  } catch (e) {
    console.error(e)
  }
})

router.get('/auth/me', async (req: Request, res: Response) => {
  const headersInfo = req.headers
  const token = headersInfo.authorization?.split(' ')[1]
  if (token && token !== '') {
    const userInfo = await getUserInfo(token);
    res.send({ userInfo })
  }
  return { msg: 'Invalid token provided' }
})

router.get('/auth/ping', async (req: Request, res: Response) => {
  res.send({ msg: 'pong' })
})

export default router

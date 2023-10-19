import { Request, Response } from 'express'
import { Test } from '../interfaces/evaluator'
import { CandidatePreSch } from '../schemas/Candidate'
import { getTestsByUser } from '../services/evaluator'

const ping = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: 'pong' })
}

const getTests = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user } = req.headers

    if (!user) {
      return res.status(400).json({ message: 'No user provided' })
    }

    const {
      userInfo: { personId },
    } = JSON.parse(user.toString())

    console.log(
      `[CandidateManagement] Getting tests for candidate ${personId}, from evaluator service`,
    )
    const tests: Test[] = await getTestsByUser(Number(personId))

    return res
      .status(200)
      .json({ message: 'test evaluated successfully', tests })
  } catch (error) {
    console.dir(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const register = async (req: Request, res: Response) => {
  try {
    console.dir(req.body)
    const result = CandidatePreSch.safeParse(req.body)

    if (result.success) {
      const email = result.data.email
      const password = result.data.password
      const fullName = result.data.fullName
      const firstName = fullName[0]
      const lastName = fullName[1]
      return res.status(200).json({ message: 'User registered' })
    } else {
      return res.status(400).json({
        message: result.error.message,
      })
    }

    // Revisar si estan bien los datos

    // Crear el candidato
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getTests,
  register,
  ping,
}

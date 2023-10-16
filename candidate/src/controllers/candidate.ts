import { Request, Response } from 'express'
import { Test } from '../interfaces/evaluator'
import { getTestsByUser } from '../services/evaluator'

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
    const data = req.body
    console.dir(data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getTests,
  register,
}

import { Request, Response } from 'express'
import { Test } from '../interfaces/evaluator'
import { getTestsByUser } from '../services/evaluator'
import {CandidatePreSch} from "../schemas/Candidate";

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
    // Obtener datos
    const data = req.body;
    const isDataOk = CandidatePreSch.safeParse(req.body);

    if (isDataOk) {
      const email = data["email"];
      const password = data["password"];
      const fullName = data["fullName"].split(" ")
      const firstName = fullName[0];
      const lastName = fullName[1];
      return res.status(200).json({ message: 'User registered' })
    } else {
      return res.status(400).json({ message: 'Data provided is not valid, verify email format, password length and fullname should be of 2 names' })
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

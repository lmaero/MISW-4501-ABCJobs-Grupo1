import { Request, Response } from 'express'
import Dao from '../database/dao'
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
    const result = CandidatePreSch.safeParse(req.body)

    if (result.success) {
      const email = result.data.email
      const password = result.data.password
      const full_name = result.data.fullName.split(' ')
      const first_name = full_name[0]
      const last_name = full_name[1]

      const dao = new Dao()
      const dbResult = await dao.storeCandidate(
        email,
        password,
        first_name,
        last_name,
      )
      if (dbResult.msg === '201') {
        return res.status(201).json({ message: 'User registered', email })
      } else {
        return res
          .status(400)
          .json({ message: 'Email already registered, try to login' })
      }
    } else {
      return res.status(400).json({
        message: result.error.message,
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const registerProfile = async (req: Request, res: Response) => {
  try {
    const result = req.body
    const email = result.email

    if (email !== ' ') {
      const role = result.role
      const languages = result.languages
      const soft_skills = result.softSkills
      const location = result.location
      const technical_data = result.technicalData
      const academical_data = result.academicalData
      const experience = result.experience
      const work_data = result.workData
      const is_available = result.isAvailable
      const interview_id = result.interviewId
      const address = result.address

      const dao = new Dao()
      const dbResult = await dao.updateCandidateProfile(
        email,
        role,
        languages,
        soft_skills,
        location,
        technical_data,
        academical_data,
        experience,
        work_data,
        is_available,
        interview_id,
        address,
      )
      if (dbResult.msg === '201') {
        return res.status(200).json({ message: 'User information updated' })
      } else {
        return res.status(404).json({
          message: 'There was an error updating the candidate profile',
        })
      }
    } else {
      return res.status(400).json({
        message: result.error.message,
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const searchCandidate = async (req: Request, res: Response) => {
  try {
    const result = req.body

    if (result !== ' ') {
      const role = result.role
      const languages = result.languages
      const soft_skills = result.soft_skills
      const spoken_languages = result.spoken_languages

      const dao = new Dao()
      const dbResult = await dao.searchCandidate(
        role,
        languages,
        soft_skills,
        spoken_languages,
      )
      if (dbResult.msg === '200') {
        return res.status(200).json({ candidates: dbResult.res?.rows })
      } else {
        return res
          .status(400)
          .json({ message: 'No candidate found with the criteria provided' })
      }
    } else {
      return res.status(400).json({
        message: result.error.message,
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getTests,
  ping,
  register,
  registerProfile,
  searchCandidate,
}

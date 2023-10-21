import { Request, Response } from 'express'
import Dao from '../database/dao'
import { Test } from '../interfaces/evaluator'
import { CandidatePreSch } from '../schemas/Candidate'
import { CandidateProfileSch } from '../schemas/CandidateProfile'
import { getTestsByUser } from '../services/evaluator'

export async function ping(req: Request, res: Response): Promise<Response> {
  return res.status(200).json({ message: 'pong' })
}

export async function register (req: Request, res: Response){
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
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function registerProfile(req: Request, res: Response){
  try {
    const result = CandidateProfileSch.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        message: result.error.message,
      })
    } else {
      const academical_data = result.data.academicData
      const certifications = result.data.certifications
      const experience = result.data.experienceData
      const email = result.data.email
      const location = result.data.location
      const soft_skills = result.data.mainSoftSkills
      const role = result.data.role
      const languages = result.data.spokenLanguages
      const technical_data = result.data.technicalData

      const dao = new Dao()
      const dbResult = await dao.updateCandidateProfile(
        academical_data,
        certifications,
        experience,
        email,
        location,
        soft_skills,
        role,
        languages,
        technical_data,
      )
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function searchCandidate(req: Request, res: Response){
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
  ping,
  register,
  registerProfile,
  searchCandidate,
}

import axios from 'axios'
import { Request, Response } from 'express'
import Dao from '../database/dao'
import { CandidatePreSch } from '../schemas/Candidate'
import { CandidateProfileSch } from '../schemas/CandidateProfile'

export async function ping(req: Request, res: Response): Promise<Response> {
  return res.status(200).json({ message: 'pong' })
}

const getInterviewsPerCandidate = async (req: Request, res: Response) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1]
    axios.defaults.headers.common = { Authorization: `bearer ${token}` }
    const authResult = await axios.get('http://0.0.0.0:4000/auth/me')
    const candidateid = authResult.data.userInfo.candidateid

    const dao = new Dao()
    const dbResult = await dao.getInterviewsPerCandidate(candidateid)
    if (dbResult.msg === '201') {
      return res.status(201).json({ interviews: dbResult.interviews })
    } else {
      return res
        .status(400)
        .json({ message: 'No test associated with the id provided' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getInterviewResults = async (req: Request, res: Response) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1]
    axios.defaults.headers.common = { Authorization: `bearer ${token}` }
    const authResult = await axios.get('http://0.0.0.0:4000/auth/me')
    const candidateid = authResult.data.userInfo.candidateid
    const interviewId = req.params.interviewId;

    const dao = new Dao()
    const dbResult = await dao.getInterviewResults(candidateid, interviewId)

    if (dbResult.msg === '201') {
      // @ts-ignore
      return res.status(201).json(dbResult.interviews[0].result)
    } else {
      return res
        .status(400)
        .json({ message: 'No test associated with the id provided' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function register(req: Request, res: Response) {
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

export async function registerProfile(req: Request, res: Response) {
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

      if (dbResult.msg === '200') {
        return res.status(200).json({ candidates: dbResult.msg })
      } else {
        return res
          .status(400)
          .json({ message: 'No candidate found with the criteria provided' })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function searchCandidate(req: Request, res: Response) {
  /*
      Input:
         {
          "role": ["fullstack", "backend", "architect"],
          "languages": ["javascript", "python"],
          "soft_skills": ["leadership", "hardwork"],
          "spoken_languages": ["english", "spanish"]
        }
     */
  try {
    const result = req.body

    if (result !== ' ') {
      const role = result.roles
      const languages = result.programmingLanguages
      const soft_skills = result.softSkills
      const spoken_languages = result.spokenLanguages

      const dao = new Dao()
      const dbResult = await dao.searchCandidate(
        role,
        languages,
        soft_skills,
        spoken_languages,
      )

      // Obten los candidatos y busca si cumple alguno de los criterios
      const candidates =
        dbResult?.res?.rows !== undefined ? dbResult.res.rows : []
      const candidatesExpectedList = []
      for (const candidate in candidates) {
        const isRoleRequested = role.includes(candidates[candidate].position)
        const isLanguageRequested = languages.includes(
          candidates[candidate].languages,
        )
        const isSoftSkillRequested = soft_skills.includes(
          candidates[candidate].soft_skills,
        )
        const isSpokenLanguageRequested = spoken_languages.includes(
          candidates[candidate].spoken_languages,
        )
        if (
          isRoleRequested ||
          isLanguageRequested ||
          isSoftSkillRequested ||
          isSpokenLanguageRequested
        ) {
          candidatesExpectedList.push(candidates[candidate])
        }
      }
      if (dbResult.msg === '200' && candidatesExpectedList.length > 0) {
        return res.status(200).json(candidatesExpectedList)
      } else {
        return res
          .status(404)
          .json({ message: 'No candidate found with the criteria provided' })
      }
    } else {
      return res.status(404).json({
        message: result.error.message,
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function testPerformed(req: Request, res: Response) {
  try {
    const token = req?.headers?.authorization?.split(' ')[1]
    axios.defaults.headers.common = { Authorization: `bearer ${token}` }
    const authResult = await axios.get('http://0.0.0.0:4000/auth/me')
    const candidateId = authResult.data.userInfo.candidateid
    const testData = req.body

    if (testData !== ' ') {
      const dao = new Dao()
      await dao.storeTestPerformedByCandidate(
        candidateId,
        testData.test_id,
        testData.answers,
      )
      const url = `http://0.0.0.0:4002/evaluator/byCandidate/${candidateId}`
      const evaluatorResult = await axios.get(url)
      if (evaluatorResult.status === 200) {
        return res
          .status(200)
          .json({ message: 'Answers for the test were saved' })
      } else {
        return res
          .status(200)
          .json({ message: 'The answers for the tests were not saved' })
      }
    } else {
      return res.status(400).json({
        message: 'No information provided',
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getAllTests(req: Request, res: Response) {
  try {
    const evaluatorResult = await fetch('http://0.0.0.0:4002/evaluator/tests')

    if (evaluatorResult.ok) {
      const results = await evaluatorResult.json()

      return res.status(200).json({ results: results.resultsForAllCandidates })
    } else {
      return res
        .status(200)
        .json({ message: 'No test results for the candidate' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getTests(req: Request, res: Response) {
  try {
    const token = req?.headers?.authorization?.split(' ')[1]
    axios.defaults.headers.common = { Authorization: `bearer ${token}` }
    const authResult = await axios.get('http://0.0.0.0:4000/auth/me')
    const candidateId = authResult.data.userInfo.candidateid

    const evaluatorResult = await axios.get(
      `http://0.0.0.0:4002/evaluator/byCandidate/${candidateId}`,
    )
    if (evaluatorResult.status === 200) {
      const results = evaluatorResult.data.results
      return res.status(200).json({ results })
    } else {
      return res
        .status(200)
        .json({ message: 'No test results for the candidate' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getTests,
  getAllTests,
  getInterviewsPerCandidate,
  getInterviewResults,
  ping,
  register,
  registerProfile,
  searchCandidate,
  testPerformed,
}

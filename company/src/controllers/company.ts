import { Request, Response } from 'express'
import Dao from '../database/dao'
import { CompanyPreSch } from '../schemas/Company'
import { CompanyProfileSch } from '../schemas/CompanyProfile'
import { TestSch } from '../schemas/Test'
import axios from "axios";

const register = async (req: Request, res: Response) => {
  try {
    const result = CompanyPreSch.safeParse(req.body)

    if (result.success) {
      const email = result.data.email
      const password = result.data.password
      const company_name = result.data.companyName

      const dao = new Dao()
      const dbResult = await dao.storeCompany(email, password, company_name)
      if (dbResult.msg === '201') {
        return res.status(201).json({ message: 'Company registered', email })
      } else {
        return res.status(400).json({
          message: 'Company already registered with this email, try to login',
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

const registerProfile = async (req: Request, res: Response) => {
  try {
    const result = CompanyProfileSch.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        message: result.error.message,
      })
    } else {
      const email = result.data.email
      const size = result.data.size
      const main_address = result.data.mainAddress
      const segments = result.data.segments
      const preferred_language = result.data.preferredLanguage
      const main_contact = result.data.mainContact

      const dao = new Dao()
      const dbResult = await dao.updateCompanyProfile(
        email,
        size,
        main_address,
        segments,
        preferred_language,
        main_contact,
      )
      if (dbResult.msg === '201') {
        return res.status(201).json({ message: 'Company registered', email })
      } else {
        return res.status(400).json({
          message: 'Company already registered with this email, try to login',
        })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const createInterview = async (req: Request, res: Response) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    const authResult = await axios.get('http://0.0.0.0:4000/auth/me');
    const company_id = authResult.data.userInfo.company_id;
    const {candidateId, date} = req.body;

    const dao = new Dao()
    const dbResult = await dao.storeInterview(candidateId, company_id, date)
    if (dbResult.msg === '201') {
      return res.status(201).json({ msg: "Interview saved successfully" })
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
const createTest = async (req: Request, res: Response) => {
  try {
    const result = TestSch.safeParse(req.body)

    if (result.success) {
      const name = result.data.name
      const applicable_to = result.data.applicableTo
      const questions = result.data.questions

      const dao = new Dao()
      const dbResult = await dao.storeTest(name, applicable_to, questions)
      if (dbResult.msg === '201') {
        return res.status(201).json({ message: 'Test created' })
      } else {
        return res.status(400).json({
          message: 'Test could not be created with the provided data',
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

const getInterviewsPerCompany = async (req: Request, res: Response) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    const authResult = await axios.get('http://0.0.0.0:4000/auth/me');
    const company_id = authResult.data.userInfo.company_id;

    const dao = new Dao()
    const dbResult = await dao.getInterviewsPerCompany(company_id)
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

const getTests = async (req: Request, res: Response) => {
  try {
    const dao = new Dao()
    const dbResult = await dao.getTests()
    if (dbResult.msg === '201') {
      return res.status(201).json({ tests: dbResult.tests })
    } else {
      return res.status(400).json({ message: 'No tests created yet' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getTestById = async (req: Request, res: Response) => {
  try {
    const testId: string = req.params.id
    const dao = new Dao()
    const dbResult = await dao.getTestById(testId)
    if (dbResult.msg === '201') {
      return res.status(201).json({ tests: dbResult.tests })
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


export { register, registerProfile, createInterview, createTest, getInterviewsPerCompany, getTests, getTestById }

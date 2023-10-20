import { Request, Response } from 'express'
import Dao from '../database/dao'
import { CompanyPreSch } from '../schemas/Company'
import { CompanyProfileSch } from '../schemas/CompanyProfile'

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

export default {
  register,
  registerProfile,
}

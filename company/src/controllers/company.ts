import { Request, Response } from 'express'
import {CompanyPreSch} from "../schemas/Company";
import Dao from "../database/dao";


const register = async (req: Request, res: Response) => {
  try {

    const data = req.body
    const result = CompanyPreSch.safeParse(req.body)

    if (result.success) {
      const email = result.data.email
      const password = result.data.password
      const company_name = result.data.company_name

      const dao = new Dao();
      const dbResult = await dao.storeCompany(email, password, company_name);
      if(dbResult["msg"] === "201") {
        return res.status(201).json({ message: 'Company registered', email })
      } else {
        return res.status(400).json({ message: 'Company already registered with this email, try to login' })
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

    const data = req.body
    const result = data;
    const email = result.email;

    if (email !== " ") {
      const size = result.size;
      const main_address = result.main_address;
      const segments = result.segments;
      const languages = result.languages;
      const main_contact = result.main_contact;

      const dao = new Dao();
      const dbResult = await dao.updateCompanyProfile(email, size, main_address, segments, languages, main_contact);
      if(dbResult["msg"] === "201") {
        return res.status(201).json({ message: 'Company registered', email })
      } else {
        return res.status(400).json({ message: 'Company already registered with this email, try to login' })
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
  register,
  registerProfile,
}

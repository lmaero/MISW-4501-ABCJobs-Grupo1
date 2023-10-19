import { Request, Response } from 'express'
import {CompanyPreSch} from "../schemas/project";
import Dao from "../database/dao";


const register = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const result = data;

    if (result.stakeholders !== " ") {
      const role = result.role
      const price = result.price
      const budget = result.budget
      const deadline = result.deadline
      const description = result.description
      const stakeholders = result.stakeholders

      const dao = new Dao();
      const dbResult = await dao.storeProject(role, price, budget, deadline, description, stakeholders);
      if(dbResult["msg"] === "201") {
        return res.status(201).json({ message: 'Project registered'})
      } else {
        return res.status(400).json({ message: 'Project not registered, verify the data provided' })
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
}

import { Request, Response } from 'express'
import Dao from '../database/dao'
import { ProjectSch } from '../schemas/Project'

export async function register(req: Request, res: Response) {
  try {
    const result = ProjectSch.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        message: result.error.message,
      })
    } else {
      const budget = result.data.budget
      const deadline = result.data.deadline
      const description = result.data.description
      const price = result.data.price
      const team = result.data.team
      const stakeholders = result.data.stakeholders

      const dao = new Dao()
      const dbResult = await dao.storeProject(
        budget,
        deadline,
        description,
        price,
        team,
        stakeholders,
      )

      if (dbResult.msg === '201') {
        return res.status(201).json({ message: 'Project registered' })
      } else {
        return res.status(400).json({
          message: 'Project not registered, verify the data provided',
        })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getProjects = async (req: Request, res: Response) => {
  try {
    const dao = new Dao()
    const dbResult = await dao.getProjects()
    if (dbResult.msg === '200') {
      return res.status(200).json(dbResult.tests)
    } else {
      return res.status(400).json({ message: 'No projects created' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  register,
  getProjects,
}

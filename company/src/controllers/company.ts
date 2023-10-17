import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { Company } from '../interfaces/company'

const companyClient = new PrismaClient().company
const personClient = new PrismaClient().person

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user } = req.headers

    if (!user) {
      return res.status(401).json({ message: 'No user provided' })
    }

    if (!req.body) {
      return res.status(400).json({ message: 'No body provided' })
    }

    const {
      name,
      size,
      preferredLanguage,
      businessSegments,
      nameMainContact,
      lastNameMainContact,
    }: Company = req.body

    const person = await personClient.findFirstOrThrow({
      where: {
        firstName: nameMainContact,
        lastName: lastNameMainContact,
      },
    })

    if (!person) {
      return res
        .status(400)
        .json({ message: 'No person found with this main contact full name' })
    }

    const company = await companyClient.create({
      data: {
        name,
        size,
        preferredLanguage,
        businessSegments: String(businessSegments).split(','),
        mainContact: {
          connect: {
            id: person.id,
          },
        },
      },
    })

    return res
      .status(200)
      .json({ message: 'Company registered successfully', company })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  register,
}

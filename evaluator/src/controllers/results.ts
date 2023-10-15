import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const candidateClient = new PrismaClient().candidate

const getResultsByUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const personId = req.params.personId
    if (!personId) {
      return res.status(400).json({ message: 'No candidate user provided' })
    }

    console.log(`[Evaluator] Getting results for candidate ${personId}`)

    const person = await candidateClient.findFirst({
      where: {
        personId: parseInt(personId),
      },
      select: {
        Interview: {
          select: {
            tests: {
              select: {
                isFinished: true,
                questions: true,
                results: true,
              },
            },
          },
        },
      },
    })

    const tests = person?.Interview?.tests
    return res.status(200).json(tests)
  } catch (error) {
    console.dir(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getResultsByUser,
}

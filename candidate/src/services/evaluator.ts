import axios from 'axios'
import { Test } from '../interfaces/evaluator'

const getTestsByUser = async (personId: number): Promise<Test[]> => {
  try {
    const host = process.env.EVALUATOR_HOST
    const port = process.env.EVALUATOR_PORT
    const response = await axios.get<Test[]>(
      `http://${host}:${port}/evaluator/results/byCandidate/${personId}`,
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getTestsByUser }

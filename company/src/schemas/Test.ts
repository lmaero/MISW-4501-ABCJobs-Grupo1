import { z } from 'zod'
import { companySizeEnum } from './Enums'
import {QuestionSch} from "./Question";

export const TestSch = z.object({
  applicableTo: z.array(z.string()),
  questions: QuestionSch,
})
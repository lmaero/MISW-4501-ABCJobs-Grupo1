import { z } from 'zod'
import { ZStringSch } from './ZString'

const questionSch = z.object({
  question: ZStringSch.min(5).max(255),
  rightAnswer: ZStringSch.min(5).max(255),
  wrongOptions: z.array(ZStringSch.min(5).max(255)),
})

export const testSch = z.object({
  name: ZStringSch.min(5).max(100),
  applicableTo: z.array(ZStringSch),
  questions: z.array(questionSch),
})

export type Question = z.infer<typeof questionSch>
export type Test = z.infer<typeof testSch>

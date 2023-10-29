import { ZStringSch } from '@/schemas/ZString'
import { z } from 'zod'

const questionSch = z.object({
  question: ZStringSch.min(5).max(255),
  rightAnswer: ZStringSch.min(5).max(255),
  wrongOptions: z.array(ZStringSch.min(5).max(255)),
})

export const testSch = z.object({
  applicableTo: z.array(ZStringSch),
  questions: z.array(questionSch),
})

export type Question = z.infer<typeof questionSch>
export type Test = z.infer<typeof testSch>

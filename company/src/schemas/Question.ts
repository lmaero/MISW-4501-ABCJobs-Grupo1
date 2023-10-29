import { z } from 'zod'
import { companySizeEnum } from './Enums'

export const QuestionInfoSch = z.object({
    question: z.string(),
    rightAnswer: z.string(),
    wrongOptions: z.array(z.string())
})

export const QuestionSch = z.array(QuestionInfoSch)

export type Question = z.infer<typeof QuestionSch>
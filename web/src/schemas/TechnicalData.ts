import { z } from 'zod'
import { commaSeparatedList } from '@/schemas/CommaSeparatedList'

export const technicalDataSchema = z.object({
  techSkills: commaSeparatedList,
  programmingLanguages: commaSeparatedList,
  roles: z.string(),
  yearsOfExperience: z.number().min(0).max(50),
})

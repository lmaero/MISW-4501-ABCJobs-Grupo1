import { commaSeparatedList } from '@/schemas/CommaSeparatedList'
import { z } from 'zod'

export const technicalDataSch = z.object({
  techSkills: commaSeparatedList,
  programmingLanguages: commaSeparatedList,
  roles: z.string(),
  yearsOfExperience: z.number().min(0).max(50),
})

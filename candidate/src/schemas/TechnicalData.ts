import { z } from 'zod'
import { commaSeparatedList } from './CommaSeparatedList'

export const technicalDataSch = z.object({
  techSkills: commaSeparatedList,
  programmingLanguages: commaSeparatedList,
  roles: z.string(),
  yearsOfExperience: z.number().min(0).max(50),
})

export type TechnicalData = z.infer<typeof technicalDataSch>

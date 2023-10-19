import {
  programmingLanguagesEnum,
  softSkillsEnum,
  spokenLanguagesEnum,
  techRoleEnum,
} from '@/schemas/Enums'
import { z } from 'zod'

export const SearchCandidateSch = z.object({
  roles: z.array(techRoleEnum).or(techRoleEnum),
  softSkills: z.array(softSkillsEnum).or(softSkillsEnum),
  spokenLanguages: z.array(spokenLanguagesEnum).or(spokenLanguagesEnum),
  programmingLanguages: z
    .array(programmingLanguagesEnum)
    .or(programmingLanguagesEnum),
})

export type SearchCandidate = z.infer<typeof SearchCandidateSch>

import { z } from 'zod'

export const SearchCandidateSch = z.object({
  roles: z.array(z.string()),
  programmingLanguages: z.array(z.string()),
  softSkills: z.array(z.string()),
  spokenLanguages: z.array(z.string()),
})

export type SearchCandidate = z.infer<typeof SearchCandidateSch>

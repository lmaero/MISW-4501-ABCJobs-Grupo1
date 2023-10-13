import { z } from 'zod'
import { roleEnum } from '@/schemas/Enums'
import { commaSeparatedList } from '@/schemas/CommaSeparatedList'
import { technicalDataSchema } from '@/schemas/TechnicalData'
import { experienceSchema } from '@/schemas/ExperienceData'
import { academicExperienceSchema } from '@/schemas/AcademicData'

export const CandidateProfileSch = z.object({
  role: roleEnum,
  spokenLanguages: commaSeparatedList,
  mainSoftSkills: commaSeparatedList,
  location: z.string(),
  academicData: z.array(academicExperienceSchema),
  technicalData: technicalDataSchema,
  experienceData: z.array(experienceSchema),
})

export type CandidateProfile = z.infer<typeof CandidateProfileSch>

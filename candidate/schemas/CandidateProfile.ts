import { academicExperienceSch } from '@/schemas/AcademicData'
import { commaSeparatedList } from '@/schemas/CommaSeparatedList'
import { roleEnum } from '@/schemas/Enums'
import { experienceSch } from '@/schemas/ExperienceData'
import { technicalDataSch } from '@/schemas/TechnicalData'
import { z } from 'zod'

export const CandidateProfileSch = z.object({
  academicData: z.array(academicExperienceSch),
  certifications: commaSeparatedList,
  experienceData: z.array(experienceSch),
  location: z.string(),
  mainSoftSkills: commaSeparatedList,
  role: roleEnum,
  spokenLanguages: commaSeparatedList,
  technicalData: technicalDataSch,
})

export type CandidateProfile = z.infer<typeof CandidateProfileSch>

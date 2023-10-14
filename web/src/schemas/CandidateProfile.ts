import { z } from 'zod'
import { roleEnum } from '@/schemas/Enums'
import { commaSeparatedList } from '@/schemas/CommaSeparatedList'
import { technicalDataSch } from '@/schemas/TechnicalData'
import { experienceSch } from '@/schemas/ExperienceData'
import { academicExperienceSch } from '@/schemas/AcademicData'

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

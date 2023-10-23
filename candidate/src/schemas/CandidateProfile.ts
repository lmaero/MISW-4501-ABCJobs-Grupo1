import { z } from 'zod'
import { academicExperienceSch } from './AcademicData'
import { commaSeparatedList } from './CommaSeparatedList'
import { techRoleEnum } from './Enums'
import { experienceSch } from './ExperienceData'
import { technicalDataSch } from './TechnicalData'

export const CandidateProfileSch = z.object({
  academicData: z.array(academicExperienceSch),
  certifications: commaSeparatedList,
  experienceData: z.array(experienceSch),
  email: z.string().email(),
  location: z.string(),
  mainSoftSkills: commaSeparatedList,
  role: techRoleEnum,
  spokenLanguages: commaSeparatedList,
  technicalData: technicalDataSch,
})

export type CandidateProfile = z.infer<typeof CandidateProfileSch>

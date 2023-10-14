import { z } from 'zod'
import { commaSeparatedList } from '@/schemas/CommaSeparatedList'
import { dateInPast } from '@/schemas/DateInPast'

export const academicExperienceSchema = z
  .object({
    certifications: commaSeparatedList,
    grade: z.number().min(0).max(5),
    schoolName: z.string().min(3).max(50),
    obtainedDegree: z.string(),
    startDate: dateInPast,
    endDate: z.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date cannot occur before the start date.',
  })

import { z } from 'zod'
import { employmentEnum, techRoleEnum } from '@/schemas/Enums'
import { dateInPast } from '@/schemas/DateInPast'

export const experienceSchema = z
  .object({
    title: z.string().min(2).max(50),
    company: z.string().max(100),
    employment: employmentEnum,
    role: techRoleEnum,
    startDate: dateInPast,
    endDate: z.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date cannot occur before the start date.',
  })

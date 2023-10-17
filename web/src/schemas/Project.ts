import { techRoleEnum } from '@/schemas/Enums'
import { z } from 'zod'

export const ProjectSch = z.object({
  budget: z.number().min(0).max(100_000_000_000),
  deadline: z.coerce.date().refine((date) => date >= new Date()),
  description: z.string().max(500).optional(),
  price: z.number().min(0).max(100_000_000_000),
  team: z.array(techRoleEnum).or(techRoleEnum),
  stakeholders: z.string(),
})

export type Project = z.infer<typeof ProjectSch>

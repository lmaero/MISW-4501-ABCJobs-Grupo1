import { z } from 'zod'

export const techRoleEnum = z.enum([
  'backend',
  'frontend',
  'fullstack',
  'devops',
  'architect',
])

import { z } from 'zod'

export const roleEnum = z.enum([
  'Fullstack Developer',
  'Backend Developer',
  'Frontend Developer',
])

export const employmentEnum = z.enum([
  'Full-Time',
  'Part-Time',
  'Contract',
  'Freelance',
  'Internship',
])

export const techRoleEnum = z.enum([
  'Backend Developer',
  'Frontend Developer',
  'Fullstack Developer',
  'DevOps Engineer',
  'Architect',
])

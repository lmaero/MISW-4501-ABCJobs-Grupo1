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

export const companySizeEnum = z.enum([
  'Startup',
  'Small Business',
  'Enterprise',
])

export const softSkillsEnum = z.enum([
  'leadership',
  'responsibility',
  'communication',
])

export const programmingLanguagesEnum = z.enum([
  'javascript',
  'typescript',
  'python',
  'java',
])

export const spokenLanguagesEnum = z.enum(['english', 'spanish', 'russian'])

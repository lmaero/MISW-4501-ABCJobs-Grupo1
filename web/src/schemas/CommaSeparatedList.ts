import { z } from 'zod'

export const commaSeparatedList = z
  .string()
  .refine((value) => /^[a-zA-Z,]+$/.test(value), {
    message:
      'Invalid format. Please use a comma-separated list of alphabetic characters.',
  })

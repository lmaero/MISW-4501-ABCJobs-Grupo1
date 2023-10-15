import { z } from 'zod'

export const commaSeparatedList = z.string().refine(
  (value) => {
    return /^[a-zA-Z,]+$/.test(value) // This regex checks for alphabetic characters and commas only
  },
  {
    message:
      'Invalid format. Please use a comma-separated list of alphabetic characters.',
  },
)

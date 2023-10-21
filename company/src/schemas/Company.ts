import z from 'zod'
import { ZStringSch } from './ZString'

export const CompanyPreSch = z.object({
  email: ZStringSch.min(1, { message: 'Should be a valid email address' })
    .email()
    .refine((email: string) => email !== '', {
      message: 'Email cannot be empty and should be a valid email address.',
    }),
  password: z
    .string()
    .min(8)
    .max(16)
    .refine(
      (password: string) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/
        return passwordRegex.test(password)
      },
      {
        message:
          'Password must be 8-16 characters and include at least one lowercase letter, one uppercase letter, one symbol, and one number.',
      },
    ),
  companyName: ZStringSch.refine(
    (company_name: string) => {
      const nameRegex = /^[A-Za-z]{2,20} [A-Za-z]{2,20}$/
      return nameRegex.test(company_name)
    },
    {
      message:
        'Full Name should be two words separated by a space, with each word being 2-20 characters long.',
    },
  ),
})

export type CompanyPre = z.infer<typeof CompanyPreSch>

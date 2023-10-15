import { ZStringSch } from '@/schemas/ZString'
import z from 'zod'

export const CompanyPreSch = z.object({
    email: ZStringSch.min(1, { message: 'Should be a valid email address' })
        .email()
        .refine((email) => email !== '', {
            message: 'Email cannot be empty and should be a valid email address.',
        }),
    password: z
        .string()
        .min(8)
        .max(16)
        .refine(
            (password) => {
                const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/
                return passwordRegex.test(password)
            },
            {
                message:
                'Password must be 8-16 characters and include at least one lowercase letter, one uppercase letter, one symbol, and one number.',
            },
        ),
    companyName: z
        .string()
        .min(5)
        .max(100)
        .refine((email) => email !== '', {
            message: 'Company Name cannot be empty.',
        })           
})

export type CompanyPre = z.infer<typeof CompanyPreSch>
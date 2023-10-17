import { CompanyPreSch } from '@/schemas/Company'

describe('Company Schema Validation', () => {
  test('should validate complete form data', () => {
    const validData = {
      email: 'validemail@example.com',
      password: 'Password1!',
      companyName: 'Amazon',
    }

    const result = CompanyPreSch.safeParse(validData)

    expect(result.success).toBe(true)
  })

  test('should validate invalid form data', () => {
    const invalidData = {
      email: 'invalidEmail', // Invalid email
      password: 'password', // Password doesn't meet criteria
      companyName: 'John', // Not two words separated by space
    }

    const result = CompanyPreSch.safeParse(invalidData)

    expect(result.success).toBe(false)
  })
})

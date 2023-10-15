import { generateAccessToken, tokenExpired } from '../src/utils/utils'

jest.mock('jwt-decode')

describe('utils functions validation', () => {
  test('Token expired', async () => {
    const expected = await tokenExpired(1697306132)
    const result = true
    expect(result).toStrictEqual(expected)
  })

  test('Token did not expired', async () => {
    const expected = await tokenExpired(1697306132000)
    const result = false
    expect(result).toStrictEqual(expected)
  })

  test('Access token generated', async () => {
    const JsonWebTokenError = jest.mock('jsonwebtoken', () => ({
      default: jest.fn(() => ({})),
    }))
    const token = '12345'
    try {
      const expected = await generateAccessToken(token)
    } catch (e) {
      const error: any = e
      expect(error.name).toBe('JsonWebTokenError')
    }
  })
})

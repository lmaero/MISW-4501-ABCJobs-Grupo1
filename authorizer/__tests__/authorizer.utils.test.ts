import jwtDecode from 'jwt-decode'
import {
  decodeToken,
  generateAccessToken,
  tokenExpired,
} from '../src/utils/utils'

jest.mock('jwt-decode', () => jest.fn())

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
    jest.mock('jsonwebtoken', () => ({
      default: jest.fn(() => ({})),
    }))

    const token = '12345'

    try {
      await generateAccessToken(token, 'Candidate', 'candidateid', 1)
    } catch (e) {
      const error: unknown = e
      if (error instanceof Error) {
        expect(error.name).toBe('JsonWebTokenError')
      }
    }
  })

  test('Decode token generated', async () => {
    ;(jwtDecode as jest.Mock).mockImplementationOnce(() => ({ exp: 12345 }))
    const token = '12345'
    const result = { exp: 12345 }
    let expected
    try {
      expected = await decodeToken(token)
    } catch (e) {
      const error: unknown = e
      console.log(error)
    }
    expect(expected).toStrictEqual(result)
  })
})

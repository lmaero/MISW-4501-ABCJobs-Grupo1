import { authenticateUser } from '../src/controllers/auth'
import Dao from '../src/database/dao'
import { IUserInfo } from '../src/interfaces/interfaces'

jest.mock('../src/utils/utils', () => ({
  generateAccessToken: jest.fn(() => ({ token: 1234 })),
}))

jest.mock('../src/database/dao')

describe('authenticate user', () => {
  test('authenticate user code 201', async () => {
    jest
      .spyOn(Dao.prototype, 'authenticateUser')
      .mockReturnValue(Promise.resolve({ msg: '201' }))
    const userInfo: IUserInfo = {
      personId: 1,
      country: '1',
      languages: '1',
      academicalDataId: 1,
      technicalDataId: 1,
      workDataId: 1,
      isAvailable: true,
      softSkills: '1',
      interviewId: 1,
      email: '1',
      password: '1',
      token: '1',
    }

    const userResult = {
      personId: 1,
      country: '1',
      languages: '1',
      academicalDataId: 1,
      technicalDataId: 1,
      workDataId: 1,
      isAvailable: true,
      softSkills: '1',
      interviewId: 1,
      email: '1',
      password: '1',
      token: { token: 1234 },
    }

    const expected = await authenticateUser(userInfo)
    const result = userResult
    expect(result).toStrictEqual(expected)
  })

  test('authenticate user code 400', async () => {
    jest.spyOn(Dao.prototype, 'authenticateUser').mockReturnValue(
      Promise.resolve({
        msg: 'The transaction was not successful with the data provided',
        code: 400,
      }),
    )
    const userInfo: IUserInfo = {
      personId: 1,
      country: '1',
      languages: '1',
      academicalDataId: 1,
      technicalDataId: 1,
      workDataId: 1,
      isAvailable: true,
      softSkills: '1',
      interviewId: 1,
      email: '1',
      password: '1',
      token: '1',
    }

    const userResult = {
      msg: 'The transaction was not successful with the data provided',
      code: 400,
    }

    const expected = await authenticateUser(userInfo)
    const result = userResult
    expect(result).toStrictEqual(expected)
  })

  test('User info', async () => {})
})

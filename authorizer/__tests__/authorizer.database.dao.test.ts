import Dao from '../src/database/dao'
import { IUserInfo } from '../src/interfaces/interfaces'

// jest.mock('../src/utils/utils', () => ({
//   generateAccessToken: jest.fn(() => ({token: 1234})),
//   decodeToken: jest.fn(() => ({token: 1234, email: "al@hotmail.com"})),
//   tokenExpired:
// jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false), }));
// jest.mock("../src/database/dao")
jest.mock('jwt-decode', () => jest.fn())
jest.mock('pg')

describe('Dao authenticate user', () => {
  test('dao authenticate user code 201', async () => {
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

    const result = { msg: '201' }
    const dao = new Dao()
    const expected = await dao.authenticateUser(
      1,
      '1',
      '1',
      1,
      1,
      1,
      true,
      '1',
      1,
      '1',
      '1',
      '1',
    )
    expect(result).toStrictEqual(expected)
  })

  test('Dao get user info code 400', async () => {
    const result = { msg: '400' }
    const dao = new Dao()
    const expected = await dao.getUserInfo('al@hotmail.com')
    expect(result).toStrictEqual(expected)
  })
})

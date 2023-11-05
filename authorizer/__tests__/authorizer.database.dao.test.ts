import Dao from '../src/database/dao'

jest.mock('jwt-decode', () => jest.fn())
jest.mock('pg')

describe('Dao authenticate user', () => {
  test('dao authenticate user code 200', async () => {
    const result = { msg: '200' }
    const dao = new Dao()
    const expected = await dao.authenticateUser(
      'so@so.co',
      'Pass123#',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5Ac21pdGgwLjI5ODgyMzA3NjgxNjI1ODc1Lm9yZyIsInR5cGUiOiJDYW5kaWRhdGUiLCJpYXQiOjE2OTkxODU4MTIsImV4cCI6MTczMDcyMTgxMn0.dx50aG2dMGkpT-2W4LTLQZ2CQ_VBbH82pTOmhNVPZmE',
      true,
    )
    expect(result).toStrictEqual(expected)
  })

  test('Dao get user info code 400', async () => {
    const dao = new Dao()
    const result = await dao.getUserInfo('al@hotmail.com')
    const expected = '400'
    expect(result.msg).toStrictEqual(expected)
  })
})

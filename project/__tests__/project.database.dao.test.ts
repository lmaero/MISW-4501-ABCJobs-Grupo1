import Dao from '../src/database/dao'

jest.mock('express')
jest.mock('jwt-decode', () => jest.fn())
jest.mock('pg')

describe('Dao candidate tests', () => {
  test('dao store candidate 201', async () => {
    const dao = new Dao()
    const d = new Date()
    const result = await dao.storeProject(1, d, 'al', 1, ['1'], '1')
    const expected = '201'
    expect(result.msg).toStrictEqual(expected)
  })
})

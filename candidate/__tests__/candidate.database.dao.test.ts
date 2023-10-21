import Dao from '../src/database/dao'

jest.mock('express')
jest.mock('../src/schemas/Candidate')
jest.mock('../src/schemas/CandidateProfile')
jest.mock('jwt-decode', () => jest.fn())
jest.mock('pg')

describe('Dao candidate tests', () => {
  test('dao store candidate', async () => {
    const dao = new Dao()
    const result = await dao.storeCandidate('al', 'al', 'al', 'al')
    const expected = '201'
    expect(result.msg).toStrictEqual(expected)
  })

  test('dao search candidate', async () => {
    const dao = new Dao()
    const result = await dao.searchCandidate(['al'], ['al'], ['al'], ['al'])
    const expected = '200'
    expect(result.msg).toStrictEqual(expected)
  })
})

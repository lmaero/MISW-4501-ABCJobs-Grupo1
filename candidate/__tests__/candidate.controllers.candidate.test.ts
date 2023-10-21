import {ping, register} from "../src/controllers/candidate";
import * as httpMocks from 'node-mocks-http'
import {CandidatePreSch} from "../src/schemas/Candidate";
import { CandidateProfileSch } from '../src/schemas/CandidateProfile'
import { CandidatePre } from '../src/schemas/Candidate'

jest.mock('express');
jest.mock("../src/schemas/Candidate");
jest.mock('../src/schemas/CandidateProfile');

describe('candidate tests', () => {
  test('ping', async () => {
    let request  = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42
      }
    });
    let response = httpMocks.createResponse();
    const result = await ping(request, response);
    const expected = 200;
    expect(result.statusCode).toStrictEqual(expected);
  })

  test('register candidate', async () => {
    let request  = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42
      },
      body: {
        email: "alonsodaniel10@hotmail.com",
        password: "Contra1234!",
        fullName: "alonso cantu"
      }
    });

    jest.spyOn(CandidatePreSch, "safeParse").mockReturnValue({success: true, data:
            {
              email: "alonsodaniel10@hotmail.com",
              password: "Contra1234!",
              fullName: "alonso cantu"
            }
      })

    //jest.spyOn(CandidatePreSch, "safeParse").mockImplementation();

    let response = httpMocks.createResponse();
    const result = await register(request, response);
    const expected = 500;
    expect(result.statusCode).toStrictEqual(expected);
  })

})





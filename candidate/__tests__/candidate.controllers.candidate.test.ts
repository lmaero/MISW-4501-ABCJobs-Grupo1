import {ping, register} from "../src/controllers/candidate";
import * as httpMocks from 'node-mocks-http'
import {CandidatePreSch} from "../src/schemas/Candidate";
import { CandidateProfileSch } from '../src/schemas/CandidateProfile'
import { CandidatePre } from '../src/schemas/Candidate'
import { createFixture } from 'zod-fixture';
import z, {any, SafeParseError, SafeParseSuccess} from 'zod'
import {ZStringSch} from "../src/schemas/ZString";
import {ZodError} from "zod/lib/ZodError";

jest.mock('express');
jest.mock("../src/schemas/Candidate", () => ({}));
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

  test('register candidate status 500', async () => {
    let request  = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42
      }
    });
    let response = httpMocks.createResponse();
    const result = await register(request, response);
    const expected = 500;
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
    // const c: CandidatePre = {email: "alonsodaniel10", password: "SuperPass!1234", fullName: "Super Pass"};
    // const candidate = createFixture(z.object({})); // Si lo dejo asi no truena
    jest.spyOn(CandidatePreSch, "safeParse").mockReturnValue({})

    jest.spyOn(Dao.prototype, 'authenticateUser').mockReturnValue(Promise.resolve({ msg: '201' }))

    let response = httpMocks.createResponse();
    const result = await register(request, response);
    const expected = 500;
    expect(result.statusCode).toStrictEqual(expected);
  })

})





import {ping, register, registerProfile, searchCandidate} from "../src/controllers/candidate";
import * as httpMocks from 'node-mocks-http'
import {CandidatePreSch} from "../src/schemas/Candidate";
import { CandidateProfileSch } from '../src/schemas/CandidateProfile'
import { CandidatePre } from '../src/schemas/Candidate'
import Dao from "../src/database/dao";
import {z} from "zod";
import {dateInPast} from "../src/schemas/DateInPast";
import {commaSeparatedList} from "../src/schemas/CommaSeparatedList";
import {techRoleEnum} from "../src/schemas/Enums";
import {technicalDataSch} from "../src/schemas/TechnicalData";

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

  test('register candidate 201', async () => {
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
    jest.spyOn(Dao.prototype, 'storeCandidate').mockReturnValue(Promise.resolve({ msg: '201' }))
    let response = httpMocks.createResponse();
    const result = await register(request, response);
    const expected = 201;
    expect(result.statusCode).toStrictEqual(expected);
  });

  test('register candidate 400', async () => {
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
    jest.spyOn(Dao.prototype, 'storeCandidate').mockReturnValue(Promise.resolve({ msg: '400' }))
    let response = httpMocks.createResponse();
    const result = await register(request, response);
    const expected = 400;
    expect(result.statusCode).toStrictEqual(expected);
  })

  test('register profile 200', async () => {
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

    jest.spyOn(CandidateProfileSch, "safeParse").mockReturnValue({success: true, data:
          {
            academicData: [{}],
            certifications: "Contra1234!",
            experienceData: [{}],
            email: "alonso@cantu",
            location: "location",
            mainSoftSkills: "cantu",
            role: "backend",
            spokenLanguages: "cantu",
            technicalData: {},
          }
    })
    jest.spyOn(Dao.prototype, 'storeCandidate').mockReturnValue(Promise.resolve({ msg: '400' }))
    let response = httpMocks.createResponse();
    const result = await registerProfile(request, response);
    expect(result).toBeUndefined();
  })

  test('search candidate 200', async () => {
    let request  = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42
      },
      body: {
        role: "alonsodaniel10@hotmail.com",
        languages: "Contra1234!",
        softSkills: "alonso cantu",
        spoken_languages: "alonso cantu",
      }
    });
    jest.spyOn(Dao.prototype, 'searchCandidate').mockReturnValue(Promise.resolve({ msg: '200' }))
    let response = httpMocks.createResponse();
    const result = await searchCandidate(request, response);
    const expected = 200;
    expect(result.statusCode).toStrictEqual(expected);
  })

  test('search candidate 400', async () => {
    let request  = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42
      },
      body: {
        role: "alonsodaniel10@hotmail.com",
        languages: "Contra1234!",
        softSkills: "alonso cantu",
        spoken_languages: "alonso cantu",
      }
    });
    jest.spyOn(Dao.prototype, 'searchCandidate').mockReturnValue(Promise.resolve({ msg: '400' }))
    let response = httpMocks.createResponse();
    const result = await searchCandidate(request, response);
    const expected = 400;
    expect(result.statusCode).toStrictEqual(expected);
  })

})




